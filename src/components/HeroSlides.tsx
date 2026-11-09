"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string; caption: string; width: number; height: number; position?: string };

const INTERVAL_MS = 5000;

/**
 * Two hero photographs that change every 5 seconds. The first is the primary and is what
 * shows with scripting off. Under reduced motion the swap is instant instead of a fade. Rotation pauses on hover and focus,
 * and a visible control stops it (WCAG 2.2.2).
 */
export default function HeroSlides({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [moved, setMoved] = useState(false); // fade only after the first change, so the primary photo paints at once
  const [held, setHeld] = useState(false); // the visitor pressed pause
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const running = !held && !hover && !focus;

  const next = useCallback(() => {
    setMoved(true);
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(next, INTERVAL_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [running, next, index]);

  const current = slides[index];

  return (
    <figure
      className="photo hero-slides"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <div className="photo__frame photo__frame--square">
        {slides.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={s.width}
            height={s.height}
            sizes="(min-width: 60rem) 50vw, 100vw"
            priority={i === 0}
            loading="eager"
            fetchPriority={i === 0 ? "high" : "low"}
            className="hero-slides__img"
            data-active={i === index}
            data-entering={moved && i === index}
            aria-hidden={i === index ? undefined : true}
            style={{ objectPosition: s.position ?? "50% 50%" }}
          />
        ))}
      </div>
      <figcaption className="hero-slides__bar">
        <span className="hero-slides__caption" aria-live={running ? "off" : "polite"}>
          {current.caption}
        </span>
        <span className="hero-slides__controls">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className="hero-slides__dot"
              aria-label={`Show photograph ${i + 1} of ${slides.length}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => {
                setMoved(true);
                setIndex(i);
              }}
            />
          ))}
          <button
            type="button"
            className="hero-slides__pause"
            aria-pressed={held}
            onClick={() => setHeld((h) => !h)}
          >
            {held ? "Play" : "Pause"}
          </button>
        </span>
      </figcaption>
    </figure>
  );
}
