"use client";

import { useRef } from "react";

/**
 * The hero's search. Works with scripting off as a plain GET form to /?search=…#directory,
 * and with scripting on it filters the register below without a page load.
 */
export default function HeroSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const send = (value: string) => {
    window.dispatchEvent(new CustomEvent("ndc:search", { detail: value }));
  };

  return (
    <form
      className="finder"
      role="search"
      action="/#directory"
      method="get"
      onSubmit={(e) => {
        e.preventDefault();
        const value = inputRef.current?.value ?? "";
        send(value);
        document.getElementById("directory")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <label htmlFor="hero-search">Search by name or 8-digit ID</label>
      <div className="finder__row">
        <input
          ref={inputRef}
          id="hero-search"
          className="field"
          type="search"
          name="search"
          autoComplete="off"
          inputMode="search"
          placeholder="Name or ID, such as 62101030"
          onChange={(e) => send(e.target.value)}
        />
        <button className="btn btn--primary" type="submit">
          Find a classmate
        </button>
      </div>
    </form>
  );
}
