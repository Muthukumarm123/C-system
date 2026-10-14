/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { allCourseModules, allTopics, findTopicById, getAdjacentTopics } from './data/courseData';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { TopicContentViewer } from './components/TopicContentViewer';
import { CompilationVisualizer } from './components/CompilationVisualizer';
import { MemoryVisualizer } from './components/MemoryVisualizer';
import { QuizBankView } from './components/QuizBankView';
import { GlossaryView } from './components/GlossaryView';

export default function App() {
  const [currentView, setCurrentView] = useState<'curriculum' | 'compilation' | 'memory' | 'quiz_bank' | 'glossary'>('curriculum');
  const [currentTopicId, setCurrentTopicId] = useState<string>('what-is-c');
  const [completedTopicIds, setCompletedTopicIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('mastering_c_completed');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
    return new Set(['what-is-c']);
  });

  useEffect(() => {
    try {
      localStorage.setItem('mastering_c_completed', JSON.stringify(Array.from(completedTopicIds)));
    } catch {
      // ignore
    }
  }, [completedTopicIds]);

  const toggleComplete = (topicId: string) => {
    setCompletedTopicIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(topicId)) {
        updated.delete(topicId);
      } else {
        updated.add(topicId);
      }
      return updated;
    });
  };

  const handleSelectTopic = (topicId: string) => {
    setCurrentTopicId(topicId);
    setCurrentView('curriculum');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTopic = findTopicById(currentTopicId) || allTopics[0];
  const { prev, next } = getAdjacentTopics(currentTopicId);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      {/* 3-Zone Top Navigation Contract */}
      <TopBar
        currentView={currentView}
        onSelectView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        completedCount={completedTopicIds.size}
        totalTopics={allTopics.length}
      />

      {/* Main Container */}
      <div className="flex-1 flex w-full">
        {currentView === 'curriculum' && (
          <>
            {/* Sidebar with 13 Modules */}
            <div className="hidden md:block">
              <Sidebar
                modules={allCourseModules}
                currentTopicId={currentTopicId}
                onSelectTopic={handleSelectTopic}
                completedTopicIds={completedTopicIds}
              />
            </div>

            {/* Topic Content Body */}
            <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 overflow-y-auto">
              <TopicContentViewer
                topic={currentTopic}
                isCompleted={completedTopicIds.has(currentTopic.id)}
                onToggleComplete={toggleComplete}
                onPrev={prev ? () => handleSelectTopic(prev.id) : undefined}
                onNext={next ? () => handleSelectTopic(next.id) : undefined}
                hasPrev={Boolean(prev)}
                hasNext={Boolean(next)}
              />
            </main>
          </>
        )}

        {currentView === 'compilation' && (
          <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-8">
            <div className="mb-6 space-y-1">
              <h1 className="text-2xl font-bold text-white">Full Compilation Pipeline Lab</h1>
              <p className="text-xs text-slate-400">
                Detailed interactive simulation of the complete transformation from human source code to operating system executable binary.
              </p>
            </div>
            <CompilationVisualizer />
          </main>
        )}

        {currentView === 'memory' && (
          <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-8">
            <div className="mb-6 space-y-1">
              <h1 className="text-2xl font-bold text-white">Interactive Hardware Memory & Pointer Inspector</h1>
              <p className="text-xs text-slate-400">
                Live simulation of physical RAM bytes, hexadecimal memory addresses, pointer dereferencing, and pointer vulnerability traps.
              </p>
            </div>
            <MemoryVisualizer />
          </main>
        )}

        {currentView === 'quiz_bank' && (
          <main className="flex-1 px-4 sm:px-8 py-8">
            <QuizBankView />
          </main>
        )}

        {currentView === 'glossary' && (
          <main className="flex-1 px-4 sm:px-8 py-8">
            <GlossaryView />
          </main>
        )}
      </div>
    </div>
  );
}
