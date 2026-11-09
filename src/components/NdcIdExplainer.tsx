"use client";

import { useState } from "react";

const PRESETS = [
  { id: "62101030", label: "62101030 (Group A)" },
  { id: "12101005", label: "12101005 (Science)" },
  { id: "42101018", label: "42101018 (Humanities)" },
];

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
    <div className="decoder">
      <div className="decoder__top">
        <div>
          <h2>Notre Dame College student ID breakdown</h2>
          <p className="lead" style={{ marginTop: "var(--space-md)" }}>
            Every NDC student receives an 8-digit roll number. Here is how each section is formed.
          </p>
        </div>

        <div className="decoder__input">
          <label htmlFor="id-input">Enter an 8-digit ID</label>
          <input
            id="id-input"
            className="field field--mono"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={8}
            value={inputRoll}
            onChange={(e) => setInputRoll(e.target.value.replace(/\D/g, ""))}
            placeholder="e.g. 62101030"
            aria-describedby="id-result"
          />
        </div>
      </div>

      <div className="decoder__presets">
        <span className="label" id="presets-label">
          Examples
        </span>
        <div className="seg" role="group" aria-labelledby="presets-label">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={inputRoll === p.id}
              onClick={() => setInputRoll(p.id)}
              className="num"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div id="id-result" aria-live="polite">
        {isValidLength ? (
          <div style={{ display: "grid", gap: "var(--space-xl)" }}>
            <ol className="decoder__digits" aria-label="The four parts of the ID">
              <li>
                <b>{digit1}</b>
                <span className="label">Subject</span>
              </li>
              <li>
                <b>{digits23}</b>
                <span className="label">Batch</span>
              </li>
              <li>
                <b>{digits45}</b>
                <span className="label">Group</span>
              </li>
              <li>
                <b>{digits678}</b>
                <span className="label">Roll</span>
              </li>
            </ol>

            <dl className="facts">
              <div>
                <dt>1st digit, subject</dt>
                <dd>
                  <strong>{discipline?.name}</strong>
                  <br />
                  1 to 3 = Science, 4 to 5 = Humanities, 6 and above = Business Studies.
                </dd>
              </div>
              <div>
                <dt>Digits 2 and 3, passing year</dt>
                <dd>
                  <strong>HSC {hscYear}</strong>
                  <br />
                  The year students appear for the HSC board exam ({digits23} = {hscYear}).
                </dd>
              </div>
              <div>
                <dt>Digits 4 and 5, group</dt>
                <dd>
                  <strong>{groupName}</strong>
                  <br />
                  In Business Studies, 01 is Group A, 02 is Group B, and so on.
                </dd>
              </div>
              <div>
                <dt>Digits 6 to 8, serial roll</dt>
                <dd>
                  <strong className="num">#{serialRoll}</strong>
                  <br />
                  The sequential classroom roll assigned within the section.
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          <p className="decoder__error" role="alert">
            Please enter an 8-digit Notre Dame College ID (e.g. 62101030).
          </p>
        )}
      </div>

      <p className="decoder__note">
        <strong>Note on serial roll.</strong> At Notre Dame College, the last 3 digits (such as <code className="num">030</code>)
        are an administrative roll number within that group, used for attendance records.{" "}
        <strong>This number does not indicate admission test score or academic rank.</strong> All students in the section
        are admitted on equal footing.
      </p>
    </div>
  );
}
