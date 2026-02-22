import { Profile } from "@/types/profile";
import { profiles as fallbackProfiles } from "@/data/profiles";

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

// Column order in the Google Sheet (Row 1 = header row):
// A: Timestamp | B: Full College ID | C: Full Legal Name | D: Email | E: Phone | F: LinkedIn URL | G: Profile Image URL | H: Short Bio
const SHEET_RANGE = "Sheet1!A2:H"; // Skip header row, read all data rows

/**
 * Fetches all profiles from the Google Sheet.
 * Falls back to hardcoded data if env vars are missing or fetch fails.
 */
export async function getProfiles(): Promise<Profile[]> {
  if (!GOOGLE_SHEET_ID || !GOOGLE_SHEETS_API_KEY) {
    console.warn(
      "⚠️  Google Sheets env vars not set — using fallback data. " +
        "Set GOOGLE_SHEET_ID and GOOGLE_SHEETS_API_KEY in .env.local"
    );
    return fallbackProfiles;
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;

    const res = await fetch(url, {
      next: { revalidate: 60 }, // ISR: re-fetch from Google Sheets every 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Google Sheets API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const rows: string[][] = data.values ?? [];

    const profiles: Profile[] = rows
      .filter((row) => row[1]) // skip empty rows (check column B for ID)
      .map((row) => ({
        id: row[1]?.trim() ?? "",                  // B: Full College ID
        name: row[2]?.trim() ?? "",                // C: Full Legal Name
        email: row[3]?.trim() ?? "",               // D: Email
        phone: row[4]?.trim() ?? "",               // E: Phone (optional)
        linkedin: row[5]?.trim() ?? "",            // F: LinkedIn URL (optional)
        image: row[6]?.trim() ?? "",               // G: Profile Image URL (optional)
        description: row[7]?.trim() ?? "",         // H: Short Bio (optional)
      }));

    return profiles;
  } catch (error) {
    console.error("❌ Failed to fetch from Google Sheets, using fallback:", error);
    return fallbackProfiles;
  }
}

/**
 * Fetches a single profile by ID.
 */
export async function getProfileById(id: string): Promise<Profile | undefined> {
  const profiles = await getProfiles();
  return profiles.find((p) => p.id === id);
}
