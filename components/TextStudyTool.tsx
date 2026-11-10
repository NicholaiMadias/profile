"use client";

import { useMemo, useState } from "react";
import { analyzeText } from "../lib/tools/text-stats.js";

export function TextStudyTool() {
  const [text, setText] = useState("");
  const stats = useMemo(() => analyzeText(text), [text]);

  return (
    <div className="text-study-tool">
      <label className="field-label" htmlFor="text-study-input">
        Paste or write text to analyze
      </label>
      <textarea
        id="text-study-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Start with a passage, note, or draft..."
        rows={7}
      />
      <dl className="text-study-stats" aria-live="polite">
        <div>
          <dt>Words</dt>
          <dd>{stats.wordCount}</dd>
        </div>
        <div>
          <dt>Characters</dt>
          <dd>{stats.characterCount}</dd>
        </div>
        <div>
          <dt>Sentences</dt>
          <dd>{stats.sentenceCount}</dd>
        </div>
        <div>
          <dt>Reading time</dt>
          <dd>
            {stats.readingMinutes} min
            {stats.readingMinutes === 1 ? "" : "s"}
          </dd>
        </div>
      </dl>
      <p className="quiet">Text stays in this page and is not uploaded.</p>
    </div>
  );
}
