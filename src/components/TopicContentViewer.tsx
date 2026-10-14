import React, { useState } from 'react';
import { Topic } from '../types/course';
import {
  BookOpen,
  HelpCircle,
  Cpu,
  Layers,
  Code2,
  Terminal,
  AlertOctagon,
  CheckCircle2,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  Flame,
  Bookmark,
  Share2
} from 'lucide-react';
import { CompilationVisualizer } from './CompilationVisualizer';
import { MemoryVisualizer } from './MemoryVisualizer';

interface TopicContentViewerProps {
  topic: Topic;
  isCompleted: boolean;
  onToggleComplete: (topicId: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const TopicContentViewer: React.FC<TopicContentViewerProps> = ({
  topic,
  isCompleted,
  onToggleComplete,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const handleCopy = () => {
    navigator.clipboard.writeText(topic.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanation((prev) => ({ ...prev, [questionId]: true }));
  };

  return (
    <article className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Topic Header & Meta */}
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="font-mono text-cyan-400 font-semibold">
            Module 0{topic.moduleNumber}
          </span>
          <span aria-hidden="true">·</span>
          <span>Topic {topic.id}</span>
          <span aria-hidden="true">·</span>
          <span>{topic.estimatedMinutes} min read</span>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            {topic.tags.map((tag) => (
              <span key={tag} className="text-slate-500 font-mono text-[11px]">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {topic.title}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
          {topic.subtitle}
        </p>

        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleComplete(topic.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                isCompleted
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950/40'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Completed Topic' : 'Mark as Completed'}
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span>Standard: C17 / POSIX</span>
            <span aria-hidden="true">·</span>
            <span>Zero Prior Knowledge Assumed</span>
          </div>
        </div>
      </header>

      {/* Embedded Interactive Visualizer if applicable */}
      {topic.interactiveMode === 'compilation' && (
        <section aria-labelledby="interactive-visualizer-heading">
          <h2 id="interactive-visualizer-heading" className="sr-only">Interactive Compilation Lab</h2>
          <CompilationVisualizer />
        </section>
      )}

      {(topic.interactiveMode === 'pointers' || topic.interactiveMode === 'memory') && (
        <section aria-labelledby="interactive-memory-heading">
          <h2 id="interactive-memory-heading" className="sr-only">Interactive Memory Lab</h2>
          <MemoryVisualizer />
        </section>
      )}

      {/* 1. DEFINITION */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
          <BookOpen className="w-4 h-4" />
          <span>01. Strict Technical Definition</span>
        </div>
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
          <p className="text-base font-medium text-slate-100 leading-relaxed">
            {topic.definition}
          </p>
        </div>
      </section>

      {/* 2. SIMPLE EXPLANATION */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
          <HelpCircle className="w-4 h-4" />
          <span>02. Plain English Explanation (Zero Knowledge)</span>
        </div>
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
          {topic.simpleExplanation}
        </div>
      </section>

      {/* 3. WHY IT EXISTS */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
          <Cpu className="w-4 h-4" />
          <span>03. Why It Exists in Hardware & Systems Architecture</span>
        </div>
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
          {topic.whyItExists}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
          <Layers className="w-4 h-4" />
          <span>04. How It Works Step-by-Step</span>
        </div>
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <ol className="space-y-3 text-sm text-slate-300">
            {topic.howItWorks.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 mt-0.5 shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. SYNTAX */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 font-mono">
          <Code2 className="w-4 h-4" />
          <span>05. Formal Syntax & Grammar Specification</span>
        </div>
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
            C Language Syntax Rules
          </div>
          <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre">
            <code>{topic.syntax}</code>
          </pre>
        </div>
      </section>

      {/* 6. CODE */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
            <Code2 className="w-4 h-4" />
            <span>06. Complete Standard C Program</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedCode ? 'Copied to Clipboard' : 'Copy Code'}
          </button>
        </div>
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>main.c (ISO C17 Standard, Zero Comments Inside Code)</span>
            <span className="text-[11px] text-slate-500">gcc -Wall -Wextra -std=c17</span>
          </div>
          <pre className="p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed whitespace-pre">
            <code>{topic.code}</code>
          </pre>
        </div>
      </section>

      {/* 7. CODE EXPLANATION */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
          <BookOpen className="w-4 h-4" />
          <span>07. Line-by-Line Textual Code Walkthrough</span>
        </div>
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <p className="text-xs text-slate-400 mb-2">
            Every token, function, and keyword explained in plain language:
          </p>
          <div className="space-y-3">
            {topic.codeExplanation.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1">
                <code className="text-xs font-mono text-cyan-300 font-semibold block">
                  {item.lineOrToken}
                </code>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OUTPUT */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
          <Terminal className="w-4 h-4" />
          <span>08. Exact Terminal Output (stdout/stderr)</span>
        </div>
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>bash — 80x24</span>
            <span className="text-emerald-400 font-semibold">Exit Code 0</span>
          </div>
          <div className="p-4 font-mono text-xs text-slate-200 space-y-1 bg-slate-950">
            <div className="text-slate-500">$ gcc -Wall -Wextra -std=c17 main.c -o a.out && ./a.out</div>
            <pre className="text-emerald-300 pt-1 leading-relaxed whitespace-pre font-mono">
              {topic.output}
            </pre>
          </div>
        </div>
      </section>

      {/* 9. COMMON MISTAKES & TRAPS */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
          <AlertOctagon className="w-4 h-4" />
          <span>09. Common Traps, Undefined Behaviour & Real-World Bugs</span>
        </div>
        <div className="space-y-3">
          {topic.mistakes.map((m, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <div className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>Mistake {idx + 1}: {m.mistake}</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>
                  <strong className="text-amber-400 font-mono">Consequence: </strong>
                  {m.consequence}
                </div>
                <div>
                  <strong className="text-emerald-400 font-mono">Professional Solution: </strong>
                  {m.solution}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
          <CheckCircle2 className="w-4 h-4" />
          <span>10. Core Takeaway Summary</span>
        </div>
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <ul className="space-y-2 text-sm text-slate-200">
            {topic.summary.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11. QUESTIONS / COMPREHENSION QUIZ */}
      <section className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
          <HelpCircle className="w-4 h-4" />
          <span>11. Conceptual Check & Comprehension Questions</span>
        </div>
        <p className="text-xs text-slate-400">
          Test your mastery before advancing. Select an answer to reveal immediate hardware-grounded pedagogical feedback.
        </p>

        <div className="space-y-6 pt-2">
          {topic.questions.map((q, qIdx) => {
            const hasAnswered = selectedAnswers[q.id] !== undefined;
            const chosenIndex = selectedAnswers[q.id];
            const isCorrect = chosenIndex === q.correctIndex;

            return (
              <div key={q.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="text-sm font-semibold text-white">
                  Question {qIdx + 1}: {q.question}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosenIndex === optIdx;
                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800';

                    if (hasAnswered) {
                      if (optIdx === q.correctIndex) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-medium';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950/80 border-rose-600 text-rose-200 line-through';
                      } else {
                        btnStyle = 'bg-slate-950/50 border-slate-800/50 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnswered}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
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
                    className={`p-4 rounded-lg text-xs leading-relaxed space-y-1 ${
                      isCorrect
                        ? 'bg-emerald-950/40 border border-emerald-800 text-emerald-300'
                        : 'bg-rose-950/40 border border-rose-800 text-rose-300'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5 font-mono">
                      {isCorrect ? '✓ Correct Answer!' : '✕ Incorrect'}
                    </div>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Navigation Footer */}
      <footer className="pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
            hasPrev
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              : 'bg-slate-900 text-slate-600 cursor-not-allowed opacity-50'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous Lesson
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
            hasNext
              ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950/40'
              : 'bg-slate-900 text-slate-600 cursor-not-allowed opacity-50'
          }`}
        >
          Next Lesson
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>
    </article>
  );
};
