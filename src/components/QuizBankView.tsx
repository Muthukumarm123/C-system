import React, { useState } from 'react';
import { allTopics } from '../data/courseData';
import { QuizQuestion } from '../types/course';
import { CheckCircle2, HelpCircle, RefreshCw, Trophy, Award } from 'lucide-react';

export const QuizBankView: React.FC = () => {
  const allQuestionsWithContext: { question: QuizQuestion; topicTitle: string; moduleNumber: number }[] = [];
  allTopics.forEach((t) => {
    t.questions.forEach((q) => {
      allQuestionsWithContext.push({
        question: q,
        topicTitle: t.title,
        moduleNumber: t.moduleNumber,
      });
    });
  });

  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});

  const handleSelect = (qId: string, optIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = allQuestionsWithContext.filter(
    (item) => userAnswers[item.question.id] === item.question.correctIndex
  ).length;

  const scorePercentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const resetQuiz = () => {
    setUserAnswers({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase font-mono text-cyan-400 font-bold">
            Curriculum Knowledge Bank
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">Complete C Mastery Quiz Bank</h1>
          <p className="text-xs text-slate-400 mt-1">
            {allQuestionsWithContext.length} comprehensive conceptual verification questions across all 13 course modules.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-2xl font-bold font-mono text-emerald-400">
              {correctCount} / {answeredCount}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Score: {scorePercentage}% ({answeredCount}/{allQuestionsWithContext.length} answered)
            </div>
          </div>
          <button
            onClick={resetQuiz}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
            title="Reset Quiz"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {allQuestionsWithContext.map((item, idx) => {
          const q = item.question;
          const hasAnswered = userAnswers[q.id] !== undefined;
          const chosen = userAnswers[q.id];
          const isCorrect = chosen === q.correctIndex;

          return (
            <div key={q.id} className="p-6 bg-slate-900/70 border border-slate-800 rounded-xl space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span className="font-mono text-cyan-400">
                  Question {idx + 1} of {allQuestionsWithContext.length} · Module 0{item.moduleNumber}
                </span>
                <span className="text-slate-500">{item.topicTitle}</span>
              </div>

              <div className="text-sm font-semibold text-white leading-relaxed">
                {q.question}
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = chosen === optIdx;
                  let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850';

                  if (hasAnswered) {
                    if (optIdx === q.correctIndex) {
                      style = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-medium';
                    } else if (isSelected) {
                      style = 'bg-rose-950/80 border-rose-600 text-rose-200 line-through';
                    } else {
                      style = 'bg-slate-950/50 border-slate-800/40 text-slate-600 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={hasAnswered}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 ${style}`}
                    >
                      <span className="font-mono font-bold text-xs uppercase px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 mt-0.5 shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {hasAnswered && (
                <div
                  className={`p-3.5 rounded-lg text-xs leading-relaxed space-y-1 ${
                    isCorrect
                      ? 'bg-emerald-950/40 border border-emerald-800/80 text-emerald-300'
                      : 'bg-rose-950/40 border border-rose-800/80 text-rose-300'
                  }`}
                >
                  <div className="font-bold font-mono">
                    {isCorrect ? '✓ Correct Answer!' : '✕ Incorrect Answer'}
                  </div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
