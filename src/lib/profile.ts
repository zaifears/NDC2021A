import type { Profile } from "@/types/profile";

/**
 * A profile counts as "filled" once the student has shared anything beyond their name.
 * Unfilled profiles stay reachable but are kept out of the index (noindex, not in the sitemap),
 * so search engines only see pages that have something to say.
 */
export function isProfileFilled(profile: Profile): boolean {
  return Boolean(
    profile.description ||
      profile.image ||
      profile.linkedin ||
      profile.facebook ||
      profile.email ||
      profile.phone
  );
}

/** Normalises DD/MM/YYYY or any Date-parsable string to YYYY-MM-DD. Returns "" when unparsable. */
export function toIsoDate(raw: string): string {
  if (!raw) return "";
  const m = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) {
    const [, dd, mm, yyyy] = m;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }
  const parsed = Date.parse(raw);
  if (!Number.isNaN(parsed)) return new Date(parsed).toISOString().slice(0, 10);
  return "";
}
