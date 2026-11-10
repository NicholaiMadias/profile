"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { accuracyPercent, nextWord } from "../lib/games/word-sprint.js";

const ROUND_SECONDS = 30;

export function WordSprint() {
  const [status, setStatus] = useState<"idle" | "playing" | "ended">("idle");
  const [target, setTarget] = useState("");
  const [entry, setEntry] = useState("");
  const [correct, setCorrect] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [remaining, setRemaining] = useState(ROUND_SECONDS);
  const [feedback, setFeedback] = useState("");
  const endTime = useRef(0);
  const resultHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status !== "playing") return;
    const timer = window.setInterval(() => {
      const seconds = Math.max(0, Math.ceil((endTime.current - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) setStatus("ended");
    }, 100);
    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (status === "ended") resultHeading.current?.focus();
  }, [status]);

  function startRound() {
    endTime.current = Date.now() + ROUND_SECONDS * 1000;
    setTarget(nextWord(""));
    setEntry("");
    setCorrect(0);
    setAttempted(0);
    setRemaining(ROUND_SECONDS);
    setFeedback("");
    setStatus("playing");
  }

  function submitWord(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "playing" || !entry.trim()) return;

    const isCorrect = entry.trim().toLocaleLowerCase() === target;
    setAttempted((count) => count + 1);
    if (isCorrect) setCorrect((count) => count + 1);
    setFeedback(isCorrect ? "Correct!" : `Not quite — the word was “${target}”.`);
    setTarget(nextWord(target));
    setEntry("");
  }

  return (
    <section className="word-sprint-panel" aria-label="Word Sprint game">
      {status === "idle" ? (
        <>
          <p>Type each word as accurately as you can before the 30-second timer runs out.</p>
          <button className="button" onClick={startRound}>Start a 30-second round</button>
        </>
      ) : status === "ended" ? (
        <>
          <p className="eyebrow">ROUND COMPLETE</p>
          <h2 ref={resultHeading} tabIndex={-1}>A good burst of focus.</h2>
          <p className="word-sprint-score">
            {correct} correct · {accuracyPercent(correct, attempted)}% accuracy
          </p>
          <div className="actions">
            <button className="button" onClick={startRound}>Play again</button>
            <Link className="text-link" href="/arcade">Back to arcade →</Link>
          </div>
        </>
      ) : (
        <>
          <div className="game-hud">
            <span>{correct} correct</span>
            <span role="timer" aria-label="Seconds remaining">{remaining}s remaining</span>
          </div>
          <p className="word-sprint-target" aria-live="polite">{target}</p>
          <form className="word-sprint-form" onSubmit={submitWord}>
            <label className="field-label" htmlFor="word-sprint-entry">Type the word above</label>
            <input
              id="word-sprint-entry"
              autoFocus
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              value={entry}
              onChange={(event) => setEntry(event.target.value)}
            />
            <button className="button" type="submit">Submit word</button>
          </form>
          <p className="word-sprint-feedback" aria-live="polite">{feedback || " "}</p>
        </>
      )}
    </section>
  );
}
