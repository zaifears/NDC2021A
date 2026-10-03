/**
 * IndexNow Submission Script
 * Usage: node scripts/indexnow.mjs
 */

const KEY = "b87e4fcc78a84826a48769b40cdaebf3";
const HOST = "ndc2021a.vercel.app";
const BASE_URL = `https://${HOST}`;
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;

function createSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  console.log("🚀 Starting IndexNow URL submission for:", BASE_URL);

  let urls = [`${BASE_URL}/`, `${BASE_URL}/about-ndc`];

  try {
    // Try to fetch live knowledge.json or sitemap
    console.log("📡 Fetching live directory profiles...");
    const res = await fetch(`${BASE_URL}/knowledge.json`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.profiles)) {
        const profileUrls = data.profiles.map((p) => p.url).filter(Boolean);
        urls = Array.from(new Set([...urls, ...profileUrls]));
        console.log(`✅ Loaded ${profileUrls.length} profile URLs from live knowledge API.`);
      }
    }
  } catch (err) {
    console.warn("⚠️ Could not reach live knowledge API, falling back to homepage submission only:", err.message);
  }

  console.log(`📤 Submitting ${urls.length} URLs to api.indexnow.org...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`🎉 SUCCESS! Search engines notified via IndexNow (${res.status} ${res.statusText}).`);
      console.log(`Submitted count: ${urls.length} URLs.`);
    } else {
      const text = await res.text();
      console.error(`❌ IndexNow returned status ${res.status}: ${res.statusText}`);
      console.error("Response body:", text);
    }
  } catch (err) {
    console.error("❌ Failed to send IndexNow request:", err.message);
  }
}

main();
