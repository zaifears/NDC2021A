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

  function gradientForKey(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % 360;
    }
    const h1 = hash;
    const h2 = (hash + 60) % 360;
    return `linear-gradient(135deg, hsl(${h1},70%,85%), hsl(${h2},70%,60%))`;
  }

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
      <div className="text-center mb-6">
        <input
          type="search"
          placeholder="Search by name or ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-lg px-6 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
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
      <ul className="space-y-3">
        {filtered.map((p, idx) => (
          <li
            key={p.id}
            className="bg-white border border-slate-100 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/30 hover:-translate-y-0.5 group overflow-hidden relative animate-fade-in-up"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Subtle hover accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-darkGold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <a
              href={`/profile/${p.id}`}
              className="flex items-center px-5 py-4 min-h-[4.5rem]"
            >
              {/* Sleek Monogram instead of image */}
              <div
                className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm mr-5 group-hover:bg-gold/10 group-hover:text-darkGold group-hover:border-gold/20 transition-colors"
                style={{ background: gradientForKey(p.id) }}
              >
                {p.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
              </div>

              {/* Text Info stacked cleanly */}
              <div className="flex-1">
                <span className="block font-semibold text-slate-800 text-lg group-hover:text-slate-900 transition-colors">
                  {p.name}
                </span>
                <span className="block text-xs text-slate-400 font-mono mt-1 tracking-wider">
                  ID: {p.id}
                </span>
              </div>

              {/* Animated Action Arrow */}
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <span className="text-gold font-bold">→</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
