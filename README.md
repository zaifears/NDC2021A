<div align="center">

  <img src="https://i.postimg.cc/RFmm10pB/badge.png" alt="NDC Badge" width="240" />

  <h1>NDC 2021 Group A — Batch Directory</h1>

  <p class="lead">Community directory for Notre Dame College Batch 2021 Group A — built with Next.js, TypeScript, and Tailwind CSS.</p>

  <br />

  <!-- Badges -->
  <a href="/">
    <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  </a>
  <a href="/">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  </a>
  <a href="/">
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </a>

</div>

---

## Quick summary

- List-style homepage with instant search by name or ID.
- Profile pages load full details and the user image (images are not loaded on the homepage to optimize bandwidth).
- Google Sheets integration with automatic merging against a base student list.
- Dynamic SEO features including automated Breadcrumb JSON-LD and a live, auto-generating `sitemap.xml`.
- Proxy-based image fetching for better compatibility with Google Drive and other hosts.

---

## Features

- Minimal UI: Fast homepage with a modern file-manager-like list view.
- Enhanced visual polish: Dynamic gradient monograms, taller list rows, frosted-glass search bar, Bento-Box styled profile cards, and subtle fade-in animations.
- Google Sheets polling: Automatic fetching (revalidates every ~60s) via ISR. No redeploy required after new Google Form submissions.
- Image proxy: Small `GET /api/image` proxy to stream allowed remote images to the browser, with automated caching headers for Vercel edge optimization.
- Drive link normalization: Google Drive and PostImage links are supported for profile images; Drive links are automatically extracted and converted to direct-view URLs.
- Native routing: Strict canonical URL enforcement and 308 redirects using Next.js native navigation logic.

---

## Project structure (high level)

```plaintext
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                        # Homepage (list + search)
│  ├─ sitemap.xml/route.ts            # Dynamic W3C valid sitemap generation
│  ├─ knowledge.json/route.ts         # JSON API endpoint for LLM context
│  └─ students/[id]/[slug]/page.tsx   # Student profile details
├─ app/api/image/route.ts             # Image proxy with caching headers
├─ components/
│  ├─ ProfileDirectory.tsx
│  └─ ProfileCard.tsx
├─ lib/sheets.ts                      # Google Sheets fetch + normalization
├─ lib/slug.ts                        # Centralized canonical slug generator
└─ data/students.ts                   # Base fallback profiles (ID + Name)
```

---

## Setup & development

```bash
git clone https://github.com/zaifears/NDC2021A.git
cd NDC2021A
pnpm install
pnpm run dev
```

Open http://localhost:3000

---

## Google Sheets / Google Form

Create a Google Form that writes responses to a Sheet with the following header (Row 1):

| A: Timestamp | B: Full College ID | C: Full Legal Name | D: Email | E: Phone | F: LinkedIn URL | G: Short Bio | H: Facebook Account URL | I: Upload Your Image |

- Permissions: Ensure the target Google Sheet is set to "Anyone with the link can view".
- Use the shareable image link in column I (PostImage or Google Drive). Drive links must be shareable; the app normalizes common Drive URLs.
- Set `GOOGLE_SHEET_ID` and `GOOGLE_SHEETS_API_KEY` in environment variables for production.

---

## Image proxy

The proxy at `/api/image` accepts a base64 `u` parameter with the remote URL and streams back the remote image. Edit the `ALLOWED_HOSTS` set in `src/app/api/image/route.ts` to add additional hosts.

---

## Notes

- `formatDate` helper correctly parses the local DD/MM/YYYY Sheets timestamp into international standard formats for UI display and sitemaps.
- The global navbar was intentionally removed — the profile page has a sticky back button on desktop for a cleaner app-like feel.
- Deployment: Recommended Vercel.
- Ensure environment variables are set for Google Sheets access. No middleware is required; caching and redirects are handled natively at the page level.

---

## Credits

Built and maintained by Md Al Shahoriar Hossain — shahoriar.vercel.app (62101030)

