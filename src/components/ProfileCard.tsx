"use client";

import Link from "next/link";
import { Profile } from "@/types/profile";

function generateGradient(key: string) {
  // simple hash to hue
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % 360;
  }
  const h1 = hash;
  const h2 = (hash + 60) % 360;
  return `linear-gradient(135deg, hsl(${h1},70%,80%), hsl(${h2},70%,60%))`;
}

export default function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link href={`/profile/${profile.id}`} className="group block h-full outline-none">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 sm:p-4 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold/40 relative overflow-hidden">
        {/* Hover Top Border Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* no image on homepage; show initials circle with dynamic gradient */}
        <div
          className="aspect-square rounded-xl flex items-center justify-center mb-4"
          style={{
            background: generateGradient(profile.id),
          }}
        >
          <span className="text-xl font-bold text-slate-600">
            {profile.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </span>
        </div>
        <div className="space-y-1 text-center">
          <p className="text-xs font-mono text-gold font-bold tracking-widest">ID: {profile.id}</p>
          <h3 className="text-sm sm:text-base font-bold text-slate-800 line-clamp-1 group-hover:text-primary transition-colors">
            {profile.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
