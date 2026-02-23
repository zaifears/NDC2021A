"use client";

import dynamic from "next/dynamic";

// load ScrollToTop only on client (it already is client)
const ScrollToTop = dynamic(() => import("./ScrollToTop"), { ssr: false });

export default function ScrollWrapper() {
  return <ScrollToTop />;
}
