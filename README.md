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
- **Static Site Generation (SSG)**: Pre-renders all 132 student profile pages at build time with Incremental Static Regeneration (ISR), optimized for Vercel Hobby plan execution without cold starts or concurrency timeouts.
- Profile pages load full details, social links, and lazy-loaded photos (images are bypassed on the homepage to optimize bandwidth).
- Google Sheets integration with automatic merging and resilient in-memory fallback caching.
- Dynamic SEO features including Schema.org JSON-LD (Person, Breadcrumbs, WebSite, Organization, FAQ) and live W3C-compliant `sitemap.xml`.
- **LLM & AI-Agent friendly**: Includes machine-readable `/llms.txt`, `/knowledge.json` (Dataset Schema), and `/entities.json` (Person Knowledge Graph) with dedicated crawler rules in `robots.txt`.
- Hardened proxy-based image fetching (`/api/image`) with 6s timeout protection and 7-day Vercel Edge CDN caching.

---

## Features

- **Minimal UI**: Fast homepage with a modern file-manager-like list view and custom iOS-style Alphabet Scrubber.
- **Enhanced visual polish**: Dynamic gradient monograms, taller list rows, frosted-glass search bar, Bento-Box styled profile cards, and subtle fade-in animations.
- **Vercel Hobby Plan Optimized**: 100% static HTML pre-rendered on Edge CDN, reducing serverless execution count by ~99.9% and preventing 504 timeouts.
- **Google Sheets polling**: Automatic fetching (revalidates every ~60s) via ISR. No redeploy required after new Google Form submissions.
- **Resilient Fallback**: In-memory cache protects against temporary Google API rate limits or quota blips; prevents infinite 308 redirect loops.
- **Quality-Gated Indexing**: Filled profiles are indexed with rich snippets; unfilled profiles are protected against "Thin Content / Soft 404" search penalties.
- **Image proxy**: Secure `GET /api/image` streaming with host allowlist, timeout guards, graceful fallback redirects to `/badge.png`, and Edge CDN caching headers.
- **Drive link normalization**: Google Drive and PostImage links are supported for profile images; Drive links are automatically converted to direct-view URLs.
- **Native routing**: Strict canonical URL enforcement and permanent redirects using Next.js native navigation logic.

---

## Project structure (high level)

```plaintext
src/
├─ app/
│  ├─ layout.tsx                      # Root layout, metadata & global Schema.org graph
│  ├─ page.tsx                        # Homepage (directory list + search + FAQ)
│  ├─ sitemap.xml/route.ts            # Dynamic W3C valid sitemap generation (ISR 1h)
│  ├─ knowledge.json/route.ts         # Schema.org Dataset endpoint for LLMs (ISR 5m)
│  ├─ entities.json/route.ts          # Person Knowledge Graph endpoint for AI agents
│  ├─ profiles.json/route.ts          # REST JSON endpoint of all profiles
│  └─ students/[id]/[slug]/page.tsx   # Pre-rendered SSG profile pages with ISR (60s)
├─ app/api/image/route.ts             # Image proxy with timeout & Edge CDN caching
├─ components/
│  ├─ ProfileDirectory.tsx            # Client search, filters & alphabet scrubber
│  ├─ ProfileImage.tsx                # Lazy-loaded avatar with skeleton loader
│  ├─ StructuredData.tsx              # Organization, WebSite & CollectionPage JSON-LD
│  ├─ ScrollToTop.tsx                 # Smooth scroll-to-top floating button
│  └─ ScrollWrapper.tsx               # Client-only dynamic wrapper for scroll-to-top
├─ lib/sheets.ts                      # Google Sheets fetch, in-memory cache & deduplication
├─ lib/slug.ts                        # Centralized canonical slug generator
└─ data/students.ts                   # Base fallback profiles (ID + Name)
public/
├─ robots.txt                         # Search engine & AI bot crawler directives
└─ llms.txt                           # AI agent context and machine-readable data pointers
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

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_BASE_URL=https://ndc2021a.vercel.app
GOOGLE_SHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEETS_API_KEY=your_api_key_here
```

---

## Google Sheets / Google Form

Create a Google Form that writes responses to a Sheet with the following header (Row 1):

| A: Timestamp | B: Full College ID | C: Full Legal Name | D: Email | E: Phone | F: LinkedIn URL | G: Short Bio | H: Facebook Account URL | I: Upload Your Image |

- Permissions: Ensure the target Google Sheet is set to "Anyone with the link can view".
- Use the shareable image link in column I (PostImage or Google Drive). Drive links must be shareable; the app normalizes common Drive URLs.
- Set `GOOGLE_SHEET_ID` and `GOOGLE_SHEETS_API_KEY` in environment variables for production.

---

## Image proxy

The proxy at `/api/image` accepts a base64 `u` parameter with the remote URL and streams back the remote image with Edge CDN caching headers. Edit the `ALLOWED_HOSTS` set in `src/app/api/image/route.ts` to add additional hosts.

---

## Notes

- `formatDate` helper correctly parses the local DD/MM/YYYY Sheets timestamp into international standard formats for UI display and sitemaps.
- The global navbar was intentionally removed — the profile page has a sticky back button on desktop for a cleaner app-like feel.
- Deployment: Recommended Vercel (Hobby plan fully supported with zero downtime via static pre-rendering).

---

## Credits

Built and maintained by Md Al Shahoriar Hossain — [shahoriar.bd](https://shahoriar.bd) (62101030)

