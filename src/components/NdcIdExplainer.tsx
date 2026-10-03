"use client";

import { useState } from "react";

export default function NdcIdExplainer() {
  const [inputRoll, setInputRoll] = useState("62101030");

  const cleanRoll = inputRoll.trim();
  const isValidLength = cleanRoll.length === 8 && /^\d+$/.test(cleanRoll);

  // Decode components
  const digit1 = cleanRoll.charAt(0);
  const digits23 = cleanRoll.substring(1, 3);
  const digits45 = cleanRoll.substring(3, 5);
  const digits678 = cleanRoll.substring(5, 8);

  const getDiscipline = (d: string) => {
    const n = parseInt(d, 10);
    if (n >= 1 && n <= 3) return { name: "Science", desc: "Bangla Medium and English Version Science" };
    if (n === 4 || n === 5) return { name: "Humanities", desc: "Humanities and Arts stream" };
    if (n >= 6) return { name: "Business Studies", desc: "Business Studies (Commerce) stream" };
    return { name: "Special Category", desc: "Other program" };
  };

  const getGroup = (d1: string, g: string) => {
    const disciplineNum = parseInt(d1, 10);
    const groupNum = parseInt(g, 10);
    if (disciplineNum >= 6) {
      // In Business Studies: 01 = Group A, 02 = Group B, etc.
      const letter = String.fromCharCode(64 + groupNum);
      return `Group ${letter} (Section ${groupNum})`;
    }
    return `Group ${groupNum}`;
  };

  const discipline = isValidLength ? getDiscipline(digit1) : null;
  const hscYear = isValidLength ? `20${digits23}` : null;
  const groupName = isValidLength ? getGroup(digit1, digits45) : null;
  const serialRoll = isValidLength ? parseInt(digits678, 10) : null;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-8 my-6 sm:my-8 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20 inline-block">
            Student ID Guide
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            Notre Dame College Student ID Breakdown
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Every NDC student receives an 8-digit roll number. Here is how each section is formed:
          </p>
        </div>

        {/* Input box */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="id-input" className="text-xs font-semibold text-slate-600 sm:hidden shrink-0">
            Enter ID:
          </label>
          <input
            id="id-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={8}
            value={inputRoll}
            onChange={(e) => setInputRoll(e.target.value.replace(/\D/g, ""))}
            placeholder="e.g. 62101030"
            className="w-full sm:w-36 font-mono text-center text-base sm:text-lg font-bold py-2 px-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold bg-slate-50"
          />
        </div>
      </div>

      {/* Preset example buttons */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6">
        <span className="text-xs font-semibold text-slate-400 w-full sm:w-auto mb-0.5 sm:mb-0">Examples:</span>
        <button
          onClick={() => setInputRoll("62101030")}
          className={`text-xs font-mono font-semibold px-2.5 py-1.5 rounded-lg transition active:scale-95 ${
            inputRoll === "62101030"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          62101030 (Group A)
        </button>
        <button
          onClick={() => setInputRoll("12101005")}
          className={`text-xs font-mono font-semibold px-2.5 py-1.5 rounded-lg transition active:scale-95 ${
            inputRoll === "12101005"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          12101005 (Science)
        </button>
        <button
          onClick={() => setInputRoll("42101018")}
          className={`text-xs font-mono font-semibold px-2.5 py-1.5 rounded-lg transition active:scale-95 ${
            inputRoll === "42101018"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          42101018 (Humanities)
        </button>
      </div>

      {isValidLength ? (
        <div className="space-y-5 sm:space-y-6">
          {/* Visual Breakdown Strip */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-3 max-w-2xl mx-auto text-center font-mono select-none">
            {/* Box 1 */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl sm:rounded-2xl p-2 sm:p-3.5">
              <span className="block text-xl sm:text-3xl md:text-4xl font-extrabold text-blue-700">{digit1}</span>
              <span className="block text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-wide mt-1">Subject</span>
            </div>

            {/* Box 2 */}
            <div className="bg-purple-50 border-2 border-purple-300 rounded-xl sm:rounded-2xl p-2 sm:p-3.5">
              <span className="block text-xl sm:text-3xl md:text-4xl font-extrabold text-purple-700">{digits23}</span>
              <span className="block text-[10px] sm:text-xs font-bold text-purple-600 uppercase tracking-wide mt-1">Batch</span>
            </div>

            {/* Box 3 */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl sm:rounded-2xl p-2 sm:p-3.5">
              <span className="block text-xl sm:text-3xl md:text-4xl font-extrabold text-emerald-700">{digits45}</span>
              <span className="block text-[10px] sm:text-xs font-bold text-emerald-600 uppercase tracking-wide mt-1">Group</span>
            </div>

            {/* Box 4 */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl sm:rounded-2xl p-2 sm:p-3.5">
              <span className="block text-xl sm:text-3xl md:text-4xl font-extrabold text-amber-700">{digits678}</span>
              <span className="block text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-wide mt-1">Roll</span>
            </div>
          </div>

          {/* Detailed explanation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                1st
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Subject: {discipline?.name}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                  1 to 3 = Science, 4 to 5 = Humanities, 6 and above = Business Studies.
                </p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-600 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                2-3
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Passing Year: HSC {hscYear}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                  The year students appear for the HSC board exam ({digits23} = {hscYear}).
                </p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                4-5
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Group / Section: {groupName}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                  In Business Studies, 01 is Group A, 02 is Group B, and so on.
                </p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/70 border border-amber-100 flex items-start gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-600 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                6-8
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Serial Roll: #{serialRoll}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                  The sequential classroom roll assigned within the section.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-6 bg-rose-50 border border-rose-200 rounded-xl sm:rounded-2xl text-center text-rose-700 text-xs sm:text-sm font-medium">
          Please enter an 8-digit Notre Dame College ID (e.g. 62101030).
        </div>
      )}

      {/* Note on Merit */}
      <div className="mt-5 sm:mt-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900 text-white flex items-start gap-3 shadow-sm">
        <span className="text-lg sm:text-xl shrink-0 mt-0.5">ℹ️</span>
        <div className="text-xs sm:text-sm leading-relaxed">
          <strong className="text-gold font-bold">Note on Serial Roll:</strong> At Notre Dame College, the last 3 digits (such as <code>030</code>) are an administrative roll number within that group used for attendance records. <strong>This number does not indicate admission test score or academic rank.</strong> All students in the section are admitted on equal footing.
        </div>
      </div>
    </div>
  );
}
