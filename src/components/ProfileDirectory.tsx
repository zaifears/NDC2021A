"use client";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Profile } from "@/types/profile";
import { createSlug } from "@/lib/slug";
import Link from "next/link";

type FilterType = "all" | "recent" | "linkedin" | "bio" | "picture";

export default function ProfileDirectory({ profiles }: { profiles: Profile[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Scrubber visibility
  const [showScrubber, setShowScrubber] = useState(false);
  const listStartRef = useRef<HTMLDivElement | null>(null);

  // Drag / magnify state
  const [dragLetter, setDragLetter] = useState<string | null>(null); // content shown in bubble
  const [isDragging, setIsDragging] = useState(false); // controls fade in/out
  const [pointerFraction, setPointerFraction] = useState<number | null>(null); // 0-1 position in strip, drives magnify
  const scrubberRef = useRef<HTMLDivElement | null>(null);
  const activePointerId = useRef<number | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const staleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Filter and Sort Logic
  const filtered = useMemo(() => {
    let result = [...profiles];
    if (activeFilter === "recent") {
      result = result
        .filter((p) => p.lastUpdated)
        .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    } else if (activeFilter === "linkedin") {
      result = result.filter((p) => p.linkedin);
    } else if (activeFilter === "bio") {
      result = result.filter((p) => p.description);
    } else if (activeFilter === "picture") {
      result = result.filter((p) => p.image);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
      );
    }
    return result;
  }, [query, profiles, activeFilter]);

  // 2. Grouping Logic (iOS Contacts Style)
  const groupedProfiles = useMemo(() => {
    if (activeFilter === "recent") {
      return { "Recently Updated": filtered };
    }
    const groups: Record<string, Profile[]> = {};
    filtered.forEach((p) => {
      let letter = p.name.charAt(0).toUpperCase();
      if (!/[A-Z]/.test(letter)) letter = "#";
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(p);
    });
    return Object.keys(groups)
      .sort()
      .reduce((acc, key) => {
        acc[key] = groups[key].sort((a, b) => a.name.localeCompare(b.name));
        return acc;
      }, {} as Record<string, Profile[]>);
  }, [filtered, activeFilter]);

  const letters = useMemo(() => Object.keys(groupedProfiles), [groupedProfiles]);

  // Gradient Helper
  function gradientForKey(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % 360;
    }
    const h1 = hash;
    const h2 = (hash + 60) % 360;
    return `linear-gradient(135deg, hsl(${h1},70%,85%), hsl(${h2},70%,60%))`;
  }

  const scrollToLetter = useCallback((letter: string) => {
    const element = document.getElementById(`group-${letter}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  // Reveal scrubber once the name list has scrolled into view
  useEffect(() => {
    const handleScroll = () => {
      if (!listStartRef.current) return;
      const top = listStartRef.current.getBoundingClientRect().top;
      setShowScrubber(top < 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---- Bubble lifecycle helpers ----
  // Clears the bubble content. Call AFTER the fade-out transition has had time to play.
  const scheduleHide = useCallback((delay: number) => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setDragLetter(null), delay);
  }, []);

  // Safety net: if pointer events ever stop arriving mid-drag (interrupted gesture,
  // browser quirk, etc.) this guarantees the bubble can never stay stuck forever.
  const armStaleGuard = useCallback(() => {
    if (staleTimerRef.current) clearTimeout(staleTimerRef.current);
    staleTimerRef.current = setTimeout(() => {
      setIsDragging(false);
      setPointerFraction(null);
      scheduleHide(300);
    }, 1500);
  }, [scheduleHide]);

  const letterFromPoint = useCallback((x: number, y: number) => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const target = el?.closest("[data-letter]") as HTMLElement | null;
    return target?.dataset.letter ?? null;
  }, []);

  const updateFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const rect = scrubberRef.current?.getBoundingClientRect();
      if (rect && rect.height > 0) {
        const fraction = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
        setPointerFraction(fraction);
      }
      const letter = letterFromPoint(clientX, clientY);
      if (letter) {
        setDragLetter((prev) => {
          if (prev !== letter && typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(4);
          }
          return letter;
        });
        scrollToLetter(letter);
      }
      armStaleGuard();
    },
    [letterFromPoint, scrollToLetter, armStaleGuard]
  );

  const endDrag = useCallback(() => {
    activePointerId.current = null;
    if (staleTimerRef.current) clearTimeout(staleTimerRef.current);
    setIsDragging(false); // fade-out starts immediately
    setPointerFraction(null);
    scheduleHide(300); // unmount once the fade transition finishes
  }, [scheduleHide]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId); // <-- guarantees pointerup always reaches us
      activePointerId.current = e.pointerId;
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      setIsDragging(true);
      updateFromPointer(e.clientX, e.clientY);
    },
    [updateFromPointer]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (activePointerId.current !== e.pointerId) return;
      e.preventDefault();
      updateFromPointer(e.clientX, e.clientY);
    },
    [updateFromPointer]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (activePointerId.current !== e.pointerId) return;
      e.currentTarget.releasePointerCapture(e.pointerId);
      endDrag();
    },
    [endDrag]
  );

  // Quick tap / keyboard activation: flashes the bubble briefly then guarantees removal
  const flashLetter = useCallback(
    (letter: string, visibleMs = 500) => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (staleTimerRef.current) clearTimeout(staleTimerRef.current);
      setDragLetter(letter);
      setIsDragging(true);
      scrollToLetter(letter);
      hideTimerRef.current = setTimeout(() => {
        setIsDragging(false);
        scheduleHide(300);
      }, visibleMs);
    },
    [scrollToLetter, scheduleHide]
  );

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (staleTimerRef.current) clearTimeout(staleTimerRef.current);
    };
  }, []);

  // Dock-style magnification: letters near the pointer scale up and pop left
  const getMagnifyStyle = (index: number): React.CSSProperties => {
    if (pointerFraction === null || letters.length <= 1) {
      return { transform: "scale(1) translateX(0px)" };
    }
    const idxFrac = index / (letters.length - 1);
    const dist = Math.abs(idxFrac - pointerFraction) * (letters.length - 1);
    const scale = Math.max(1, 1.9 - dist * 0.55);
    const translateX = -(scale - 1) * 12;
    return {
      transform: `scale(${scale}) translateX(${translateX}px)`,
      zIndex: scale > 1.05 ? 10 : 1,
    };
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pb-24 w-full flex-grow relative">
      {/* credits */}
      <div className="text-center mb-6 py-4 text-sm text-slate-600">
        <p>
          Built with <span className="font-semibold text-slate-900">Next.js, TypeScript, and Tailwind CSS</span>.
        </p>
        <p>
          Open source project by
          <a
            href="https://shahoriar.bd"
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
          className="w-full max-w-lg px-6 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
        />
      </div>

      {/* Advanced Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-lg mx-auto">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            activeFilter === "all" ? "bg-slate-800 text-white shadow-md" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter("recent")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            activeFilter === "recent" ? "bg-blue-600 text-white shadow-md" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          ⏱️ Recently Updated
        </button>
        <button
          onClick={() => setActiveFilter("linkedin")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            activeFilter === "linkedin" ? "bg-[#0A66C2] text-white shadow-md" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          💼 Has LinkedIn
        </button>
        <button
          onClick={() => setActiveFilter("bio")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            activeFilter === "bio" ? "bg-emerald-600 text-white shadow-md" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          📝 Has Bio
        </button>
        <button
          onClick={() => setActiveFilter("picture")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            activeFilter === "picture" ? "bg-purple-600 text-white shadow-md" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          📸 Has Picture
        </button>
      </div>

      {/* result count */}
      <div className="text-center text-sm text-slate-600 mb-8 font-medium">
        Showing {filtered.length} {filtered.length === 1 ? "member" : "members"}
      </div>

      {/* Directory Content Area */}
      <div className="max-w-4xl mx-auto relative pr-6 sm:pr-10">
        <div ref={listStartRef} className="absolute top-0 h-px w-full" />

        {/* Alphabet Scrubber: fixed to viewport, fades in once you scroll to the names */}
        {activeFilter !== "recent" && letters.length > 1 && (
          <div
            className={`fixed right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center
              transition-all duration-300 ease-out
              ${showScrubber ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-4 pointer-events-none"}`}
          >
            <div
              ref={scrubberRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="flex flex-col items-center gap-0.5 bg-white/70 backdrop-blur-xl px-1.5 py-2.5 rounded-full border border-white/60 shadow-lg shadow-slate-300/40 touch-none select-none"
            >
              {letters.map((letter, i) => (
                <button
                  key={letter}
                  data-letter={letter}
                  onClick={() => flashLetter(letter)}
                  style={getMagnifyStyle(i)}
                  className={`relative w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold
                    transition-transform duration-150 ease-out
                    before:absolute before:-inset-2 before:content-['']
                    ${dragLetter === letter ? "text-gold" : "text-slate-400 hover:text-slate-800"}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Big center letter bubble: frosted glass, gold gradient ring, guaranteed to vanish */}
        {dragLetter && (
          <div
            className={`fixed inset-0 z-40 flex items-center justify-center pointer-events-none
              transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${isDragging ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          >
            <div className="relative w-28 h-28 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-black/30">
              <div className="absolute inset-0 rounded-[2rem] bg-slate-900/75 backdrop-blur-xl" />
              <div
                className="absolute inset-0 rounded-[2rem] opacity-70"
                style={{
                  background: "conic-gradient(from 180deg, #d4af37, #f5e7a3, #d4af37)",
                  padding: "1.5px",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <span className="relative text-white text-5xl font-bold tracking-tight">{dragLetter}</span>
            </div>
          </div>
        )}

        {/* List by Groups */}
        {Object.entries(groupedProfiles).length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className="text-lg font-bold text-slate-800">No members found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedProfiles).map(([letter, groupProfiles]) => (
              <div key={letter} id={`group-${letter}`} className="relative scroll-mt-24">
                <div className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-md py-2 mb-3 shadow-[0_4px_10px_-10px_rgba(0,0,0,0.1)]">
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-3">
                    <span className="bg-slate-200 text-slate-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-inner">
                      {letter.substring(0, 2)}
                    </span>
                    {letter === "Recently Updated" && <span className="text-sm font-medium text-slate-500">Chronological</span>}
                  </h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {groupProfiles.map((p) => (
                    <li
                      key={p.id}
                      className="bg-white border border-slate-100 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/30 hover:-translate-y-0.5 group overflow-hidden relative animate-fade-in-up"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-darkGold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Link
                        href={`/students/${p.id}/${createSlug(p.name)}`}
                        prefetch={false}
                        className="flex items-center px-4 py-3 min-h-[4.5rem]"
                      >
                        <div
                          className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm mr-4 shrink-0 group-hover:bg-gold/10 group-hover:text-darkGold group-hover:border-gold/20 transition-colors"
                          style={{ background: gradientForKey(p.id) }}
                        >
                          {p.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0 pr-4">
                          <span className="block font-semibold text-slate-800 text-[15px] truncate group-hover:text-slate-900 transition-colors">
                            {p.name}
                          </span>
                          <span className="block text-[11px] text-slate-400 font-mono mt-0.5 tracking-wider">
                            ID: {p.id}
                          </span>
                          {activeFilter === "recent" && p.lastUpdated && (
                            <span className="block text-[10px] text-blue-500 mt-1 font-medium">
                              Updated: {p.lastUpdated.split(" ")[0]}
                            </span>
                          )}
                        </div>
                        <div className="w-7 h-7 shrink-0 rounded-full bg-slate-50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <span className="text-gold font-bold text-sm">→</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}