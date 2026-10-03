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
    if (n >= 1 && n <= 3) return { name: "Science", desc: "Bangla Medium / English Version Science groups" };
    if (n === 4 || n === 5) return { name: "Humanities", desc: "Arts and Social Sciences discipline" };
    if (n >= 6) return { name: "Business Studies", desc: "Commerce / Business Studies discipline" };
    return { name: "Unknown", desc: "Special category" };
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
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 my-8 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
            Interactive Decoder
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
            Notre Dame College 8-Digit ID Architecture
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Every Notredamian is assigned a unique 8-digit college identity number. Here is how it is structured:
          </p>
        </div>

        {/* Input box */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            maxLength={8}
            value={inputRoll}
            onChange={(e) => setInputRoll(e.target.value.replace(/\D/g, ""))}
            placeholder="e.g. 62101030"
            className="w-36 font-mono text-center text-lg font-bold py-2 px-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold bg-slate-50"
          />
        </div>
      </div>

      {/* Preset example buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-semibold text-slate-400">Try examples:</span>
        <button
          onClick={() => setInputRoll("62101030")}
          className={`text-xs font-mono font-bold px-3 py-1 rounded-lg transition ${
            inputRoll === "62101030"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          62101030 (Batch 2021 Group A)
        </button>
        <button
          onClick={() => setInputRoll("12101005")}
          className={`text-xs font-mono font-bold px-3 py-1 rounded-lg transition ${
            inputRoll === "12101005"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          12101005 (Science)
        </button>
        <button
          onClick={() => setInputRoll("42101018")}
          className={`text-xs font-mono font-bold px-3 py-1 rounded-lg transition ${
            inputRoll === "42101018"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          42101018 (Humanities)
        </button>
      </div>

      {isValidLength ? (
        <div className="space-y-6">
          {/* Visual Breakdown Strip */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto text-center font-mono select-none">
            {/* Box 1 */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-3 sm:p-4">
              <span className="block text-2xl sm:text-4xl font-extrabold text-blue-700">{digit1}</span>
              <span className="block text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-wider mt-1">Discipline</span>
            </div>

            {/* Box 2 */}
            <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-3 sm:p-4">
              <span className="block text-2xl sm:text-4xl font-extrabold text-purple-700">{digits23}</span>
              <span className="block text-[10px] sm:text-xs font-bold text-purple-600 uppercase tracking-wider mt-1">Batch Year</span>
            </div>

            {/* Box 3 */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 sm:p-4">
              <span className="block text-2xl sm:text-4xl font-extrabold text-emerald-700">{digits45}</span>
              <span className="block text-[10px] sm:text-xs font-bold text-emerald-600 uppercase tracking-wider mt-1">Group</span>
            </div>

            {/* Box 4 */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 sm:p-4">
              <span className="block text-2xl sm:text-4xl font-extrabold text-amber-700">{digits678}</span>
              <span className="block text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-wider mt-1">Serial Roll</span>
            </div>
          </div>

          {/* Detailed explanation cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-mono font-bold flex items-center justify-center shrink-0">
                1st
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Discipline Stream: {discipline?.name}</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  <strong>1–3</strong> = Science, <strong>4–5</strong> = Humanities, <strong>6+</strong> = Business Studies.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-mono font-bold flex items-center justify-center shrink-0">
                2–3
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Batch Passing Year: HSC {hscYear}</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Represents the Higher Secondary Certificate exam completion year ({digits23} = {hscYear}).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-mono font-bold flex items-center justify-center shrink-0">
                4–5
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Group / Section: {groupName}</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  In Business Studies, 01 designates Group A, 02 designates Group B, and so forth.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-mono font-bold flex items-center justify-center shrink-0">
                6–8
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Class Roll: #{serialRoll}</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  The sequential classroom roster number assigned within the group.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center text-rose-700 text-sm font-medium">
          Please enter a valid 8-digit Notre Dame College ID (e.g. 62101030).
        </div>
      )}

      {/* Critical Note on Merit */}
      <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-white flex items-start gap-3 shadow-sm">
        <span className="text-xl shrink-0">💡</span>
        <div className="text-xs sm:text-sm leading-relaxed">
          <strong className="text-gold font-bold">Important Note on Merit:</strong> At Notre Dame College, the 3-digit serial roll number (e.g. <code>030</code>) is purely an administrative sequential identifier within that specific group. <strong>It does not represent student merit, admission test rank, or academic standing.</strong> Every student in the group shares equal stature.
        </div>
      </div>
    </div>
  );
}
