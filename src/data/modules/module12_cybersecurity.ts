import { CourseModule } from '../../types/course';

export const module12Cybersecurity: CourseModule = {
  id: 'c-cybersecurity',
  number: 12,
  title: 'C Defensive Systems Cybersecurity',
  description: 'Defensive engineering and binary exploitation prevention: buffer overflows, stack smashing, integer wraparound, compiler mitigation defenses (Stack Canaries, ASLR, DEP/NX), AddressSanitizer (ASan), and static analysis.',
  topics: [
    {
      id: 'buffer-overflow-defenses',
      moduleId: 'c-cybersecurity',
      moduleNumber: 12,
      title: 'Buffer Overflows, Stack Smashing & Return Address Overwrite',
      subtitle: 'How out-of-bounds writes hijack the CPU instruction pointer and how modern defenses stop them.',
      estimatedMinutes: 30,
      tags: ['cybersecurity', 'buffer-overflow', 'stack-canary', 'aslr', 'dep-nx', 'cwe-120'],
      interactiveMode: 'memory',
      definition: 'A buffer overflow is a memory safety anomaly where a program writes data beyond the allocated boundary of a buffer, corrupting adjacent stack or heap memory addresses, including function pointers and the CPU Saved Frame Pointer/Return Address.',
      simpleExplanation: 'When a function is called, the CPU pushes two critical things onto the stack:\n1. The RETURN ADDRESS (a bookmark telling the CPU where to jump back to in your code when this function finishes).\n2. Your local variables (like a 16-byte text buffer for a username).\n\nBecause the stack grows downward toward lower addresses, local variables sit directly above the Saved Return Address! If an attacker inputs 40 bytes into that 16-byte buffer, the extra bytes spill over and overwrite the Return Address bookmark with their own malicious address. When the function returns, the CPU blindly jumps to the attacker\'s code! Modern systems combat this using Stack Canaries (tripwire random numbers), ASLR (randomizing memory layouts), and DEP/NX (marking stack memory as non-executable).',
      whyItExists: 'C allows direct pointer arithmetic and lacks automatic boundary checks for speed. Over 70% of all critical software vulnerabilities in major operating systems and browsers stem from memory safety bugs (buffer overflows and use-after-free).',
      howItWorks: [
        'Stack Frame Anatomy: [Function Parameters] → [Saved Return Address (RIP)] → [Saved Base Pointer (RBP)] → [Local Buffer].',
        'Stack Smashing: Writing past [Local Buffer] overwrites [RBP] then [RIP]. When the RET instruction executes, RIP is loaded with the attacker-controlled value.',
        'Stack Canaries (-fstack-protector-all): The compiler places a secret random canary value between the local buffer and the return address. Before returning, the function verifies the canary. If altered, it aborts instantly with "*** stack smashing detected ***".',
        'ASLR (Address Space Layout Randomization): The OS randomizes stack, heap, and library base addresses on every execution, making hardcoded exploit addresses fail.',
        'DEP / NX (Data Execution Prevention / No-Execute bit): Marks data and stack pages as non-executable; the CPU hardware refuses to execute code residing in stack memory.'
      ],
      syntax: '/* Secure Bounded String Copy with Truncation Check */\nint res = snprintf(dest, sizeof(dest), "%s", untrusted_input);\nif (res < 0 || (size_t)res >= sizeof(dest)) {\n    /* Handle truncation / input rejected safely */\n    return -1;\n}',
      code: `#include <stdio.h>
#include <string.h>

/* Safe processing function demonstrating defensive bounds enforcement */
int process_username_secure(const char *raw_input, char *safe_dest, size_t dest_size) {
    if (raw_input == NULL || safe_dest == NULL || dest_size == 0) {
        return -1; /* Validate pointer inputs */
    }

    /* snprintf guarantees null-termination and prevents buffer overflows */
    int written = snprintf(safe_dest, dest_size, "%s", raw_input);

    /* Detect whether truncation occurred */
    if (written < 0 || (size_t)written >= dest_size) {
        printf("SECURITY WARNING: Input was truncated! Max capacity was %zu bytes.\\n", dest_size);
        return 1; /* Handled safely without stack corruption */
    }

    return 0;
}

int main(void) {
    char user_buffer[16];
    const char *malicious_payload = "SuperLongMaliciousInputThatWouldSmashTheStack";

    printf("--- Defensive Input Validation & Boundary Check ---\\n");
    int status = process_username_secure(malicious_payload, user_buffer, sizeof(user_buffer));

    printf("Buffer safely contained: \\"%s\\"\\n", user_buffer);
    printf("Result code: %d (No memory corruption occurred!)\\n", status);

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'snprintf(safe_dest, dest_size, "%s", raw_input)',
          explanation: 'Strictly bounds the write to dest_size - 1 characters and always appends the null terminator \'\\0\', regardless of how long the input is.'
        },
        {
          lineOrToken: '(size_t)written >= dest_size',
          explanation: 'snprintf returns the number of characters that would have been written. If this number >= dest_size, truncation happened, allowing defensive code to reject or handle the overlong input.'
        },
        {
          lineOrToken: 'raw_input == NULL || ...',
          explanation: 'Defensive parameter validation: never dereference user-supplied pointers without checking for NULL.'
        }
      ],
      output: '--- Defensive Input Validation & Boundary Check ---\nSECURITY WARNING: Input was truncated! Max capacity was 16 bytes.\nBuffer safely contained: "SuperLongMalici"\nResult code: 1 (No memory corruption occurred!)',
      mistakes: [
        {
          mistake: 'Using gets(), sprintf(), or strcpy() without length limits.',
          consequence: 'Allows trivial remote stack smashing and arbitrary code execution vulnerabilities.',
          solution: 'Completely eliminate gets() and strcpy(); replace with snprintf() or fgets().'
        },
        {
          mistake: 'Passing untrusted input directly as the format string: "printf(user_input);".',
          consequence: 'Format String Vulnerability (CWE-134)! An attacker supplying "%x %x %n" can read stack contents or overwrite arbitrary memory locations via the %n specifier.',
          solution: 'Never write printf(input); always write printf("%s", input);.'
        }
      ],
      summary: [
        'Buffer overflows occur when writing data past allocated memory boundaries.',
        'Stack smashing overwrites the function return address to hijack CPU control flow.',
        'Modern compiler defenses include Stack Canaries, ASLR, and DEP/NX.',
        'Always validate input lengths and use bounded functions like snprintf().'
      ],
      questions: [
        {
          id: 'q-sec-1',
          question: 'What is a "Stack Canary" in compiled C binaries?',
          options: [
            'A yellow bird drawn on the icon.',
            'A random secret integer placed on the stack before the return address that is checked before returning to detect stack smashing.',
            'A tool that sings when music plays.',
            'A type of encrypted hard drive.'
          ],
          correctIndex: 1,
          explanation: 'A stack canary is a compiler-inserted guard value placed between local buffers and the return address. If a buffer overflow overwrites it, the program detects the corruption and halts safely before returning.'
        },
        {
          id: 'q-sec-2',
          question: 'Why is "printf(user_string);" a dangerous security flaw?',
          options: [
            'Because it prints too slowly.',
            'Because if the user inputs "%x" or "%n" format specifiers, it triggers a Format String attack that can leak or overwrite memory.',
            'Because user_string must be an integer.',
            'Because printf cannot accept variables.'
          ],
          correctIndex: 1,
          explanation: 'If untrusted input is passed directly as the format argument, attacker-controlled specifiers like %x leak secret memory, and %n writes values into memory addresses.'
        }
      ]
    },
    {
      id: 'sanitizers-integer-overflows',
      moduleId: 'c-cybersecurity',
      moduleNumber: 12,
      title: 'Integer Overflows, Sanitizers (ASan/UBSan) & Static Analysis',
      subtitle: 'Arithmetic wraparound exploits, compiler instrumentation, and automated vulnerability detection.',
      estimatedMinutes: 30,
      tags: ['sanitizers', 'asan', 'ubsan', 'integer-overflow', 'static-analysis', 'valgrind'],
      interactiveMode: 'memory',
      definition: 'An integer overflow occurs when an arithmetic operation attempts to create a numeric value that falls outside the representable range of bits for that type. Sanitizers are compiler-based runtime instrumentation tools (AddressSanitizer, UndefinedBehaviorSanitizer) that detect memory and behavioral violations instantly.',
      simpleExplanation: 'Imagine an odometer in an old car with 5 digits. When it hits 99,999 miles and you drive 1 more mile, it rolls over to 00,000! In C, if an unsigned 32-bit integer reaches 4,294,967,295 and you add 1, it wraps around to 0! If an attacker tricks a shopping cart into calculating "price * quantity = 0" due to wraparound, they get items for free. AddressSanitizer (ASan) is a magical superpower in GCC/Clang: compiling with "-fsanitize=address" catches buffer overflows, use-after-free, and memory leaks the exact millisecond they happen with exact file names and line numbers!',
      whyItExists: 'C bugs are notoriously subtle and may not crash immediately in testing, only causing havoc in production. Sanitizers and static analyzers give C programmers modern memory safety verification without abandoning C speed.',
      howItWorks: [
        'Unsigned vs Signed: Unsigned integers wrap around modulo 2^N (well-defined in C). Signed integer overflow is Undefined Behavior (UB), which compilers can optimize into dead code elimination bugs.',
        'AddressSanitizer (ASan): Injects "Shadow Memory" tracking the validity of every 8 bytes of application RAM. Memory writes to freed or unallocated bytes trigger instant diagnostic crash dumps.',
        'UndefinedBehaviorSanitizer (UBSan): Instrument operations with assertions to detect null pointer dereferences, integer overflows, and misaligned pointer casts at runtime.',
        'Static Analysis (Cppcheck, Clang-Tidy): Scans the AST of your source code before compilation, flagging uninitialized variables, dead stores, and memory leaks.'
      ],
      syntax: '/* Compiling with Sanitizers in GCC/Clang */\ngcc -fsanitize=address,undefined -g -O1 main.c -o safe_app\n\n/* Integer Overflow Guard */\n#include <limits.h>\nif (a > INT_MAX - b) {\n    /* Overflow would occur! Abort safely */\n}',
      code: `#include <stdio.h>
#include <limits.h>

int safe_integer_add(int a, int b, int *result) {
    /* Check for signed integer overflow before adding */
    if ((b > 0 && a > INT_MAX - b) || (b < 0 && a < INT_MIN - b)) {
        printf("SECURITY: Integer overflow detected! Operation aborted.\\n");
        return -1;
    }
    *result = a + b;
    return 0;
}

int main(void) {
    int max_val = INT_MAX;
    int added = 10;
    int answer = 0;

    printf("INT_MAX on this machine: %d\\n", max_val);
    
    printf("Attempting to safely add %d + %d:\\n", max_val, added);
    int status = safe_integer_add(max_val, added, &answer);

    if (status == 0) {
        printf("Result: %d\\n", answer);
    } else {
        printf("Calculation prevented signed overflow undefined behavior!\\n");
    }

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'a > INT_MAX - b',
          explanation: 'Mathematically checks if a + b would exceed INT_MAX without actually performing the overflowing addition.'
        },
        {
          lineOrToken: 'INT_MAX and <limits.h>',
          explanation: 'Standard header defining platform-specific maximum and minimum limits for all primitive integer types (e.g. 2,147,483,647 for 32-bit signed int).'
        },
        {
          lineOrToken: '-fsanitize=address,undefined',
          explanation: 'The industry-standard compiler flags for development: turns on AddressSanitizer (for memory bugs) and UBSan (for undefined behavior like integer overflow).'
        }
      ],
      output: 'INT_MAX on this machine: 2147483647\nAttempting to safely add 2147483647 + 10:\nSECURITY: Integer overflow detected! Operation aborted.\nCalculation prevented signed overflow undefined behavior!',
      mistakes: [
        {
          mistake: 'Testing for signed integer overflow after the fact: "if (a + b < a)".',
          consequence: 'Because signed overflow is Undefined Behavior in C, modern optimizing compilers assume overflow never happens and legally DELETE your if statement entirely!',
          solution: 'Check the boundary conditions BEFORE performing the addition, or use compiler builtins like __builtin_add_overflow().'
        },
        {
          mistake: 'Deploying debug ASan binaries into high-traffic production environments.',
          consequence: 'ASan introduces a ~2x CPU slowdown and increases memory usage, which is acceptable in staging/testing but costly in production.',
          solution: 'Run sanitizers during automated unit testing and fuzz testing (libFuzzer/AFL), and deploy release builds with compiler flags like -O2 -fstack-protector-strong.'
        }
      ],
      summary: [
        'Integer overflows can wrap around, causing arithmetic and buffer allocation size bypasses.',
        'Signed integer overflow is Undefined Behavior; always check boundaries beforehand.',
        'AddressSanitizer (-fsanitize=address) catches out-of-bounds reads/writes and memory leaks.',
        'UndefinedBehaviorSanitizer (-fsanitize=undefined) detects integer overflows and invalid casts.'
      ],
      questions: [
        {
          id: 'q-sec-3',
          question: 'What happens when a 32-bit signed integer exceeds INT_MAX in C?',
          options: [
            'It throws an ArithmeticException.',
            'It is Undefined Behavior according to the ISO C standard.',
            'It always becomes 0.',
            'The operating system restarts.'
          ],
          correctIndex: 1,
          explanation: 'In ISO C, signed integer overflow is strictly Undefined Behavior (UB). The compiler is permitted to optimize assuming it never happens, which can eliminate safety checks.'
        },
        {
          id: 'q-sec-4',
          question: 'Which GCC/Clang compiler flag instruments your code to catch use-after-free and buffer overflows at runtime?',
          options: [
            '-O3',
            '-fsanitize=address',
            '-Wall',
            '-std=c99'
          ],
          correctIndex: 1,
          explanation: '-fsanitize=address activates AddressSanitizer (ASan), which monitors all heap, stack, and global memory accesses and prints detailed crash diagnostics if any illegal memory access occurs.'
        }
      ]
    }
  ]
};
