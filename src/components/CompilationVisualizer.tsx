import React, { useState } from 'react';
import { ArrowRight, Terminal, FileCode, Cpu, Layers, Link as LinkIcon, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

interface StageInfo {
  step: number;
  name: string;
  tool: string;
  inputFile: string;
  outputFile: string;
  flag: string;
  summary: string;
  mechanism: string[];
  sampleContent: string;
}

const STAGES: StageInfo[] = [
  {
    step: 1,
    name: 'Source Code',
    tool: 'Text Editor / IDE',
    inputFile: 'developer typing',
    outputFile: 'main.c & headers.h',
    flag: 'None',
    summary: 'Human-readable UTF-8 or ASCII plain text containing C programming instructions.',
    mechanism: [
      'Written by the software engineer.',
      'Contains structured statements, loops, type annotations, and preprocessor directives (#include, #define).',
      'The CPU cannot execute this text directly; silicon only understands electrical opcodes (0s and 1s).'
    ],
    sampleContent: `#include <stdio.h>
#define MULTIPLIER 8

int main(void) {
    int count = 5;
    int total = count * MULTIPLIER;
    printf("Total: %d\\n", total);
    return 0;
}`
  },
  {
    step: 2,
    name: 'Preprocessing',
    tool: 'C Preprocessor (cpp)',
    inputFile: 'main.c',
    outputFile: 'main.i (Preprocessed C)',
    flag: 'gcc -E main.c -o main.i',
    summary: 'Text-level manipulation: strips all comments, copies header files directly, and expands macros.',
    mechanism: [
      'Strips all code comments (e.g. /* ... */ and // ... are removed completely).',
      'Finds #include <stdio.h> and pastes the entire contents of stdio.h (thousands of lines of declarations) directly into the file.',
      'Performs textual substitution for #define: every instance of MULTIPLIER is replaced with 8.',
      'Resolves conditional compilation guards (#ifdef, #ifndef, #endif).'
    ],
    sampleContent: `/* [Contents of stdio.h pasted here: ~800 lines of declarations] */
extern int printf (const char *__restrict __format, ...);

int main(void) {
    int count = 5;
    int total = count * 8; /* MULTIPLIER was substituted with 8 */
    printf("Total: %d\\n", total);
    return 0;
}`
  },
  {
    step: 3,
    name: 'Compilation Proper',
    tool: 'C Compiler (cc1)',
    inputFile: 'main.i',
    outputFile: 'main.s (Assembly Code)',
    flag: 'gcc -S main.i -o main.s',
    summary: 'Syntax analysis, type verification, optimization algorithms, and translation into CPU assembly language.',
    mechanism: [
      'Lexical analysis and parsing into an Abstract Syntax Tree (AST).',
      'Type checking (ensures types match, flags warnings or errors).',
      'Compiler optimization passes (-O1, -O2, -O3: dead code elimination, loop unrolling, register allocation).',
      'Emits assembly instructions tailored for the target hardware architecture (x86-64, ARM64, or RISC-V).'
    ],
    sampleContent: `.file   "main.c"
.text
.globl  main
.type   main, @function
main:
    pushq   %rbp
    movq    %rsp, %rbp
    subq    $16, %rsp
    movl    $5, -8(%rbp)        # count = 5
    movl    -8(%rbp), %eax
    shll    $3, %eax            # multiply by 8 via bitshift
    movl    %eax, -4(%rbp)      # total = 40
    movl    -4(%rbp), %esi
    leaq    .LC0(%rip), %rdi    # string "Total: %d\\n"
    call    printf@PLT
    movl    $0, %eax            # return 0
    leave
    ret`
  },
  {
    step: 4,
    name: 'Assembly',
    tool: 'Assembler (as)',
    inputFile: 'main.s',
    outputFile: 'main.o (Relocatable Object File)',
    flag: 'gcc -c main.s -o main.o',
    summary: 'Translates textual assembly mnemonics into raw binary machine code instructions (opcodes).',
    mechanism: [
      'Converts assembly instructions (mov, add, call) into hexadecimal CPU machine codes.',
      'Creates a binary ELF (Executable and Linkable Format) file on Linux, Mach-O on macOS, or COFF/PE on Windows.',
      'Builds a Symbol Table listing functions defined (main) and external functions required (printf).',
      'Leaves placeholder address holes for external functions like printf because their exact memory location is not yet known.'
    ],
    sampleContent: `ELF Header: Magic: 7f 45 4c 46 02 01 01 00 ... (64-bit LSB relocatable)
Section Headers: .text, .data, .rodata, .symtab, .rel.text

Disassembly of section .text:
0000000000000000 <main>:
   0:   55                      push   %rbp
   1:   48 89 e5                mov    %rsp,%rbp
   4:   48 83 ec 10             sub    $0x10,%rsp
   8:   c7 45 f8 05 00 00 00    movl   $0x5,-0x8(%rbp)
   f:   8b 45 f8                mov    -0x8(%rbp),%eax
  12:   c1 e0 03                shl    $0x3,%eax
  15:   89 45 fc                mov    %eax,-0x4(%rbp)
  18:   8b 75 fc                mov    -0x4(%rbp),%esi
  1b:   48 8d 3d 00 00 00 00    lea    0x0(%rip),%rdi  # Relocation entry for printf`
  },
  {
    step: 5,
    name: 'Linking',
    tool: 'Linker (ld)',
    inputFile: 'main.o + libc.so / crt1.o',
    outputFile: 'a.out (Executable Binary)',
    flag: 'gcc main.o -o my_app',
    summary: 'Combines multiple object files, resolves external function addresses (like printf), and generates the final binary.',
    mechanism: [
      'Symbol Resolution: Matches the undefined reference to "printf" in main.o with the real implementation in the C Standard Library (libc.so / msvcrt.dll).',
      'Relocation: Fills in the blank placeholder addresses in the machine code with real relative or absolute virtual memory addresses.',
      'Stitches in C Runtime Startup Code (crt1.o) which initializes the stack, parses command line argc/argv, and invokes your main() function.',
      'Sets executable file permissions and entry point address.'
    ],
    sampleContent: `Final Executable Binary (ELF 64-bit LSB pie executable, x86-64):
Virtual Entry Point: 0x0000000000001060 (_start)
Linked Libraries:
    libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f3189a00000)
Symbols:
    0000000000001149 <main> (RESOLVED)
    0000000000001030 <printf@plt> (RESOLVED to libc)`
  },
  {
    step: 6,
    name: 'Operating System Execution',
    tool: 'OS Kernel Loader (execve)',
    inputFile: './my_app',
    outputFile: 'Running Process in RAM',
    flag: './my_app',
    summary: 'The OS loads the binary into physical RAM, initializes the call stack and heap, and jumps the CPU to main().',
    mechanism: [
      'User types "./my_app" in shell.',
      'OS issues fork() and execve() system calls.',
      'Kernel allocates virtual address space: Text segment (read/exec), Data segment, Heap, and Stack.',
      'Dynamic linker (ld.so) binds shared libraries into process memory.',
      'CPU Instruction Pointer (RIP) is set to the binary entry point.',
      'Program runs, prints "Total: 40", returns 0, and the kernel reclaims process memory.'
    ],
    sampleContent: `Terminal stdout:
$ ./my_app
Total: 40

Process exited with status code: 0 (SUCCESS)`
  }
];

export const CompilationVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const currentStage = STAGES[activeStep - 1];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Interactive Compilation Pipeline Journey
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Step through the six physical stages from human C text to silicon machine execution.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep((prev) => (prev > 1 ? prev - 1 : 6))}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Previous Stage
          </button>
          <button
            onClick={() => setActiveStep((prev) => (prev < 6 ? prev + 1 : 1))}
            className="px-3 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5"
          >
            Next Stage
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stage Stepper Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-b border-slate-800 bg-slate-950/30">
        {STAGES.map((s) => {
          const isActive = s.step === activeStep;
          const isPassed = s.step < activeStep;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-3 text-left border-r border-slate-800/80 transition-all ${
                isActive
                  ? 'bg-cyan-950/40 border-b-2 border-b-cyan-400'
                  : 'hover:bg-slate-800/40 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-mono ${isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                  0{s.step}
                </span>
                {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </div>
              <div className={`text-xs font-semibold mt-1 truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {s.name}
              </div>
              <div className="text-[10px] text-slate-500 truncate font-mono mt-0.5">
                {s.outputFile.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Body */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Explanations & Mechanism */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-mono text-cyan-400">
              Stage 0{currentStage.step} of 06
            </span>
            <h3 className="text-xl font-bold text-slate-100">{currentStage.name}</h3>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">{currentStage.summary}</p>
          </div>

          {/* Quick Technical Specs Box */}
          <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-slate-500">Underlying Tool:</span>
              <span className="text-cyan-300 font-medium">{currentStage.tool}</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-slate-500">Input:</span>
              <span className="text-slate-200">{currentStage.inputFile}</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-slate-500">Output:</span>
              <span className="text-amber-300">{currentStage.outputFile}</span>
            </div>
            <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-slate-800/80">
              <span className="text-slate-500">GCC Inspection Flag:</span>
              <span className="text-emerald-400">{currentStage.flag}</span>
            </div>
          </div>

          {/* What happens under the hood */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              What Happens Under The Hood
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {currentStage.mechanism.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column: Generated Artifact / Code Viewer */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Artifact Inspector: {currentStage.outputFile}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              {currentStage.step === 1 ? 'C Source' : currentStage.step === 3 ? 'x86-64 Assembly' : currentStage.step === 4 ? 'ELF Object Code' : 'Terminal / Binary'}
            </span>
          </div>

          <pre className="p-4 text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto flex-1 bg-slate-950/90 whitespace-pre">
            <code>{currentStage.sampleContent}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
