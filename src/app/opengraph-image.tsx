import { ImageResponse } from "next/og";

export const alt = "Notre Dame College Batch 2021 Group A Student Directory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori (the renderer behind ImageResponse) cannot read CSS variables or oklch, so the
// brand navy and gold from tokens.css are repeated here as plain values.
const NAVY = "#0f172a";
const GOLD = "#d4af37";
const PAPER = "#f1f5f9";

// Social preview at the size platforms expect (1200 x 630); the old badge.png was a 975 x 133 banner.
export default function OpengraphImage() {
  const head = { display: "flex", fontSize: 112, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 } as const;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: NAVY,
          color: PAPER,
        }}
      >
        <div style={{ display: "flex", fontSize: 32, color: GOLD }}>Notre Dame College, Dhaka</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={head}>Batch 2021</div>
          <div style={{ ...head, color: GOLD }}>Group A</div>
        </div>
        <div style={{ display: "flex", fontSize: 32, borderTop: `2px solid ${GOLD}`, paddingTop: 24 }}>
          Student directory: classmates, profiles and links
        </div>
      </div>
    ),
    { ...size }
  );
}
