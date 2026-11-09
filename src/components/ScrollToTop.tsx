"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button type="button" onClick={scroll} className="to-top" aria-label="Scroll to top">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">
        <path d="M9 15V3M3.5 8.5 9 3l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      </svg>
    </button>
  );
}
