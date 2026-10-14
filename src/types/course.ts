export interface CodeLineExplanation {
  lineOrToken: string;
  explanation: string;
}

export interface PitfallMistake {
  mistake: string;
  consequence: string;
  solution: string;
  badSnippet?: string;
  goodSnippet?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Topic {
  id: string;
  moduleId: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  tags: string[];

  // MANDATORY 11-STEP PEDAGOGICAL STRUCTURE
  definition: string;
  simpleExplanation: string;
  whyItExists: string;
  howItWorks: string[];
  syntax: string;
  code: string;
  codeExplanation: CodeLineExplanation[];
  output: string;
  mistakes: PitfallMistake[];
  summary: string[];
  questions: QuizQuestion[];

  // Optional interactive visualizer hook
  interactiveMode?: 'compilation' | 'pointers' | 'memory' | 'struct_layout' | 'socket_flow';
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  description: string;
  topics: Topic[];
}
