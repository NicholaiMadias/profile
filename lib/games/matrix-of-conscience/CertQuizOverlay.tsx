import React, { useState } from 'react';
import { certQuestions, selectCertQuestions, type CertQuestion, type CertCategory } from '../certQuestions';
import { useConscience } from './ConscienceProvider';

type CertQuizResult =
  | { status: 'failed'; question: CertQuestion }
  | { status: 'complete' }
  | null;

export function CertQuizOverlay({
  onComplete,
  initialCategory = 'all'
}: {
  onComplete: () => void;
  initialCategory?: CertCategory;
}) {
  const { addPlayerPoints } = useConscience();
  const [category, setCategory] = useState<CertCategory>(initialCategory);
  const [quizQuestions, setQuizQuestions] = useState<CertQuestion[]>(() =>
    selectCertQuestions(initialCategory, 5)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [result, setResult] = useState<CertQuizResult>(null);

  const currentQ = quizQuestions[currentIndex];

  const handleCategorySwitch = (cat: CertCategory) => {
    setCategory(cat);
    const newQuestions = selectCertQuestions(cat, 5);
    setQuizQuestions(newQuestions);
    setCurrentIndex(0);
    setPointsEarned(0);
    setResult(null);
  };

  const handleAnswer = (idx: number) => {
    if (!currentQ) return;
    if (idx === currentQ.answerIndex) {
      addPlayerPoints(150);
      setPointsEarned(prev => prev + 150);
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
      <div className="matrix-quiz-overlay" role="dialog" aria-modal="true" aria-labelledby="cert-quiz-result-title">
        <div className="matrix-quiz-card matrix-quiz-result">
          <span className="matrix-quiz-kicker" style={{ color: '#ff7b72' }}>Certification Diagnostic Ended</span>
          <h2 id="cert-quiz-result-title">Review & Strengthen Your Knowledge</h2>
          <p>You earned {pointsEarned} knowledge points for your Conscience Matrix.</p>
          <div className="matrix-quiz-feedback">
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#79e8fa' }}>
              {result.question.categoryLabel}
            </span>
            <strong style={{ display: 'block', margin: '0.5rem 0' }}>
              Correct Answer: {result.question.choices[result.question.answerIndex]}
            </strong>
            <span style={{ display: 'block', color: '#90a4ae', fontSize: '0.85rem' }}>{result.question.reference}</span>
            <p style={{ marginTop: '0.5rem', color: '#d1d5db' }}>{result.question.explanation}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button
              className="matrix-quiz-primary"
              type="button"
              onClick={() => handleCategorySwitch(category)}
              style={{ flex: 1, minWidth: '160px' }}
            >
              Retry {category.toUpperCase()} Diagnostic
            </button>
            <button
              className="matrix-quiz-skip"
              type="button"
              onClick={onComplete}
              style={{ flex: 1, minWidth: '160px' }}
            >
              Continue to Sector Map
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (result?.status === 'complete') {
    return (
      <div className="matrix-quiz-overlay" role="dialog" aria-modal="true" aria-labelledby="cert-quiz-success-title">
        <div className="matrix-quiz-card matrix-quiz-result">
          <span className="matrix-quiz-kicker" style={{ color: '#56d364' }}>Sector Cleared · High Honor</span>
          <h2 id="cert-quiz-success-title">Certification Mastery Confirmed</h2>
          <p>
            You answered all {quizQuestions.length} certification questions correctly and earned {pointsEarned} mastery points!
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button
              className="matrix-quiz-primary"
              type="button"
              onClick={() => handleCategorySwitch('all')}
              style={{ flex: 1, minWidth: '160px' }}
            >
              Challenge Another Domain
            </button>
            <button
              className="matrix-quiz-skip"
              type="button"
              onClick={onComplete}
              style={{ flex: 1, minWidth: '160px' }}
            >
              Continue to Sector Map
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="matrix-quiz-overlay" role="dialog" aria-modal="true" aria-labelledby="cert-quiz-title" aria-describedby="cert-quiz-description">
      <div className="matrix-quiz-card">
        <div className="matrix-quiz-heading">
          <div>
            <span className="matrix-quiz-kicker">Cyber & Infrastructure Telemetry</span>
            <h2 id="cert-quiz-title">CompTIA Mastery Challenge</h2>
          </div>
          <span className="matrix-quiz-progress" aria-live="polite">
            {currentIndex + 1} / {quizQuestions.length}
          </span>
        </div>

        {/* Category selector tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Certs' },
            { id: 'a-plus', label: 'CompTIA A+' },
            { id: 'network-plus', label: 'Network+' },
            { id: 'security-plus', label: 'Security+' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleCategorySwitch(tab.id as CertCategory)}
              style={{
                background: category === tab.id ? 'rgba(0, 242, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                border: category === tab.id ? '1px solid #00f2ff' : '1px solid rgba(255, 255, 255, 0.1)',
                color: category === tab.id ? '#00f2ff' : '#94a3b8',
                borderRadius: '6px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p id="cert-quiz-description" style={{ margin: '0.5rem 0 1rem', fontSize: '0.85rem' }}>
          Active Domain: <strong style={{ color: '#00f2ff' }}>{currentQ?.categoryLabel}</strong>. Correct answers yield +150 Conscience Matrix energy.
        </p>

        <h3>{currentQ?.text}</h3>
        <div className="matrix-quiz-choices">
          {currentQ?.choices.map((choice, idx) => (
            <button key={choice} type="button" onClick={() => handleAnswer(idx)}>
              {choice}
            </button>
          ))}
        </div>

        <div className="matrix-quiz-footer" style={{ marginTop: '1.5rem' }}>
          <span aria-live="polite" style={{ fontFamily: 'monospace', color: '#38ef7d' }}>
            Earned: {pointsEarned} pts
          </span>
          <button className="matrix-quiz-skip" type="button" onClick={onComplete}>
            Skip Challenge · Continue Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
