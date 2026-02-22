"use client";

import Image from "next/image";
import Link from "next/link";
import { Profile } from "@/types/profile";

export default function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link href={`/profile/${profile.id}`} className="group block h-full outline-none">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 sm:p-4 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold/40 relative overflow-hidden">
        {/* Hover Top Border Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 relative mb-4">
          <Image
            src={profile.image || "/images/user.png"}
            alt={profile.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
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
