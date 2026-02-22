"use client";

import Image from "next/image";
import Link from "next/link";
import { Profile } from "@/types/profile";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link href={`/profile/${profile.id}`}>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer h-full">
        <div className="aspect-square overflow-hidden bg-gray-200 relative">
          <Image
            src={profile.image || "/images/user.png"}
            alt={profile.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
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
