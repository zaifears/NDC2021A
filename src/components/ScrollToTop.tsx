"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scroll}
      className="fixed bottom-8 right-8 bg-gold/90 hover:bg-gold text-white p-3 rounded-full shadow-lg z-30 transition-opacity opacity-90 hover:opacity-100"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
