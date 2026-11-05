import React, { useState } from 'react';
import { questions, type Question } from '../questions';
import { useConscience } from './ConscienceProvider';
import { BONUS_QUIZ_LENGTH, selectQuizQuestions } from './quiz';

type QuizResult =
  | { status: 'failed'; question: Question }
  | { status: 'complete' }
  | null;

export function BibleQuizOverlay({ onComplete }: { onComplete: () => void }) {
  const { addPlayerPoints } = useConscience();
  const [quizQuestions] = useState(() => selectQuizQuestions(questions, BONUS_QUIZ_LENGTH));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [result, setResult] = useState<QuizResult>(null);

  const currentQ = quizQuestions[currentIndex];

  const handleAnswer = (idx: number) => {
    if (idx === currentQ.answerIndex) {
      addPlayerPoints(100);
      setPointsEarned(prev => prev + 100);
      if (currentIndex === quizQuestions.length - 1) {
        setResult({ status: 'complete' });
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    } else {
      setResult({ status: 'failed', question: currentQ });
    }
  };

  if (result?.status === 'failed') {
    return (
      <div className="matrix-quiz-overlay" role="dialog" aria-modal="true" aria-labelledby="matrix-quiz-result-title">
        <div className="matrix-quiz-card matrix-quiz-result">
          <span className="matrix-quiz-kicker">Bonus challenge complete</span>
          <h2 id="matrix-quiz-result-title">Keep learning</h2>
          <p>You earned {pointsEarned} bonus points.</p>
          <div className="matrix-quiz-feedback">
            <strong>{result.question.choices[result.question.answerIndex]}</strong>
            <span>{result.question.reference}</span>
            <p>{result.question.explanation}</p>
          </div>
          <button autoFocus className="matrix-quiz-primary" type="button" onClick={onComplete}>Continue to sector map</button>
        </div>
      </div>
    );
  }

  if (result?.status === 'complete') {
    return (
      <div className="matrix-quiz-overlay" role="dialog" aria-modal="true" aria-labelledby="matrix-quiz-success-title">
        <div className="matrix-quiz-card matrix-quiz-result">
          <span className="matrix-quiz-kicker">Perfect signal</span>
          <h2 id="matrix-quiz-success-title">Bonus challenge cleared</h2>
          <p>You answered all {quizQuestions.length} questions correctly and earned {pointsEarned} bonus points.</p>
          <button autoFocus className="matrix-quiz-primary" type="button" onClick={onComplete}>Continue to sector map</button>
        </div>
      </div>
    );
  }

  return (
    <div className="matrix-quiz-overlay" role="dialog" aria-modal="true" aria-labelledby="matrix-quiz-title" aria-describedby="matrix-quiz-description">
      <div className="matrix-quiz-card">
        <div className="matrix-quiz-heading">
          <div>
            <span className="matrix-quiz-kicker">Knowledge transmission</span>
            <h2 id="matrix-quiz-title">Bonus Bible quiz</h2>
          </div>
          <span className="matrix-quiz-progress" aria-live="polite">{currentIndex + 1} / {quizQuestions.length}</span>
        </div>
        <p id="matrix-quiz-description">Each correct answer earns 100 bonus points. A wrong answer ends the challenge, but never blocks campaign progress.</p>
        <h3>{currentQ.text}</h3>
        <div className="matrix-quiz-choices">
          {currentQ.choices.map((choice, idx) => (
            <button key={choice} type="button" onClick={() => handleAnswer(idx)}>
              {choice}
            </button>
          ))}
        </div>
        <div className="matrix-quiz-footer">
          <span aria-live="polite">Bonus points: {pointsEarned}</span>
          <button className="matrix-quiz-skip" type="button" onClick={onComplete}>Skip bonus · continue campaign</button>
        </div>
      </div>
    </div>
  );
}
