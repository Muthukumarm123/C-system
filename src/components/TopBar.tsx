import React from 'react';
import { Terminal } from 'lucide-react';

interface TopBarProps {
  currentView: 'curriculum' | 'compilation' | 'memory' | 'quiz_bank' | 'glossary';
  onSelectView: (view: 'curriculum' | 'compilation' | 'memory' | 'quiz_bank' | 'glossary') => void;
  completedCount: number;
  totalTopics: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  onSelectView,
  completedCount,
  totalTopics,
}) => {
  const percent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between gap-8">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
          C
        </div>
        <button
          onClick={() => onSelectView('curriculum')}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-cyan-300 transition-colors"
        >
          Mastering C
        </button>
      </div>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <button
          onClick={() => onSelectView('curriculum')}
          className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
            currentView === 'curriculum' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Curriculum
        </button>
        <button
          onClick={() => onSelectView('compilation')}
          className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
            currentView === 'compilation' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Compilation Lab
        </button>
        <button
          onClick={() => onSelectView('memory')}
          className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
            currentView === 'memory' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Memory Inspector
        </button>
        <button
          onClick={() => onSelectView('quiz_bank')}
          className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
            currentView === 'quiz_bank' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Quiz Bank
        </button>
        <button
          onClick={() => onSelectView('glossary')}
          className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
            currentView === 'glossary' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Glossary
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onSelectView('curriculum')}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-950/40"
        >
          Progress ({completedCount}/{totalTopics} · {percent}%)
        </button>
      </div>
    </header>
  );
};
