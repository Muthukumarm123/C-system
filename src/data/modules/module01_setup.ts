import { CourseModule } from '../../types/course';

export const module01Setup: CourseModule = {
  id: 'setup-compilation',
  number: 1,
  title: 'Setup and Compilation',
  description: 'Understand what C is, how hardware runs code, how to install compilers on Linux, macOS, and Windows, and dissect the full six-stage journey from source text to machine binary.',
  topics: [
    {
      id: 'what-is-c',
      moduleId: 'setup-compilation',
      moduleNumber: 1,
      title: 'What C Is and Why It Remains Essential',
      subtitle: 'The foundational language of modern operating systems, hardware controllers, and high-performance runtimes.',
      estimatedMinutes: 20,
      tags: ['history', 'hardware', 'operating-systems', 'low-level'],
      interactiveMode: 'compilation',
      definition: 'C is a compiled, statically typed, procedural programming language developed in 1972 by Dennis Ritchie at Bell Laboratories that provides low-level hardware memory access through direct byte addresses while maintaining structured high-level algorithmic constructs.',
      simpleExplanation: 'Computers do not speak human languages like English or Spanish; they only understand billions of electrical on/off switches called bits (represented as 0s and 1s). Most modern languages, like Python or JavaScript, require an extra translator program (an interpreter or virtual machine) running constantly in the background. C is different: it lets you write instructions that translate directly into the exact physical instructions the computer processor executes. If you want to write an operating system (like Linux, Windows, or macOS), a game engine, a spacecraft guidance system, or Python itself, you write it in C.',
      whyItExists: 'Before C was invented, programmers had to write software either in Assembly (tedious, processor-specific commands that cannot be moved to a different computer) or in slow, memory-hungry languages. C was created to build the Unix operating system. The goal was to have a single language that was as fast and memory-efficient as raw machine assembly, yet portable enough that the same source code could run on any hardware with a compatible compiler.',
      howItWorks: [
        'The developer writes text instructions in human-readable plain text files ending in .c.',
        'A special program called a compiler translates those text instructions into native CPU machine instructions (opcodes).',
        'The resulting binary executable file is loaded straight into the computer Random Access Memory (RAM).',
        'The Central Processing Unit (CPU) reads these instructions directly from RAM with zero runtime engine, garbage collector, or interpreter overhead.',
        'The program communicates directly with the computer operating system through kernel system calls.'
      ],
      syntax: '/* Standard C program structure */\n#include <stdio.h>\n\nint main(void) {\n    printf("Target text\\n");\n    return 0;\n}',
      code: `#include <stdio.h>

int main(void) {
    printf("Welcome to C. You are writing native hardware instructions.\\n");
    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: '#include <stdio.h>',
          explanation: 'Tells the C preprocessor to copy and paste the Standard Input/Output header file, which declares the printf function.'
        },
        {
          lineOrToken: 'int main(void)',
          explanation: 'Defines the entry point of every C program. The operating system calls this function first when your program starts. "int" means it returns an integer status code to the OS, and "void" means it accepts no command-line arguments here.'
        },
        {
          lineOrToken: 'printf("Welcome to C...\\n");',
          explanation: 'Calls the standard library function to send characters to the terminal screen. \\n is an escape sequence that moves the cursor to a new line.'
        },
        {
          lineOrToken: 'return 0;',
          explanation: 'Returns the integer 0 back to the host operating system. By convention in computing, returning 0 signals "Success / No Error". Any non-zero number signals an error.'
        }
      ],
      output: 'Welcome to C. You are writing native hardware instructions.',
      mistakes: [
        {
          mistake: 'Assuming C runs inside a browser or virtual machine automatically.',
          consequence: 'Code cannot run by double-clicking a .c file; double-clicking only opens a text editor.',
          solution: 'Always compile your .c source code using a compiler (such as GCC or Clang) into an executable binary before attempting to execute it.'
        },
        {
          mistake: 'Leaving off the semicolon at the end of a statement.',
          consequence: 'The compiler refuses to build the executable and halts with an error: "expected ; before return".',
          solution: 'In C, semicolons are mandatory statement terminators, not optional separators. End every expression statement with a semicolon.'
        }
      ],
      summary: [
        'C is a compiled language that translates directly to native processor instructions with zero runtime bloat.',
        'Major operating systems (Linux, Windows, macOS, Android, iOS) and foundational databases (PostgreSQL, SQLite, Redis) are built with C.',
        'Every C program begins execution at the main() function.',
        'C gives you direct power over computer memory, meaning you have maximum speed, but also full responsibility for memory safety.'
      ],
      questions: [
        {
          id: 'q-c-1',
          question: 'What is the primary difference between a compiled language like C and an interpreted language like Python?',
          options: [
            'C translates directly into native machine code executed by the CPU, whereas Python relies on an interpreter program at runtime.',
            'C requires the internet to execute instructions, while Python runs locally.',
            'C only works on supercomputers, while Python works on laptops.',
            'C does not have any rules for syntax.'
          ],
          correctIndex: 0,
          explanation: 'C compilers translate your written code directly into the raw binary machine code that your specific computer processor understands. Interpreted languages require another program to read and parse the text on the fly.'
        },
        {
          id: 'q-c-2',
          question: 'What does returning 0 from the main() function signify to the operating system?',
          options: [
            'The program encountered a fatal memory crash.',
            'The program executed successfully without errors.',
            'The program took 0 seconds to run.',
            'The operating system must delete the file.'
          ],
          correctIndex: 1,
          explanation: 'In Unix and modern operating systems standard exit codes, an exit code of 0 universally indicates that the process completed successfully.'
        }
      ]
    },
    {
      id: 'compilation-journey',
      moduleId: 'setup-compilation',
      moduleNumber: 1,
      title: 'The Six-Stage Compilation Journey',
      subtitle: 'From Source Code to Preprocessing, Compilation, Assembly, Linking, and Executable Binary.',
      estimatedMinutes: 25,
      tags: ['preprocessor', 'compiler', 'assembler', 'linker', 'executable'],
      interactiveMode: 'compilation',
      definition: 'The compilation process is the multi-stage transformation pipeline that converts high-level human-readable C source code (.c) into a standalone, operating-system-specific machine executable binary file.',
      simpleExplanation: 'When you click "run" in an IDE, you might imagine a single magic step occurs. In reality, your computer executes four distinct programs in a strict sequence: the Preprocessor cleans and expands text, the Compiler translates C logic into CPU assembly language, the Assembler turns assembly into binary zeros and ones, and the Linker stitches your code together with system libraries so the operating system can launch it.',
      whyItExists: 'CPUs cannot read words like "if", "while", or "printf". They only recognize numeric operational codes hardwired into silicon gates. Furthermore, your program relies on code written by other engineers (like the C standard library). A multi-stage pipeline separates text manipulation from syntax checking, machine code generation, and external library connection.',
      howItWorks: [
        'STAGE 1 (Source Code): The developer writes text files (example: program.c and helper.h).',
        'STAGE 2 (Preprocessing): The preprocessor (cpp) strips comments, resolves directives starting with # (e.g. #include pastes file contents, #define replaces tokens), and outputs a purely preprocessed C file (program.i).',
        'STAGE 3 (Compilation): The C compiler proper (cc1) parses the preprocessed text, checks grammar and types, optimizes algorithms, and generates processor-specific assembly code (program.s).',
        'STAGE 4 (Assembly): The assembler (as) translates assembly text into native machine language instructions, producing an Object File (program.o) containing relocatable binary machine code.',
        'STAGE 5 (Linking): The linker (ld) combines your object file with standard system libraries (such as libc.a or libc.so) and startup routines (crt1.o), resolving function addresses to create the final executable.',
        'STAGE 6 (Execution): The OS loader brings the executable into memory, allocates stack and heap, and jumps the CPU Instruction Pointer to main().'
      ],
      syntax: '/* Inspecting each stage with GCC flags */\ngcc -E main.c -o main.i    /* Stage 2: Stop after Preprocessing */\ngcc -S main.i -o main.s    /* Stage 3: Stop after Compilation */\ngcc -c main.s -o main.o    /* Stage 4: Stop after Assembly */\ngcc main.o -o my_program   /* Stage 5: Link into Executable */\n./my_program               /* Stage 6: Execute */',
      code: `#include <stdio.h>

#define MULTIPLIER 8

int main(void) {
    int count = 5;
    int total = count * MULTIPLIER;
    printf("Calculated total: %d\\n", total);
    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: '#define MULTIPLIER 8',
          explanation: 'A preprocessor macro. During Stage 2 (Preprocessing), the preprocessor will scan the file and literally substitute every occurrence of the word MULTIPLIER with the character 8 before the compiler ever sees it.'
        },
        {
          lineOrToken: 'int count = 5;',
          explanation: 'Declares an integer variable named count and initializes it with the value 5. In Stage 3, the compiler reserves memory on the stack for this variable.'
        },
        {
          lineOrToken: 'int total = count * MULTIPLIER;',
          explanation: 'After preprocessing, this becomes "int total = count * 8;". The compiler translates this multiplication into an assembly instruction like "imul eax, 8".'
        },
        {
          lineOrToken: 'printf(...)',
          explanation: 'The compiler notes a call to printf. The linker (Stage 5) connects this call to the actual implementation of printf stored in the system C runtime library (libc).'
        }
      ],
      output: 'Calculated total: 40',
      mistakes: [
        {
          mistake: 'Confusing a Compiler Error with a Linker Error.',
          consequence: 'Spending hours looking for syntax mistakes when the error message actually says "undefined reference to func_name" or "unresolved external symbol".',
          solution: 'Syntax errors (missing semicolons, mismatched brackets) occur during Stage 3 (Compilation). "Undefined reference" errors happen in Stage 5 (Linking) because a function was declared in a header but its implementation (.c file or library) was never provided to the linker.'
        },
        {
          mistake: 'Putting executable C code directly inside header (.h) files instead of just declarations.',
          consequence: 'If multiple .c files include that .h file, the linker will crash with "multiple definition of symbol".',
          solution: 'Put declarations and prototypes in header (.h) files; put actual function implementations in source (.c) files.'
        }
      ],
      summary: [
        'The compilation pipeline consists of 6 sequential steps: Source Code → Preprocessing → Compilation → Assembly → Linking → Executable.',
        'Preprocessor handles #include and #define text replacements.',
        'Compiler translates C logic into assembly code (.s).',
        'Assembler converts assembly code into raw machine object code (.o).',
        'Linker combines object files and standard libraries into a single runnable executable binary.'
      ],
      questions: [
        {
          id: 'q-comp-1',
          question: 'Which tool in the compilation journey is responsible for resolving #include directives and replacing macros?',
          options: [
            'The Preprocessor',
            'The Assembler',
            'The Linker',
            'The CPU Loader'
          ],
          correctIndex: 0,
          explanation: 'The Preprocessor runs first. It performs textual substitution, stripping comments, copying header contents for #include, and substituting #define tokens.'
        },
        {
          id: 'q-comp-2',
          question: 'If you receive an error: "undefined reference to `calculate_tax`", which stage of compilation failed?',
          options: [
            'The Preprocessing stage',
            'The Compilation stage',
            'The Linking stage',
            'The Operating System Loader'
          ],
          correctIndex: 2,
          explanation: '"Undefined reference" is the signature error of the Linker. It means your code compiled fine, but when the linker looked for the machine code implementation of calculate_tax(), it could not find it in any object file or library.'
        }
      ]
    },
    {
      id: 'installing-compilers',
      moduleId: 'setup-compilation',
      moduleNumber: 1,
      title: 'Installing Compilers & Setting Up Your Environment',
      subtitle: 'Installing GCC, Clang, or MSVC on Windows, Linux, and macOS with modern compiler warning flags.',
      estimatedMinutes: 20,
      tags: ['gcc', 'clang', 'msvc', 'linux', 'macos', 'windows', 'terminal'],
      interactiveMode: 'compilation',
      definition: 'A C toolchain is a collection of software development utilities consisting of a C compiler (GCC, Clang, or MSVC), an assembler, a linker, the C standard library headers, and a debugger (GDB or LLDB).',
      simpleExplanation: 'To write and run C code on your personal computer, you need a compiler installed in your command line. On Linux, GCC is the gold standard. On macOS, Apple provides Clang via Xcode Command Line Tools. On Windows, you can use Microsoft Visual C++ (MSVC) through Visual Studio, or GCC via MinGW-w64 or Windows Subsystem for Linux (WSL). Once installed, you invoke the compiler from your terminal using commands like "gcc main.c -o app".',
      whyItExists: 'Operating systems do not include a C compiler by default to save storage space and prevent unintended system modifications. Installing the official toolchain gives you access to the native tool that converts human text into machine-level binaries.',
      howItWorks: [
        'On Linux (Ubuntu/Debian): Run "sudo apt update && sudo apt install build-essential gdb". This installs gcc, g++, make, and libc headers.',
        'On macOS: Open Terminal and run "xcode-select --install". This installs Apple Clang, lldb debugger, and system SDK headers.',
        'On Windows: Option A is installing WSL (Ubuntu on Windows) with "wsl --install", which provides a real Linux GCC environment. Option B is installing MinGW-w64 via MSYS2. Option C is installing Visual Studio Community with "Desktop development with C++".',
        'Verification: Open your terminal and run "gcc --version" or "clang --version" to verify successful path detection.',
        'Strict Warning Flags: Always compile with "-Wall -Wextra -Werror -pedantic -std=c17". These flags instruct the compiler to warn you about potential bugs and treat all warnings as errors.'
      ],
      syntax: '# Linux installation\nsudo apt install build-essential\n\n# macOS installation\nxcode-select --install\n\n# Compiling with professional flags\ngcc -Wall -Wextra -Werror -pedantic -std=c17 main.c -o my_app\n./my_app',
      code: `#include <stdio.h>

int main(void) {
    printf("Toolchain verified successfully!\\n");
    printf("Compiler: GCC / Clang / MSVC C17 Standard compliant.\\n");
    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'gcc -Wall -Wextra',
          explanation: 'Enables all standard compiler warnings (-Wall) plus extra detailed warning checks (-Wextra). This catches uninitialized variables, unused variables, and format mismatches.'
        },
        {
          lineOrToken: '-Werror',
          explanation: 'Instructs the compiler to treat every warning as a hard build error. In professional C systems programming, zero warnings are tolerated.'
        },
        {
          lineOrToken: '-std=c17 -pedantic',
          explanation: 'Enforces strict ISO C17 language standard conformance, rejecting non-standard compiler extensions.'
        },
        {
          lineOrToken: '-o my_app',
          explanation: 'Specifies the name of the output binary file ("my_app"). If omitted, GCC defaults to naming the binary "a.out" on Unix or "a.exe" on Windows.'
        }
      ],
      output: 'Toolchain verified successfully!\nCompiler: GCC / Clang / MSVC C17 Standard compliant.',
      mistakes: [
        {
          mistake: 'Compiling without warning flags (just typing "gcc main.c").',
          consequence: 'The compiler silently ignores dangerous bugs like mismatched data types or uninitialized memory, leading to crashes at runtime that are extremely difficult to diagnose.',
          solution: 'Make it a permanent habit to compile with "gcc -Wall -Wextra -std=c17 main.c -o app".'
        },
        {
          mistake: 'Trying to run the program by typing "my_app" instead of "./my_app" on Linux/macOS.',
          consequence: 'Terminal prints "command not found: my_app".',
          solution: 'Unix terminals do not search the current directory for security reasons. You must prefix executable names with "./" to indicate the current working folder.'
        }
      ],
      summary: [
        'GCC is the standard compiler on Linux; Clang is standard on macOS; MSVC or MinGW/WSL is standard on Windows.',
        'A toolchain provides the compiler, assembler, linker, headers, and debugger.',
        'Compiling with strict warning flags (-Wall -Wextra -Werror) catches 90% of beginner bugs before execution.',
        'Run your compiled executable on Unix systems using "./name".'
      ],
      questions: [
        {
          id: 'q-setup-1',
          question: 'What does the compiler flag "-Wall" do when passed to GCC or Clang?',
          options: [
            'It enables all common compiler warning diagnostics.',
            'It walls off the program so it cannot access the internet.',
            'It speeds up program execution by 100%.',
            'It deletes old object files.'
          ],
          correctIndex: 0,
          explanation: '-Wall stands for "Warn All". It turns on a rich suite of compiler diagnostics to alert you about sloppy code, unused variables, and potential memory bugs.'
        },
        {
          id: 'q-setup-2',
          question: 'Why do you type "./program_name" instead of just "program_name" in a Linux or macOS terminal?',
          options: [
            'Because the operating system requires dots to allocate RAM.',
            'Because the current directory (.) is not in the system PATH variable for security.',
            'Because C programs cannot run without root permissions.',
            'Because the linker requires a relative path.'
          ],
          correctIndex: 1,
          explanation: 'For security reasons, Unix operating systems do not include the current working directory in the PATH environment variable. The "./" explicitly tells the shell to find the file in the current directory.'
        }
      ]
    }
  ]
};
