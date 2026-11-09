"use client";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Profile } from "@/types/profile";
import { createSlug } from "@/lib/slug";
import Link from "next/link";

type FilterType = "all" | "recent" | "linkedin" | "bio" | "picture";

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "recent", label: "Recently updated" },
  { key: "linkedin", label: "Has LinkedIn" },
  { key: "bio", label: "Has bio" },
  { key: "picture", label: "Has picture" },
];

const RECENT_KEY = "Recently Updated";

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

  // The hero search and a ?search= link both feed the same query
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("search");
    if (initial) setQuery(initial);
    const onSearch = (e: Event) => setQuery(String((e as CustomEvent).detail ?? ""));
    window.addEventListener("ndc:search", onSearch);
    return () => window.removeEventListener("ndc:search", onSearch);
  }, []);

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

  // 2. Grouping Logic (contacts-book style)
  const groupedProfiles = useMemo(() => {
    if (activeFilter === "recent") {
      return { [RECENT_KEY]: filtered };
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
      const bottom = listStartRef.current.parentElement?.getBoundingClientRect().bottom ?? 0;
      setShowScrubber(top < 80 && bottom > 240);
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
      e.currentTarget.setPointerCapture(e.pointerId); // guarantees pointerup always reaches us
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

  const entries = Object.entries(groupedProfiles);

  return (
    <>
      <div className="section__head">
        <h2 id="directory-title">Every member of Group A</h2>
        <p className="lead">Open a name to see the photo, bio and links they chose to share.</p>
      </div>

      <div className="register__tools">
        <div className="register__search">
          <label htmlFor="directory-search">Search the register</label>
          <input
            id="directory-search"
            className="field"
            type="search"
            autoComplete="off"
            placeholder="Name or ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <p className="register__count" role="status" aria-live="polite">
            Showing {filtered.length} {filtered.length === 1 ? "member" : "members"}
          </p>
        </div>

        <div className="seg" role="group" aria-label="Filter members">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={activeFilter === f.key}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Directory content */}
      <div className="register__body">
        <div ref={listStartRef} className="visually-hidden" aria-hidden="true" />

        {/* Alphabet scrubber: fixed to the viewport, fades in once you scroll to the names */}
        {activeFilter !== "recent" && letters.length > 1 && (
          <div className="scrubber" data-visible={showScrubber}>
            <div
              ref={scrubberRef}
              role="group"
              aria-label="Jump to a letter"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="scrubber__strip"
            >
              {letters.map((letter, i) => (
                <button
                  key={letter}
                  type="button"
                  data-letter={letter}
                  aria-label={`Jump to ${letter}`}
                  aria-current={dragLetter === letter ? "true" : undefined}
                  tabIndex={showScrubber ? 0 : -1}
                  onClick={() => flashLetter(letter)}
                  style={getMagnifyStyle(i)}
                  className="scrubber__letter"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* The centre letter plate, guaranteed to vanish */}
        {dragLetter && (
          <div className="bubble" data-visible={isDragging} aria-hidden="true">
            <div className="bubble__plate">{dragLetter}</div>
          </div>
        )}

        {/* List by groups */}
        {entries.length === 0 ? (
          <div className="register__empty">
            <h3>No members found</h3>
            <p>Try another spelling, a shorter name or a different filter.</p>
          </div>
        ) : (
          entries.map(([letter, groupProfiles]) => (
            <div key={letter} id={`group-${letter}`} className="register__group">
              <h3 className={letter === RECENT_KEY ? "register__letter register__letter--wide" : "register__letter"}>
                {letter === RECENT_KEY ? "Most recent first" : letter.substring(0, 2)}
              </h3>
              <ul className="register__list">
                {groupProfiles.map((p) => (
                  <li key={p.id}>
                    <Link href={`/students/${p.id}/${createSlug(p.name)}`} prefetch={false} className="register__row">
                      <span className="register__name">{p.name}</span>
                      <span className="register__meta">
                        <span className="register__id num">{p.id}</span>
                        {activeFilter === "recent" && p.lastUpdated && (
                          <span className="register__updated">Updated {p.lastUpdated.split(" ")[0]}</span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  );
}
