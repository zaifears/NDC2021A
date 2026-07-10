"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfileImage({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    // Increased height (h-56/h-72) to accommodate vertical images
<div className="relative w-44 h-56 sm:w-52 sm:h-72 rounded-3xl overflow-hidden bg-slate-100 ring-4 ring-white shadow-xl mx-auto shrink-0 z-10">
      
      {/* Skeleton - REMOVED from DOM entirely when loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse z-20" />
      )}
      
      {/* Actual Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-700 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadingComplete={() => setIsLoaded(true)}
        sizes="(max-width: 768px) 176px, 208px"
        priority
      />
    </div>
  );
}