"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { RoleMission } from "../lib/certification-quests";
import styles from "./RoleQuest.module.css";

type Round = {
  order: number[];
  answers: number[];
  step: number;
  selection: number | null;
  finished: boolean;
  retry: boolean;
};

function startRound(mission: RoleMission, missed?: number[]): Round {
  return {
    order: missed ?? mission.questions.map((_, index) => index),
    answers: [],
    step: 0,
    selection: null,
    finished: false,
    retry: missed !== undefined,
  };
}

function readScores(key: string): Record<string, unknown> {
  try {
    const values = JSON.parse(localStorage.getItem(key) ?? "{}");
    if (values && typeof values === "object" && !Array.isArray(values))
      return values;
  } catch {}
  return {};
}

function validScore(score: unknown, total: number): score is number {
  return (
    typeof score === "number" &&
    Number.isInteger(score) &&
    score >= 0 &&
    score <= total
  );
}

const legacyQuestionCounts: Record<string, number> = {
  aplus: 3,
  network: 3,
  security: 3,
};

export default function RoleQuest({
  missions,
  storageId,
}: {
  missions: RoleMission[];
  storageId: string;
}) {
  const [id, setId] = useState(missions[0]?.id);
  const [rounds, setRounds] = useState<Record<string, Round>>({});
  const [bests, setBests] = useState<Record<string, number>>({});
  const [previousBests, setPreviousBests] = useState<Record<string, unknown>>(
    {},
  );
  const quizHeading = useRef<HTMLHeadingElement>(null);
  const catalogHeading = useRef<HTMLHeadingElement>(null);
  const advanceButton = useRef<HTMLButtonElement>(null);
  const mission = missions.find((item) => item.id === id) ?? missions[0];

  function scoreKey(item: RoleMission) {
    return `${storageId}:${item.id}:${item.questions.length}`;
  }

  const loadScores = useEffectEvent(() => {
    const saved: Record<string, number> = {};
    for (const item of missions) {
      const score = readScores(scoreKey(item)).best;
      if (validScore(score, item.questions.length)) saved[item.id] = score;
    }
    setBests(saved);
    setPreviousBests(readScores("nicholai-cert-quests-v1"));
  });

  useEffect(() => {
    loadScores();
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key.startsWith(`${storageId}:`))
        loadScores();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageId]);

  function focusQuiz() {
    requestAnimationFrame(() => quizHeading.current?.focus());
  }

  const syncQuizToHash = useEffectEvent(() => {
    const hash = window.location.hash;
    if (hash === "#academy-games") {
      requestAnimationFrame(() => catalogHeading.current?.focus());
      return;
    }
    const target = hash
      ? missions.find((item) => hash === `#quiz-${item.id}`)
      : missions[0];
    if (target) setId(target.id);
    if (target && hash) focusQuiz();
  });

  useEffect(() => {
    const onHashChange = () => syncQuizToHash();
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (!mission) return <p>Lessons are being prepared.</p>;
  const round = rounds[mission.id] ?? startRound(mission);
  const question = mission.questions[round.order[round.step]];
  const submitted = round.answers.length > round.step;
  const selection = submitted ? round.answers[round.step] : round.selection;
  const total = round.order.length;
  const isIncident = Boolean(mission.incident);

  function setRound(next: Round) {
    setRounds((current) => ({ ...current, [mission.id]: next }));
  }

  function saveBest(answers: number[]) {
    const key = scoreKey(mission);
    const stored = readScores(key).best;
    const correct = answers.filter(
      (answer, step) => answer === mission.questions[round.order[step]].correct,
    ).length;
    const best = Math.max(
      bests[mission.id] ?? 0,
      validScore(stored, total) ? stored : 0,
      correct,
    );
    setBests((current) => ({ ...current, [mission.id]: best }));
    try {
      localStorage.setItem(key, JSON.stringify({ best }));
    } catch {}
  }

  function advance(answers: number[]) {
    const finished = round.step === total - 1;
    setRound({
      ...round,
      answers,
      finished,
      selection: null,
      step: finished ? round.step : round.step + 1,
    });
    if (finished && !round.retry) saveBest(answers);
    focusQuiz();
  }

  function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted || round.selection === null) return;
    const answers = [...round.answers, round.selection];
    if (isIncident) {
      advance(answers);
      return;
    }
    setRound({ ...round, answers });
    requestAnimationFrame(() => advanceButton.current?.focus());
  }

  function restart(missed?: number[]) {
    setRound(startRound(mission, missed));
    focusQuiz();
  }

  const missed = round.finished
    ? round.order.filter(
        (index, step) =>
          round.answers[step] !== mission.questions[index].correct,
      )
    : [];

  return (
    <section className={styles.academy} aria-label="Academy practice games">
      <div id={`quiz-${mission.id}`} className={styles.panel}>
        <div className={styles.meta}>
          <span>
            {mission.track} · {mission.title}
          </span>
          <a
            href="#academy-games"
            onClick={() => {
              if (window.location.hash === "#academy-games")
                catalogHeading.current?.focus();
            }}
          >
            Choose a game ↓
          </a>
        </div>
        <div className={styles.progress}>
          <span>
            {round.retry
              ? "Missed-question practice"
              : isIncident
                ? "Incident simulation"
                : "Quick practice"}
          </span>
          <span>
            {round.finished
              ? "Complete"
              : `Question ${round.step + 1} of ${total}`}
          </span>
          <progress
            aria-label="Questions answered"
            value={round.answers.length}
            max={total}
          />
        </div>
        <h2 ref={quizHeading} tabIndex={-1}>
          {round.finished
            ? `Score: ${total - missed.length} of ${total}`
            : question.prompt}
        </h2>

        {round.finished ? (
          <div className={styles.results}>
            {missed.length === 0 && (
              <p>You answered every question correctly.</p>
            )}
            <div className={styles.actions}>
              {missed.length > 0 && (
                <button
                  type="button"
                  className={styles.primary}
                  onClick={() => restart(missed)}
                >
                  Retry missed questions ({missed.length})
                </button>
              )}
              <button
                type="button"
                className={styles.secondary}
                onClick={() => restart()}
              >
                Replay full game
              </button>
            </div>
            <h3>Answer review</h3>
            <ol className={styles.review}>
              {round.order.map((index, step) => {
                const item = mission.questions[index];
                const answer = round.answers[step];
                const correct = answer === item.correct;
                return (
                  <li key={index}>
                    <details open={!correct}>
                      <summary>
                        {correct ? "Correct" : "Missed"} · {item.prompt}
                      </summary>
                      <p>Your answer: {item.answers[answer]}</p>
                      {!correct && (
                        <p>Correct answer: {item.answers[item.correct]}</p>
                      )}
                      <p>{item.why}</p>
                    </details>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : (
          <>
            {mission.incident && (
              <details className={styles.brief} open>
                <summary>Incident brief</summary>
                <p>
                  {mission.incident} You’ll review the decisions at the end.
                </p>
              </details>
            )}
            <form onSubmit={submitAnswer}>
              <fieldset
                className={styles.answers}
                disabled={submitted}
                aria-label="Answer choices"
              >
                {question.answers.map((answer, index) => (
                  <label
                    key={answer}
                    className={styles.option}
                    data-selected={selection === index}
                  >
                    <input
                      type="radio"
                      name="academy-answer"
                      checked={selection === index}
                      onChange={() => setRound({ ...round, selection: index })}
                    />
                    <span className={styles.letter} aria-hidden="true">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{answer}</span>
                  </label>
                ))}
              </fieldset>
              {submitted ? (
                <>
                  <div
                    className={styles.feedback}
                    data-correct={selection === question.correct}
                    role="status"
                  >
                    <strong>
                      {selection === question.correct
                        ? "Correct"
                        : `Correct answer: ${question.answers[question.correct]}`}
                    </strong>
                    <p>{question.why}</p>
                    <span>{question.source}</span>
                  </div>
                  <button
                    ref={advanceButton}
                    className={styles.primary}
                    type="button"
                    onClick={() => advance(round.answers)}
                  >
                    {round.step + 1 === total ? "See results" : "Next question"}
                  </button>
                </>
              ) : (
                <button
                  className={styles.primary}
                  type="submit"
                  disabled={selection === null}
                >
                  {isIncident && round.step + 1 === total
                    ? "Finish incident"
                    : isIncident
                      ? "Submit decision"
                      : "Check answer"}
                </button>
              )}
            </form>
          </>
        )}
      </div>

      <section
        id="academy-games"
        className={styles.catalog}
        aria-labelledby="academy-games-heading"
      >
        <h2 ref={catalogHeading} id="academy-games-heading" tabIndex={-1}>
          Choose a game
        </h2>
        <div className={styles.games}>
          {missions.map((item) => {
            const best = bests[item.id];
            const prior = previousBests[item.id];
            const legacyCount = legacyQuestionCounts[item.id];
            const played = rounds[item.id];
            const href = `#quiz-${item.id}`;
            return (
              <a
                key={item.id}
                href={href}
                onClick={() => {
                  if (window.location.hash === href) focusQuiz();
                }}
                aria-current={item.id === mission.id ? "location" : undefined}
                className={styles.game}
              >
                <span className={styles.gameMode}>
                  {item.track} ·{" "}
                  {item.incident ? "Incident simulation" : "Quick practice"}
                </span>
                <strong>
                  {item.incident ? item.title : `${item.role} — ${item.title}`}
                </strong>
                <span className={styles.description}>{item.description}</span>
                <span className={styles.gameStatus}>
                  {best === undefined
                    ? `${item.questions.length} questions`
                    : `Best score: ${best} / ${item.questions.length}`}
                  {best === undefined && validScore(prior, legacyCount) && (
                    <small>
                      Original quiz best: {prior} / {legacyCount}
                    </small>
                  )}
                </span>
                <span className={styles.gameAction}>
                  {played?.finished
                    ? "View results"
                    : played?.answers.length || played?.selection != null
                      ? "Continue game"
                      : "Start game"}{" "}
                  ↑
                </span>
              </a>
            );
          })}
        </div>
        <p className={styles.storageNote}>
          Best scores are saved in this browser.
        </p>
      </section>
    </section>
  );
}
