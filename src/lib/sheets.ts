import { Profile } from "@/types/profile";
import { BASE_STUDENTS } from "@/data/students";

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

// Column order in the Google Sheet (Row 1 = header row):
// A: Timestamp | B: Full College ID | C: Full Legal Name | D: Email | E: Phone | F: LinkedIn URL | G: Short Bio | H: Facebook Account URL | I: Upload Your Image
const SHEET_RANGE = "Form responses 1!A2:I"; // Skip header row, read all data rows

/**
 * Deduplicate an array of profile-like objects by `id`, keeping the entry with the latest timestamp.
 * Expects each profile to have `id` and `timestamp` (string) fields.
 */
function deduplicateProfiles(profiles: any[]) {
  const latestMap = new Map<string, any>();

  profiles.forEach((profile) => {
    const id = profile?.id;
    if (!id) return; // Skip entries without an ID

    // Parse timestamp; fallback to 0 if missing or invalid
    const currentTimestamp = (() => {
      const t = profile.timestamp ?? profile.lastUpdated ?? "";
      const parsed = new Date(t).getTime();
      return Number.isFinite(parsed) ? parsed : 0;
    })();

    const existing = latestMap.get(id);

    if (!existing) {
      // First time we see this ID
      latestMap.set(id, profile);
    } else {
      // Compare timestamps and keep the newest
      const existingTimestamp = (() => {
        const t = existing.timestamp ?? existing.lastUpdated ?? "";
        const parsed = new Date(t).getTime();
        return Number.isFinite(parsed) ? parsed : 0;
      })();

      if (currentTimestamp > existingTimestamp) {
        latestMap.set(id, profile);
      }
    }
  });

  return Array.from(latestMap.values());
}

function createDefaultProfile(student: { id: string; name: string }): Profile {
  return {
    id: student.id,
    name: student.name,
    email: "",
    phone: "",
    linkedin: "",
    image: "",
    description: "",
    facebook: "",
    lastUpdated: "",
  };
}

/**
 * Convert common hosted image URLs (Google Drive variants) into a direct viewable URL.
 * If the URL is empty or not recognized, returns an empty string or the trimmed original.
 */
function normalizeImageUrl(raw: string): string {
  if (!raw) return "";
  const trimmed = raw.trim();

  // Google Drive variants -> direct viewable link
  // examples:
  //   https://drive.google.com/file/d/FILEID/view?usp=sharing
  //   https://drive.google.com/open?id=FILEID
  //   https://drive.google.com/uc?id=FILEID&export=download
  const driveRegex =
    /drive\.google\.com\/(?:file\/d\/([a-zA-Z0-9_-]+)|open\?id=([a-zA-Z0-9_-]+)|uc\?id=([a-zA-Z0-9_-]+))/;
  const match = trimmed.match(driveRegex);
  if (match) {
    const id = match[1] || match[2] || match[3];
    if (id) return `https://drive.google.com/uc?export=view&id=${id}`;
  }

  return trimmed;
}

// Memory cache to survive temporary Google API outages or rate limits (429/500/timeout)
let memoryCachedProfiles: Profile[] | null = null;

/**
 * Fetches all profiles from the Google Sheet and merges with the base student list.
 * Students who haven't submitted the form still appear with their ID and name.
 * Falls back to last known good memory cache or base student list if env vars are missing or fetch fails.
 */
export async function getProfiles(): Promise<Profile[]> {
  // Start with all base students as default profiles
  const profileMap = new Map<string, Profile>();
  for (const student of BASE_STUDENTS) {
    profileMap.set(student.id, createDefaultProfile(student));
  }

  if (!GOOGLE_SHEET_ID || !GOOGLE_SHEETS_API_KEY) {
    console.warn(
      "⚠️  Google Sheets env vars not set — showing base student list. " +
        "Set GOOGLE_SHEET_ID and GOOGLE_SHEETS_API_KEY in .env.local"
    );
    return Array.from(profileMap.values());
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;

    const res = await fetch(url, {
      next: { revalidate: 60 }, // ISR: re-fetch from Google Sheets every 60 seconds
      signal: AbortSignal.timeout(6000), // Prevent hanging requests if Google API stalls
    } as any);

    if (!res.ok) {
      throw new Error(`Google Sheets API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const rows: string[][] = data.values ?? [];

    // Parse all rows into profile-like objects (including timestamp) so we can deduplicate
    const parsedProfiles: any[] = [];

    for (const row of rows) {
      // Row columns: 0=Timestamp, 1=Full College ID, 2=Full Legal Name, 3=Email, 4=Phone, 5=LinkedIn, 6=Short Bio, 7=Facebook, 8=Image
      const id = row[1]?.trim();
      if (!id) continue; // skip empty rows or rows without ID

      parsedProfiles.push({
        id,
        name: row[2]?.trim() || profileMap.get(id)?.name || "",
        email: row[3]?.trim() ?? "",
        phone: row[4]?.trim() ?? "",
        linkedin: row[5]?.trim() ?? "",
        description: row[6]?.trim() ?? "",
        facebook: row[7]?.trim() ?? "",
        image: normalizeImageUrl(row[8] ?? ""),
        timestamp: row[0]?.trim() ?? "",
        lastUpdated: row[0]?.trim() ?? "",
      });
    }

    // Deduplicate by id, keeping the latest timestamped submission
    const latestProfiles = deduplicateProfiles(parsedProfiles);

    // Merge deduplicated form responses on top of the base student list
    for (const p of latestProfiles) {
      const base = profileMap.get(p.id);

      // Replace the entire profile for that ID with the latest submission.
      // If the form left the name blank, preserve the base name.
      profileMap.set(p.id, {
        id: p.id,
        name: p.name || base?.name || "",
        email: p.email || "",
        phone: p.phone || "",
        linkedin: p.linkedin || "",
        description: p.description || "",
        facebook: p.facebook || "",
        image: p.image || "",
        lastUpdated: p.lastUpdated || "",
      });
    }

    const merged = Array.from(profileMap.values());
    memoryCachedProfiles = merged;
    return merged;
  } catch (error) {
    console.error("❌ Failed to fetch from Google Sheets:", error);
    if (memoryCachedProfiles && memoryCachedProfiles.length > 0) {
      console.warn("⚠️ Serving last known good profiles from memory cache.");
      return memoryCachedProfiles;
    }
    return Array.from(profileMap.values());
  }
}

/**
 * Fetches a single profile by ID.
 */
export async function getProfileById(id: string): Promise<Profile | undefined> {
  const profiles = await getProfiles();
  return profiles.find((p) => p.id === id);
}
