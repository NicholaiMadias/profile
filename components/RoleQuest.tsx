"use client";
import { useEffect, useEffectEvent, useRef, useState } from "react";

export type RoleQuestion = {
  prompt: string;
  answers: [string, string, string, string];
  correct: number;
  why: string;
  source: string;
};
export type RoleMission = {
  id: string;
  role: string;
  title: string;
  lesson: string;
  questions: RoleQuestion[];
};

export default function RoleQuest({
  missions,
  storageId,
}: {
  missions: RoleMission[];
  storageId: string;
}) {
  const [id, setId] = useState(missions[0]?.id ?? "");
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [points, setPoints] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bests, setBests] = useState<Record<string, number>>({});
  const quizHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(storageId) ?? "{}");
      if (value && typeof value === "object" && !Array.isArray(value))
        setBests(value);
    } catch {}
  }, [storageId]);
  const mission = missions.find((m) => m.id === id) ?? missions[0];
  function selectMission(next: string) {
    setId(next);
    setStep(0);
    setChoice(null);
    setPoints(0);
    setFinished(false);
  }

  function focusQuiz() {
    requestAnimationFrame(() => quizHeading.current?.focus());
  }

  const syncQuizToHash = useEffectEvent(() => {
    const hash = window.location.hash;
    const target = hash
      ? missions.find((item) => hash === `#quiz-${item.id}`)
      : missions[0];
    if (!target) return;
    if (target.id !== mission?.id) selectMission(target.id);
    if (hash) focusQuiz();
  });

  useEffect(() => {
    const onHashChange = () => syncQuizToHash();
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (!mission) return <p>Lessons are being prepared.</p>;
  const question = mission.questions[step];

  function advance() {
    const total = points + (choice === question.correct ? 1 : 0);
    setPoints(total);
    if (step === mission.questions.length - 1) {
      setFinished(true);
      const updated = {
        ...bests,
        [mission.id]: Math.max(total, bests[mission.id] ?? 0),
      };
      setBests(updated);
      try {
        localStorage.setItem(storageId, JSON.stringify(updated));
      } catch {}
    } else {
      setStep(step + 1);
      setChoice(null);
    }
  }
  return (
    <section aria-label="Guided learning missions">
      <div className="card-grid two section">
        {missions.map((item) => {
          const isSelected = item.id === mission.id;
          const best = bests[item.id];
          const action =
            isSelected && finished
              ? "View result"
              : isSelected && (step > 0 || choice !== null)
                ? "Continue quiz"
                : "Start quiz";
          return (
            <a
              key={item.id}
              href={`#quiz-${item.id}`}
              onClick={(event) => {
                if (window.location.hash === event.currentTarget.hash)
                  focusQuiz();
              }}
              aria-current={isSelected ? "location" : undefined}
              style={{
                display: "block",
                textAlign: "left",
                padding: 20,
                border: "1px solid currentColor",
                borderRadius: 12,
                background: "transparent",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <strong>
                {item.role} — {item.title}
              </strong>
              <span style={{ display: "block", marginBottom: 12 }}>
                {item.lesson}
              </span>
              <span style={{ display: "block", color: "var(--accent)" }}>
                {action} →
              </span>
              <small>
                {best === undefined
                  ? `${item.questions.length} questions`
                  : `Best score: ${best} / ${item.questions.length}`}
              </small>
            </a>
          );
        })}
      </div>
      <div
        id={`quiz-${mission.id}`}
        className="feature-card"
        style={{ marginTop: 24, padding: 24 }}
      >
        <p className="eyebrow">
          {mission.role} ·{" "}
          {finished
            ? "Mission completed"
            : `Question ${step + 1} / ${mission.questions.length}`}
        </p>
        <h2 ref={quizHeading} tabIndex={-1}>
          {finished
            ? `Mission complete: ${points} / ${mission.questions.length}`
            : question.prompt}
        </h2>
        {finished ? (
          <>
            <p>
              Read the lesson again or try another role. Scores are saved on
              this browser, not to an account.
            </p>
            <button
              type="button"
              onClick={() => {
                selectMission(mission.id);
                focusQuiz();
              }}
            >
              Try again
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "grid", gap: 12 }}>
              {question.answers.map((answer, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={choice !== null}
                  onClick={() => setChoice(i)}
                  style={{
                    padding: 14,
                    textAlign: "left",
                    borderRadius: 8,
                    border: "1px solid #888",
                    color: "inherit",
                    background: "transparent",
                  }}
                >
                  {String.fromCharCode(65 + i)}. {answer}
                </button>
              ))}
            </div>
            {choice !== null && (
              <div role="status" style={{ marginTop: 20 }}>
                <p>
                  <strong>
                    {choice === question.correct ? "Correct." : "Review:"}
                  </strong>{" "}
                  {question.why}
                </p>
                <p>
                  <strong>Reference:</strong> {question.source}
                </p>
                <button type="button" onClick={advance}>
                  {step + 1 === mission.questions.length
                    ? "Finish mission"
                    : "Next question →"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
