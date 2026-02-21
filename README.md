# NDC 2021 Group A - Batch Directory

A Next.js TypeScript web application for the Notre Dame College Batch 2021 Group A student directory.

## Features

- 📱 **Responsive Grid Layout** - Home page displays all 132 members with their image, ID, and name
- 👤 **Detailed Profile Pages** - Click on any member to view their full profile with:
  - Profile description
  - Email address
  - Phone number
  - LinkedIn profile link
  - Profile image
- 🎨 **Modern UI** - Built with Tailwind CSS for a clean, professional look
- ⚡ **Fast Performance** - Next.js App Router with TypeScript for type safety
- 📦 **Easy Deployment** - Ready to deploy on Vercel

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with navigation
│   │   ├── page.tsx            # Homepage with profile grid
│   │   ├── globals.css         # Global styles
│   │   └── profile/
│   │       └── [id]/
│   │           └── page.tsx    # Individual profile page
│   ├── components/
│   │   └── ProfileCard.tsx     # Profile card component
│   ├── data/
│   │   └── profiles.ts         # Profile data (add all 132 here)
│   └── types/
│       └── profile.ts          # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Getting Started

### Prerequisites

- Node.js 16+ (or your preferred version)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd NDC2021A
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Adding Profile Data

All profile data is stored in `src/data/profiles.ts`. Each profile follows this structure:

```typescript
{
  id: "001",                                    // Unique ID (001-132)
  name: "John Doe",                             // Full name
  email: "john@example.com",                    // Email address
  phone: "+91 98765 43210",                     // Phone number
  linkedin: "https://linkedin.com/in/johndoe",  // LinkedIn profile URL
  image: "https://example.com/image.jpg",       // Profile image URL
  description: "Brief bio or description..."    // Professional description
}
```

### To add all 132 members:
1. Open `src/data/profiles.ts`
2. Replace the sample data with the complete list of 132 profiles
3. Each profile must follow the structure above

## Deployment on Vercel

1. Push your code to GitHub:
```bash
pnpm install
git add .
git commit -m "Initial commit: NDC2021A batch directory"
git push origin main
```

2. Create a Vercel account at [vercel.com](https://vercel.com)

3. Import your repository:
   - Go to Vercel dashboard
   - Click "New Project"
   - Import the GitHub repository
   - Click "Deploy"

4. Your site will be live at a Vercel URL (e.g., `ndc2021a.vercel.app`)

## Customization

### Change Colors
Edit the colors in `tailwind.config.ts`:
```typescript
colors: {
  primary: "#1e40af",      // Main blue
  secondary: "#0f172a",    // Dark navy
}
```

### Adjust Grid Layout
In `src/app/page.tsx`, modify the grid classes:
```typescript
// Current: 4 columns on large screens
lg:grid-cols-4
// Change to 3 columns:
lg:grid-cols-3
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vercel** - Deployment

## License

This project is for Notre Dame College Batch 2021 Group A alumni only.
