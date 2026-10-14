import { CourseModule, Topic } from '../types/course';
import { module01Setup } from './modules/module01_setup';
import { module02Fundamentals } from './modules/module02_fundamentals';
import { module03ControlFlow } from './modules/module03_controlFlow';
import { module04Functions } from './modules/module04_functions';
import { module05ArraysStrings } from './modules/module05_arraysStrings';
import { module06Pointers } from './modules/module06_pointers';
import { module07Memory } from './modules/module07_memory';
import { module08Structures } from './modules/module08_structures';
import { module09Files } from './modules/module09_files';
import { module10DataStructures } from './modules/module10_dataStructures';
import { module11Systems } from './modules/module11_systems';
import { module12Cybersecurity } from './modules/module12_cybersecurity';
import { module13WebBackend } from './modules/module13_webBackend';

export const allCourseModules: CourseModule[] = [
  module01Setup,
  module02Fundamentals,
  module03ControlFlow,
  module04Functions,
  module05ArraysStrings,
  module06Pointers,
  module07Memory,
  module08Structures,
  module09Files,
  module10DataStructures,
  module11Systems,
  module12Cybersecurity,
  module13WebBackend,
];

// Flat list of all topics for navigation and search
export const allTopics: Topic[] = allCourseModules.flatMap((m) => m.topics);

export const courseStats = {
  totalModules: allCourseModules.length,
  totalTopics: allTopics.length,
  totalQuestions: allTopics.reduce((acc, t) => acc + t.questions.length, 0),
  totalEstimatedHours: (allTopics.reduce((acc, t) => acc + t.estimatedMinutes, 0) / 60).toFixed(1),
};

export function findTopicById(id: string): Topic | undefined {
  return allTopics.find((t) => t.id === id);
}

export function getAdjacentTopics(currentId: string): { prev?: Topic; next?: Topic } {
  const index = allTopics.findIndex((t) => t.id === currentId);
  if (index === -1) return {};
  return {
    prev: index > 0 ? allTopics[index - 1] : undefined,
    next: index < allTopics.length - 1 ? allTopics[index + 1] : undefined,
  };
}
