"use client";

import Link from "next/link";
import { Profile } from "@/types/profile";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link href={`/profile/${profile.id}`}>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer h-full">
        <div className="aspect-square overflow-hidden bg-gray-200">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-gold font-semibold">#{profile.id}</p>
          <p className="text-lg font-bold text-gray-900 mt-1 truncate">
            {profile.name}
          </p>
        </div>
      </div>
    </Link>
  );
}
