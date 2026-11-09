import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Notre Dame College Batch 2021 Group A Student Directory",
    short_name: "NDC 2021 A",
    description: "Public student directory for Notre Dame College Dhaka Batch 2021 Group A.",
    start_url: "/",
    display: "browser",
    background_color: "#dde2ea",
    theme_color: "#0f172a",
    lang: "en",
    icons: [
      { src: "/logo-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
