"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  certQuestions,
  selectCertQuestions,
  type CertQuestion,
  type CertCategory,
} from "../lib/games/certQuestions";
import { useProgress } from "./ProgressProvider";

export function CertQuizGame() {
  const [selectedCategory, setSelectedCategory] = useState<CertCategory>("all");
  const [round, setRound] = useState<CertQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const lock = useRef(false);
  const attemptId = useRef("");
  const heading = useRef<HTMLHeadingElement>(null);
  const { complete, ready } = useProgress();

  const start = (cat: CertCategory = selectedCategory) => {
    setSelectedCategory(cat);
    const questions = selectCertQuestions(cat, 10);
    attemptId.current = crypto.randomUUID();
    lock.current = false;
    setIndex(0);
    setCorrect(0);
    setAnswer(null);
    setDone(false);
    setRound(questions);
    requestAnimationFrame(() => heading.current?.focus());
  };

  const choose = (choice: number) => {
    if (lock.current || answer !== null || done) return;
    lock.current = true;
    setAnswer(choice);
    if (choice === round[index].answerIndex) {
      setCorrect((n) => n + 1);
    }
  };

  const next = () => {
    if (answer === null) return;
    if (index === round.length - 1) {
      complete("cert-quiz", correct * 10, attemptId.current);
      setDone(true);
    } else {
      setIndex((n) => n + 1);
      setAnswer(null);
      lock.current = false;
    }
    requestAnimationFrame(() => heading.current?.focus());
  };

  const question = round[index];

  return (
    <section className="game-panel" style={{ position: "relative" }}>
      {!question ? (
        <>
          <span className="card-icon" style={{ fontSize: "2rem" }}>🛡️</span>
          <h2>Certification Practice Arena</h2>
          <p>
            Choose a CompTIA exam track or challenge yourself with the combined IT Systems battery. Each set provides in-depth explanations and domain references.
          </p>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", margin: "1.25rem 0" }}>
            {[
              { id: "all", label: "All Certs (Full Battery)" },
              { id: "a-plus", label: "CompTIA A+ (Core 1 & 2)" },
              { id: "network-plus", label: "CompTIA Network+" },
              { id: "security-plus", label: "CompTIA Security+" },
            ].map((track) => (
              <button
                key={track.id}
                type="button"
                className={`button ${selectedCategory === track.id ? "" : "secondary"}`}
                style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
                onClick={() => setSelectedCategory(track.id as CertCategory)}
              >
                {track.label}
              </button>
            ))}
          </div>

          <button className="button" onClick={() => start(selectedCategory)} disabled={!ready}>
            Start {selectedCategory === "all" ? "Comprehensive" : selectedCategory.toUpperCase()} Quiz
          </button>
        </>
      ) : done ? (
        <>
          <p className="eyebrow">DIAGNOSTIC COMPLETE</p>
          <h2 ref={heading} tabIndex={-1}>
            Domain Assessment Finished
          </h2>
          <div className="result-number">
            {correct}
            <small> / {round.length} correct</small>
          </div>
          <p>
            Score: {Math.round((correct / round.length) * 100)}% ({correct * 10} XP earned).
          </p>
          <div className="actions">
            <button className="button" onClick={() => start(selectedCategory)}>
              Retake Quiz
            </button>
            <button className="button secondary" onClick={() => setRound([])}>
              Change Track
            </button>
            <Link className="text-link" href="/arcade">
              Back to Arcade →
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="game-hud">
            <span>
              QUESTION {index + 1} OF {round.length} · <strong style={{ color: "#00f2ff" }}>{question.categoryLabel}</strong>
            </span>
            <span>{correct} correct</span>
          </div>

          <progress
            aria-label="Quiz progress"
            value={index + (answer !== null ? 1 : 0)}
            max={round.length}
            style={{ width: "100%", margin: "0.5rem 0 1.5rem" }}
          />

          <h3 style={{ fontSize: "1.15rem", lineHeight: 1.4, margin: "1rem 0" }}>{question.text}</h3>

          <div className="matrix-quiz-choices" style={{ display: "grid", gap: "0.75rem", margin: "1.25rem 0" }}>
            {question.choices.map((choice, i) => {
              const isSelected = answer === i;
              const isCorrect = answer !== null && i === question.answerIndex;
              const isWrong = isSelected && !isCorrect;

              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={answer !== null}
                  style={{
                    padding: "0.75rem 1rem",
                    textAlign: "left",
                    borderRadius: "8px",
                    border: isCorrect
                      ? "1px solid #2ea043"
                      : isWrong
                      ? "1px solid #da3633"
                      : "1px solid rgba(255, 255, 255, 0.15)",
                    background: isCorrect
                      ? "rgba(46, 160, 67, 0.2)"
                      : isWrong
                      ? "rgba(218, 54, 51, 0.2)"
                      : "rgba(255, 255, 255, 0.04)",
                    color: "#f8fafc",
                    cursor: answer !== null ? "default" : "pointer",
                    fontSize: "0.95rem",
                  }}
                >
                  <span style={{ marginRight: "0.75rem", opacity: 0.6 }}>{String.fromCharCode(65 + i)}.</span>
                  {choice}
                </button>
              );
            })}
          </div>

          {answer !== null && (
            <div
              style={{
                marginTop: "1.25rem",
                padding: "1rem",
                borderRadius: "8px",
                background: answer === question.answerIndex ? "rgba(46, 160, 67, 0.1)" : "rgba(218, 54, 51, 0.1)",
                border: "1px solid " + (answer === question.answerIndex ? "rgba(46, 160, 67, 0.3)" : "rgba(218, 54, 51, 0.3)"),
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "0.25rem", color: answer === question.answerIndex ? "#38ef7d" : "#ff7b72" }}>
                {answer === question.answerIndex ? "✓ Correct" : "✗ Needs Review"}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "0.5rem" }}>
                {question.reference}
              </div>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#cbd5e1" }}>
                {question.explanation}
              </p>
            </div>
          )}

          <div className="actions" style={{ marginTop: "1.5rem" }}>
            {answer !== null && (
              <button className="button" onClick={next}>
                {index === round.length - 1 ? "Complete Diagnostic" : "Next Question →"}
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
