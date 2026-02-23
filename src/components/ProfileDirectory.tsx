"use client";

import { useState, useMemo } from "react";
import { Profile } from "@/types/profile";

const MY_PROFILE_ID = "62101030"; // replace with your actual ID if different

export default function ProfileDirectory({ profiles }: { profiles: Profile[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return profiles;
    return profiles.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
    );
  }, [query, profiles]);

  // const myProfile = useMemo(
  //   () => profiles.find((p) => p.id === MY_PROFILE_ID),
  //   [profiles]
  // );

  return (
    <section className="max-w-7xl mx-auto px-4 pb-24 w-full flex-grow">
      {/* credits */}
      <div className="text-center mb-6 py-4 text-sm text-slate-600">
        <p>Built with <span className="font-semibold text-slate-900">Next.js, TypeScript, and Tailwind CSS</span>.</p>
        <p>
          Open source project by
          <a
            href="https://zaifears.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gold hover:underline ml-1"
          >
            Md Al Shahoriar Hossain (62101030)
          </a>
          .
        </p>
      </div>
      {/* search input */}
      <div className="text-center mb-4">
        <input
          type="search"
          placeholder="Search by name or ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-gold"
        />
      </div>
      {/* result count */}
      <div className="text-center text-sm text-slate-600 mb-8">
        Showing {filtered.length} / {profiles.length} members
      </div>


      {/* batch list */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Meet the Batch</h2>
        <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
      </div>
      <ul className="space-y-2">
        {filtered.map((p) => (
          <li key={p.id} className="bg-white hover:bg-slate-50">
            <a
              href={`/profile/${p.id}`}
              className="flex items-center px-4 py-3 transition-shadow rounded-lg hover:shadow-md"
            >
              <span className="flex-1 font-medium text-slate-800 truncate">
                {p.name}
              </span>
              <span className="mx-4 h-5 border-l border-slate-300" />
              <span className="text-xs text-slate-500">{p.id}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
