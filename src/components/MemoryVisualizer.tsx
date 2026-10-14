import React, { useState } from 'react';
import { Database, AlertTriangle, CheckCircle, RefreshCw, ArrowRight, Zap, ShieldAlert, Cpu } from 'lucide-react';

type MemoryScenario = 'normal' | 'dereferenced' | 'arithmetic' | 'dangling' | 'grounded' | 'overflow';

export const MemoryVisualizer: React.FC = () => {
  const [scenario, setScenario] = useState<MemoryScenario>('normal');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Banner */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            Interactive Hardware Memory & Pointer Inspector
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize physical RAM bytes, hexadecimal addresses, pointer dereferencing, and memory safety bugs.
          </p>
        </div>
        <button
          onClick={() => setScenario('normal')}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Memory State
        </button>
      </div>

      {/* Interactive Action Control Toolbar */}
      <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-wrap gap-2 text-xs">
        <button
          onClick={() => setScenario('normal')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            scenario === 'normal'
              ? 'bg-slate-700 text-white border border-slate-600'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
        >
          1. Baseline State (int count = 42, int *ptr = &count)
        </button>
        <button
          onClick={() => setScenario('dereferenced')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            scenario === 'dereferenced'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
        >
          2. Dereference (*ptr = 99)
        </button>
        <button
          onClick={() => setScenario('arithmetic')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            scenario === 'arithmetic'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
        >
          3. Pointer Arithmetic (ptr + 1)
        </button>
        <button
          onClick={() => setScenario('dangling')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            scenario === 'dangling'
              ? 'bg-amber-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
        >
          4. Dangling Pointer Bug
        </button>
        <button
          onClick={() => setScenario('grounded')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            scenario === 'grounded'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
        >
          5. Grounded to NULL (Safe)
        </button>
        <button
          onClick={() => setScenario('overflow')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            scenario === 'overflow'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
        >
          6. Buffer Overflow Corruption
        </button>
      </div>

      {/* Main Visual RAM Board */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Memory Cell Visualization */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Stack Frame Memory Cells (Virtual RAM)
            </span>
            <span className="text-[11px] font-mono text-slate-500">Architecture: 64-bit Little-Endian</span>
          </div>

          {/* Cell 1: count (Target variable) */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              scenario === 'overflow'
                ? 'bg-rose-950/40 border-rose-600/80 shadow-lg shadow-rose-950/50'
                : scenario === 'dangling'
                ? 'bg-amber-950/30 border-amber-600/60'
                : scenario === 'dereferenced'
                ? 'bg-cyan-950/40 border-cyan-500 shadow-md'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Variable: <strong className="text-white">int count</strong></span>
              <span className="text-cyan-400 font-bold">Address: 0x7ffe0040</span>
              <span className="text-slate-500">Size: 4 bytes</span>
            </div>

            <div className="mt-3 flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500">Stored Value (Decimal)</span>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {scenario === 'normal' && '42'}
                  {scenario === 'dereferenced' && '99 (Modified via *ptr!)'}
                  {scenario === 'arithmetic' && '42'}
                  {scenario === 'dangling' && '[DEALLOCATED JUNK]'}
                  {scenario === 'grounded' && '42'}
                  {scenario === 'overflow' && '0x41414141 (CORRUPTED!)'}
                </div>
              </div>
              <div className="text-right text-[11px] font-mono text-slate-400">
                <div>Hex: {scenario === 'overflow' ? '0x41414141' : scenario === 'dereferenced' ? '0x00000063' : '0x0000002A'}</div>
                <div className="text-slate-500">Status: {scenario === 'overflow' ? 'STACK SMASHED' : scenario === 'dangling' ? 'DEAD MEMORY' : 'ACTIVE'}</div>
              </div>
            </div>
          </div>

          {/* Pointer Linkage Arrow */}
          <div className="flex items-center justify-center -my-2 text-xs font-mono text-cyan-400 gap-2">
            {scenario === 'normal' && (
              <span className="flex items-center gap-1 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 text-[11px]">
                ▲ ptr stores address 0x7ffe0040 (Points directly to count)
              </span>
            )}
            {scenario === 'dereferenced' && (
              <span className="flex items-center gap-1 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800 text-[11px] text-cyan-300">
                ▲ *ptr dereferenced: CPU visited 0x7ffe0040 and wrote 99
              </span>
            )}
            {scenario === 'arithmetic' && (
              <span className="flex items-center gap-1 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800 text-[11px] text-indigo-300">
                ▲ ptr + 1 jumped +4 bytes (now points to 0x7ffe0044)
              </span>
            )}
            {scenario === 'dangling' && (
              <span className="flex items-center gap-1 bg-amber-950 px-3 py-1 rounded-full border border-amber-800 text-[11px] text-amber-300">
                ▲ DANGLING: ptr still points to 0x7ffe0040 after memory was destroyed!
              </span>
            )}
            {scenario === 'grounded' && (
              <span className="flex items-center gap-1 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800 text-[11px] text-emerald-300">
                ✓ ptr = NULL: Address set to 0x00000000 (Safe, cannot corrupt memory)
              </span>
            )}
            {scenario === 'overflow' && (
              <span className="flex items-center gap-1 bg-rose-950 px-3 py-1 rounded-full border border-rose-800 text-[11px] text-rose-300">
                ✕ BUFFER OVERFLOW: Adjacent memory overwritten by excessive bytes!
              </span>
            )}
          </div>

          {/* Cell 2: ptr (The Pointer Variable) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Pointer Variable: <strong className="text-white">int *ptr</strong></span>
              <span className="text-indigo-400 font-bold">Address: 0x7ffe0048</span>
              <span className="text-slate-500">Size: 8 bytes (64-bit)</span>
            </div>

            <div className="mt-3 flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500">Stored Value (Address of Target)</span>
                <div className="text-xl font-bold font-mono text-cyan-400">
                  {scenario === 'arithmetic' ? '0x7ffe0044' : scenario === 'grounded' ? '0x00000000 (NULL)' : '0x7ffe0040'}
                </div>
              </div>
              <div className="text-right text-[11px] font-mono text-slate-400">
                <div>Type: int*</div>
                <div className="text-emerald-400 font-medium">
                  {scenario === 'grounded' ? 'Grounded (NULL)' : scenario === 'dangling' ? 'Dangling Address' : 'Valid Address'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Hardware Lesson & Pedagogical Context */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Hardware Execution Analysis
          </h3>

          {scenario === 'normal' && (
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>What you are seeing:</strong> Two distinct locations in computer RAM.
              </p>
              <p>
                1. <code>count</code> lives at address <code>0x7ffe0040</code> and stores the raw number <strong>42</strong>.
              </p>
              <p>
                2. <code>ptr</code> is another variable living at address <code>0x7ffe0048</code>, but its value is <strong>0x7ffe0040</strong> (the address of count).
              </p>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300">
                int count = 42;<br />
                int *ptr = &count; // & extracts 0x7ffe0040
              </div>
            </div>
          )}

          {scenario === 'dereferenced' && (
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p className="text-cyan-300 font-semibold">
                Executing: <code>*ptr = 99;</code>
              </p>
              <p>
                The asterisk <code>*</code> is the <strong>dereference operator</strong>. The CPU does not change <code>ptr</code>. Instead, it reads the address inside <code>ptr</code> (0x7ffe0040), follows the wire to that memory cell, and overwrites 42 with <strong>99</strong>.
              </p>
              <p>
                Notice how <code>count</code> was modified indirectly through the pointer without ever mentioning the word "count"!
              </p>
            </div>
          )}

          {scenario === 'arithmetic' && (
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p className="text-indigo-300 font-semibold">
                Executing: <code>ptr = ptr + 1;</code>
              </p>
              <p>
                Because <code>ptr</code> is an <code>int*</code> and <code>sizeof(int)</code> is <strong>4 bytes</strong>, adding 1 does not produce 0x7ffe0041. It calculates:
              </p>
              <p className="font-mono bg-slate-900 p-2 rounded text-cyan-300 text-[11px]">
                0x7ffe0040 + (1 * 4 bytes) = 0x7ffe0044
              </p>
              <p>
                Pointer arithmetic steps by whole elements, exactly how array indexing <code>array[i]</code> works under the hood.
              </p>
            </div>
          )}

          {scenario === 'dangling' && (
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p className="text-amber-400 font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                The Dangling Pointer Trap
              </p>
              <p>
                The memory for <code>count</code> was freed or went out of scope, but <code>ptr</code> was left still holding the old address <code>0x7ffe0040</code>!
              </p>
              <p>
                If your code tries to read or write <code>*ptr</code> now, you suffer a <strong>Use-After-Free</strong> bug. The operating system may crash (Segmentation Fault) or attackers can exploit it to hijack control.
              </p>
            </div>
          )}

          {scenario === 'grounded' && (
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                Professional Pointer Hygiene
              </p>
              <p>
                Immediately after deallocation, we set <code>ptr = NULL;</code> (address <code>0x00000000</code>).
              </p>
              <p>
                If you ever check <code>if (ptr != NULL)</code>, you know with 100% certainty whether the pointer is safe to use. Moreover, calling <code>free(NULL)</code> is harmless in C!
              </p>
            </div>
          )}

          {scenario === 'overflow' && (
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p className="text-rose-400 font-semibold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                Buffer Overflow & Stack Smashing
              </p>
              <p>
                A 4-byte buffer was written with 8 or 16 bytes of attacker-controlled input. The extra characters spilled over, smashing adjacent variables and the function <strong>Saved Return Address</strong>.
              </p>
              <p>
                When the function returns, the CPU jumps into malicious shellcode! Defense: Always use bounded functions like <code>snprintf()</code> and compile with <code>-fstack-protector-all</code>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
