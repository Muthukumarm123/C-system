import React, { useState } from 'react';
import { CourseModule, Topic } from '../types/course';
import { Search, ChevronDown, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

interface SidebarProps {
  modules: CourseModule[];
  currentTopicId: string;
  onSelectTopic: (topicId: string) => void;
  completedTopicIds: Set<string>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  modules,
  currentTopicId,
  onSelectTopic,
  completedTopicIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    // Default open all
    const initial: Record<string, boolean> = {};
    modules.forEach((m) => {
      initial[m.id] = true;
    });
    return initial;
  });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredModules = modules.map((m) => {
    const matchingTopics = m.topics.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return {
      ...m,
      topics: matchingTopics,
    };
  }).filter((m) => m.topics.length > 0);

  return (
    <aside className="w-80 shrink-0 border-r border-slate-800/80 bg-[#090d16] flex flex-col h-[calc(100vh-61px)] sticky top-[61px] overflow-hidden">
      {/* Search Filter Header */}
      <div className="p-3.5 border-b border-slate-800/80 bg-slate-950/40">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pointers, malloc, sockets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Module & Topic Tree */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {filteredModules.map((module) => {
          const isExpanded = expandedModules[module.id] ?? true;
          const completedInModule = module.topics.filter((t) => completedTopicIds.has(t.id)).length;
          const isAllCompleted = completedInModule === module.topics.length && module.topics.length > 0;

          return (
            <div key={module.id} className="rounded-lg border border-slate-900/60 overflow-hidden">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-2.5 text-left text-xs font-semibold text-slate-200 bg-slate-900/40 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-cyan-400 font-bold text-[11px] shrink-0">
                    {module.number < 10 ? `0${module.number}` : module.number}.
                  </span>
                  <span className="truncate">{module.title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-slate-500">
                    {completedInModule}/{module.topics.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="bg-slate-950/40 p-1 space-y-0.5 border-t border-slate-900/60">
                  {module.topics.map((t) => {
                    const isActive = t.id === currentTopicId;
                    const isDone = completedTopicIds.has(t.id);

                    return (
                      <button
                        key={t.id}
                        onClick={() => onSelectTopic(t.id)}
                        className={`w-full text-left p-2 rounded-md text-xs transition-all flex items-start gap-2.5 ${
                          isActive
                            ? 'bg-cyan-950/70 border border-cyan-800/80 text-cyan-200 font-medium'
                            : 'hover:bg-slate-800/40 text-slate-300'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-slate-600" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate leading-snug">{t.title}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {t.estimatedMinutes} min read
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
