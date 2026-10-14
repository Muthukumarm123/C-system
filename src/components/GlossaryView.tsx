import React, { useState } from 'react';
import { Search, Book, Cpu, Layers } from 'lucide-react';

interface GlossaryEntry {
  term: string;
  category: 'Memory' | 'Compilation' | 'Syntax' | 'Security' | 'Systems';
  definition: string;
  hardwareReality: string;
}

const GLOSSARY_TERMS: GlossaryEntry[] = [
  {
    term: 'Pointer',
    category: 'Memory',
    definition: 'A variable that stores the physical or virtual numerical memory address of another variable or data structure, rather than direct business data.',
    hardwareReality: 'On 64-bit CPUs, every pointer is an 8-byte (64-bit) integer stored in a register or RAM cell that the Memory Management Unit (MMU) uses to locate physical DRAM pages.'
  },
  {
    term: 'Dereference (*)',
    category: 'Memory',
    definition: 'The operation of navigating to the memory address stored inside a pointer and reading or mutating the data living at that location.',
    hardwareReality: 'Translates to indirect addressing CPU instructions (such as "mov eax, [rdi]"), fetching bytes across the CPU memory bus into a processor register.'
  },
  {
    term: 'Address-Of (&)',
    category: 'Memory',
    definition: 'An operator that returns the numerical memory address where a variable resides in RAM.',
    hardwareReality: 'Translates to the "lea" (Load Effective Address) instruction, computing the stack or data segment offset without reading the value itself.'
  },
  {
    term: 'Null Pointer (NULL)',
    category: 'Memory',
    definition: 'A pointer intentionally assigned to address 0 ((void*)0) to denote that it points to no valid memory location.',
    hardwareReality: 'The operating system marks virtual page 0 as forbidden (unmapped). Any CPU attempt to read or write address 0 triggers an instant hardware page fault (SIGSEGV).'
  },
  {
    term: 'Dangling Pointer',
    category: 'Memory',
    definition: 'A pointer that retains the memory address of an object that has already been deallocated by free() or whose stack frame has unwound.',
    hardwareReality: 'The pointer holds a stale address. If that memory page is reallocated to another process or variable, writing through the dangling pointer corrupts external data.'
  },
  {
    term: 'The Call Stack',
    category: 'Memory',
    definition: 'A fast, hardware-supported Last-In First-Out (LIFO) memory region allocated automatically by the OS to manage function call frames, parameters, return addresses, and local variables.',
    hardwareReality: 'Tracked by the CPU Stack Pointer register (RSP). Allocating a stack variable requires merely subtracting bytes from RSP (a single clock cycle).'
  },
  {
    term: 'The Heap',
    category: 'Memory',
    definition: 'A large, unstructured pool of memory managed by dynamic runtime allocators (malloc/calloc/realloc/free) where data lifetimes are manually controlled by the programmer.',
    hardwareReality: 'Managed via the OS kernel "brk" and "mmap" system calls. Unlike stack memory, heap memory persists until free() is explicitly invoked or the process exits.'
  },
  {
    term: 'Memory Leak',
    category: 'Memory',
    definition: 'The failure to deallocate dynamically allocated heap memory after all pointers to it have been lost, permanently consuming system RAM.',
    hardwareReality: 'Physical RAM pages remain pinned to the process. If leaks repeat inside a loop, total system RAM is exhausted until the OS Out-of-Memory (OOM) killer halts the process.'
  },
  {
    term: 'Preprocessor',
    category: 'Compilation',
    definition: 'The first stage of compilation that performs purely textual transformations (expanding #include files, substituting #define macros, stripping comments) before code is analyzed.',
    hardwareReality: 'Operates as a high-speed text stream processor; has no knowledge of C syntax, types, or CPU registers.'
  },
  {
    term: 'Linker (ld)',
    category: 'Compilation',
    definition: 'The program that combines multiple object files (.o) and library archives (.a, .so) into a single unified executable binary, resolving undefined function addresses.',
    hardwareReality: 'Fills in placeholder memory jump offsets in machine code and stitches in the C Runtime initialization code (crt1.o).'
  },
  {
    term: 'Buffer Overflow',
    category: 'Security',
    definition: 'Writing more bytes into an allocated memory array than its capacity allows, overflowing into adjacent memory addresses.',
    hardwareReality: 'Can overwrite adjacent stack variables and the Saved Return Address (RIP register), allowing attackers to redirect CPU execution to shellcode.'
  },
  {
    term: 'Stack Canary',
    category: 'Security',
    definition: 'A secret random guard value placed on the stack by the compiler between local variables and the return address to detect buffer overflow attacks.',
    hardwareReality: 'Before returning, the function compares the canary with a thread-local master value. If different, the CPU immediately aborts execution.'
  },
  {
    term: 'Address Space Layout Randomization (ASLR)',
    category: 'Security',
    definition: 'An operating system security mechanism that randomizes the memory addresses of the stack, heap, and loaded libraries on every program execution.',
    hardwareReality: 'Prevents exploits from using hardcoded memory addresses to jump into injected code or standard library functions (ROP attacks).'
  },
  {
    term: 'System Call (Syscall)',
    category: 'Systems',
    definition: 'The programmatic request by which unprivileged user code in Ring 3 asks the OS Kernel in Ring 0 to perform hardware I/O (files, network, memory).',
    hardwareReality: 'Triggers a CPU context switch via the "syscall" assembly instruction, transferring execution to the kernel interrupt dispatch table.'
  },
  {
    term: 'Berkeley Sockets',
    category: 'Systems',
    definition: 'The standard POSIX API abstraction that exposes internet TCP/UDP network connections as standard file descriptors.',
    hardwareReality: 'Managed by the OS TCP/IP network stack inside the kernel, transferring bytes between network interface cards (NICs) and user application buffers.'
  }
];

export const GlossaryView: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Memory', 'Compilation', 'Security', 'Systems'];

  const filtered = GLOSSARY_TERMS.filter((entry) => {
    const matchesCat = selectedCategory === 'All' || entry.category === selectedCategory;
    const matchesQuery =
      entry.term.toLowerCase().includes(filterQuery.toLowerCase()) ||
      entry.definition.toLowerCase().includes(filterQuery.toLowerCase()) ||
      entry.hardwareReality.toLowerCase().includes(filterQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div>
          <span className="text-xs uppercase font-mono text-cyan-400 font-bold">
            Zero-Assumptions Technical Reference
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">C Systems Architecture Glossary</h1>
          <p className="text-xs text-slate-400 mt-1">
            Every foundational concept defined in precision English with its underlying physical CPU & RAM hardware reality.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search any term (e.g. pointer, heap, syscall)..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Terms Grid */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item.term} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-mono">{item.term}</h3>
              <span className="text-[11px] font-mono text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {item.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {item.definition}
            </p>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono block">
                Hardware & Operating System Reality
              </span>
              <p className="text-slate-400 leading-relaxed font-mono text-[11px]">
                {item.hardwareReality}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
