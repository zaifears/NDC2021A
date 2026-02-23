
<div align="center">

  <img src="/workspaces/NDC2021A/public/badge.png" alt="NDC Badge" width="240" />

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
- Profile pages load full details and the user image (images are not loaded on the homepage).
- Google Sheets integration with automatic merging against a base student list.
- Proxy-based image fetching for better compatibility with Google Drive and other hosts.

---

## Features

- Minimal, fast homepage (no images) with a modern file-manager-like list view.
- Detailed profile pages with contact cards and social links.
- Automatic Google Sheets polling (revalidate every ~60s) — no redeploy required after form submissions.
- Google Drive and PostImage links supported for profile images; Drive links are normalized.
- Small `GET /api/image` proxy to stream allowed remote images to the browser.

## Project structure (high level)

```
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                 # Homepage (list + search)
│  └─ profile/[id]/page.tsx    # Profile details
├─ app/api/image/route.ts      # Image proxy
├─ components/
│  ├─ ProfileDirectory.tsx
│  └─ ProfileCard.tsx
├─ lib/sheets.ts               # Google Sheets fetch + normalization
└─ data/profiles.ts            # Base fallback profiles
```

## Setup & development

```bash
git clone https://github.com/zaifears/NDC2021A.git
cd NDC2021A
pnpm install
pnpm run dev
```

Open http://localhost:3000

## Google Sheets / Google Form

Create a Google Form that writes responses to a Sheet with the following header (Row 1):

| A: Timestamp | B: Full College ID | C: Full Legal Name | D: Email | E: Phone | F: LinkedIn URL | G: Short Bio | H: Facebook Account URL | I: Upload Your Image |

- Use the shareable image link in column I (PostImage or Google Drive). Drive links must be shareable; the app normalizes common Drive URLs.
- Set `GOOGLE_SHEET_ID` and `GOOGLE_SHEETS_API_KEY` in environment variables for production.

## Image proxy

The proxy at `/api/image` accepts a base64 `u` parameter with the remote URL and streams back the remote image. Edit the host allowlist in `src/app/api/image/route.ts` to add additional hosts.

## Notes

- `formatDate` in `src/app/profile/[id]/page.tsx` formats the Sheets timestamp to `YYYY-MM-DD` for display as "Last updated".
- The global navbar was intentionally removed — the profile page has a sticky back button on desktop.

## Deployment

Recommended: Vercel. Ensure environment variables are set for Google Sheets access.

## Credits

Built and maintained by Md Al Shahoriar Hossain — https://zaifears.vercel.app (62101030)

