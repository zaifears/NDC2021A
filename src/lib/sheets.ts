import { Profile } from "@/types/profile";
import { BASE_STUDENTS } from "@/data/students";

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

// Column order in the Google Sheet (Row 1 = header row):
// A: Timestamp | B: Full College ID | C: Full Legal Name | D: Email | E: Phone | F: LinkedIn URL | G: Profile Image URL | H: Short Bio | I: Facebook Account URL
const SHEET_RANGE = "Form responses 1!A2:I"; // Skip header row, read all data rows

/**
 * Creates a default Profile from the base student list (ID + name only).
 */
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
 * Fetches all profiles from the Google Sheet and merges with the base 132 student list.
 * Students who haven't submitted the form still appear with their ID and name.
 * Falls back to base student list if env vars are missing or fetch fails.
 */
export async function getProfiles(): Promise<Profile[]> {
  // Start with all 132 students as default profiles
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
    });

    if (!res.ok) {
      throw new Error(`Google Sheets API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const rows: string[][] = data.values ?? [];

    // Merge form responses on top of the base student list
    for (const row of rows) {
      const id = row[1]?.trim();
      if (!id) continue; // skip empty rows

      profileMap.set(id, {
        id,
        name: row[2]?.trim() || profileMap.get(id)?.name || "",
        email: row[3]?.trim() ?? "",
        phone: row[4]?.trim() ?? "",
        linkedin: row[5]?.trim() ?? "",
        image: row[6]?.trim() ?? "",
        description: row[7]?.trim() ?? "",
        facebook: row[8]?.trim() ?? "",
        lastUpdated: row[0]?.trim() ?? "",
      });
    }

    return Array.from(profileMap.values());
  } catch (error) {
    console.error("❌ Failed to fetch from Google Sheets, showing base list:", error);
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
