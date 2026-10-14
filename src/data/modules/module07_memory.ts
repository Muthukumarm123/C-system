import { CourseModule } from '../../types/course';

export const module07Memory: CourseModule = {
  id: 'c-memory',
  number: 7,
  title: 'Memory Architecture & Dynamic Allocation',
  description: 'Stack vs Heap architecture, automatic vs dynamic storage, malloc, calloc, realloc, free, memory leaks, use-after-free, double free, alignment, padding, and why undefined behaviour matters.',
  topics: [
    {
      id: 'stack-vs-heap',
      moduleId: 'c-memory',
      moduleNumber: 7,
      title: 'Memory Layout: Stack, Heap, Data & Text Segments',
      subtitle: 'The anatomical architecture of a running C process inside physical and virtual RAM.',
      estimatedMinutes: 30,
      tags: ['memory-layout', 'stack', 'heap', 'bss', 'text-segment', 'alignment', 'padding'],
      interactiveMode: 'memory',
      definition: 'The memory layout of a C process is the standardized virtual address space partitioning organized into distinct segments: Text (executable instructions), Data/BSS (global and static variables), Heap (dynamically requested memory), and Stack (function stack frames, local variables, and return addresses).',
      simpleExplanation: 'When your operating system runs a compiled C program, it does not just dump everything into a random pile. It divides the memory assigned to your program into four distinct zones:\n1. TEXT SEGMENT: Contains your compiled CPU instructions (read-only so code cannot accidentally overwrite itself).\n2. DATA/BSS SEGMENT: Holds your global and static variables that live forever.\n3. THE STACK: A super-fast, automatic LIFO (Last-In, First-Out) scratchpad. When a function is called, its variables are pushed onto the stack. When the function returns, the stack pointer moves back and the memory is instantly reclaimed. But the stack is small (usually only 8 megabytes)!\n4. THE HEAP: A giant warehouse of memory (gigabytes in size). Memory here does not vanish when a function ends. You explicitly request it using malloc(), and you MUST explicitly return it using free().',
      whyItExists: 'Stack memory is blazing fast because allocating it is just adjusting a single CPU register (the Stack Pointer RSP). But you cannot allocate a 500-megabyte video file on the stack without crashing it (Stack Overflow), nor can you create data whose size is only known while the user is typing. The Heap gives programs the ability to allocate arbitrarily sized data that persists as long as needed.',
      howItWorks: [
        'Stack Growth: On x86 and ARM architectures, the Stack typically grows DOWNWARD (from high addresses to lower addresses), while the Heap grows UPWARD.',
        'Alignment: Modern CPUs read memory in 4-byte, 8-byte, or 16-byte words. If a 4-byte int starts at an odd address not divisible by 4, the CPU must issue multiple memory reads, crippling performance. Compilers enforce alignment by inserting invisible empty bytes called PADDING.',
        'Padding Example: In a struct with a 1-byte char followed by an 8-byte double, the compiler inserts 7 padding bytes so the double starts at an address divisible by 8.',
        'Virtual Memory: Each process gets its own private 64-bit virtual address space mapped to physical RAM pages by the CPU MMU (Memory Management Unit).'
      ],
      syntax: '/* Stack Allocation (automatic, deallocated upon block exit) */\nint local_array[100];\n\n/* Struct Padding Inspection */\nstruct Padded {\n    char a;      /* 1 byte */\n    /* 7 bytes of compiler padding inserted here! */\n    double b;    /* 8 bytes */\n}; /* Total size = 16 bytes, not 9 bytes! */',
      code: `#include <stdio.h>

struct Unoptimized {
    char a;      /* 1 byte */
    /* 3 bytes padding */
    int b;       /* 4 bytes */
    char c;      /* 1 byte */
    /* 3 bytes padding */
};

struct Optimized {
    int b;       /* 4 bytes */
    char a;      /* 1 byte */
    char c;      /* 1 byte */
    /* 2 bytes padding */
};

int main(void) {
    int stack_var = 10;

    printf("--- Memory Alignment & Padding Demonstration ---\\n");
    printf("Size of Unoptimized struct: %zu bytes (contains 6 bytes of padding!)\\n", 
           sizeof(struct Unoptimized));
    printf("Size of Optimized struct:   %zu bytes (reordered to save RAM)\\n", 
           sizeof(struct Optimized));

    printf("\\n--- Stack Address Inspection ---\\n");
    printf("Address of stack_var: %p\\n", (void*)&stack_var);

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'struct Unoptimized',
          explanation: 'Contains a char (1 byte), an int (4 bytes), and another char (1 byte). Naively, 1 + 4 + 1 = 6 bytes. But because int requires 4-byte alignment, the compiler inserts 3 padding bytes after the first char, and 3 trailing padding bytes. Total: 12 bytes!'
        },
        {
          lineOrToken: 'struct Optimized',
          explanation: 'By simply ordering members from largest to smallest (int first, then both chars), the two chars sit next to each other, packing the struct into just 8 bytes total.'
        },
        {
          lineOrToken: 'sizeof(struct ...)',
          explanation: 'Demonstrates why systems programmers care about hardware memory layout: struct field ordering directly impacts cache efficiency and RAM consumption in massive databases.'
        }
      ],
      output: '--- Memory Alignment & Padding Demonstration ---\nSize of Unoptimized struct: 12 bytes (contains 6 bytes of padding!)\nSize of Optimized struct:   8 bytes (reordered to save RAM)\n\n--- Stack Address Inspection ---\nAddress of stack_var: 0x7ffe1040',
      mistakes: [
        {
          mistake: 'Allocating a huge buffer on the stack (e.g. "int buffer[5000000];").',
          consequence: 'Stack Overflow! 5 million 4-byte integers = 20 Megabytes. Since standard stack size is typically 8MB on Linux and 1MB on Windows, the program crashes immediately upon function entry.',
          solution: 'Large data arrays or buffers exceeding a few kilobytes should always be allocated dynamically on the Heap using malloc().'
        },
        {
          mistake: 'Assuming the byte size of a struct is the simple sum of its field types.',
          consequence: 'Corrupting binary file reading or network socket serialization because compiler padding bytes were unexpected.',
          solution: 'Always query sizeof() or use serialization libraries, and reorder struct members to minimize padding.'
        }
      ],
      summary: [
        'The Stack is fast and manages automatic function variables, but has a small fixed size limit.',
        'The Heap provides gigabytes of dynamic storage managed manually by the programmer.',
        'CPUs require data alignment (variables must align to multiples of their size).',
        'Compilers insert invisible padding bytes between struct members to satisfy CPU hardware alignment.'
      ],
      questions: [
        {
          id: 'q-mem-1',
          question: 'Why does declaring a 20-megabyte array as a local variable inside main() cause a crash?',
          options: [
            'C cannot count higher than 1 megabyte.',
            'It exceeds the operating system stack size limit, resulting in a Stack Overflow.',
            'The compiler deletes large arrays.',
            'Arrays cannot hold integers.'
          ],
          correctIndex: 1,
          explanation: 'The call stack has a strict fixed size allocated by the OS (typically 1MB to 8MB). Allocating 20MB on the stack exceeds this limit, causing an instant Stack Overflow crash. Such allocations belong on the Heap.'
        },
        {
          id: 'q-mem-2',
          question: 'Why does the compiler insert padding bytes into a struct?',
          options: [
            'To encrypt the data against hackers.',
            'To align data fields with physical CPU word boundaries for fast memory access.',
            'Because memory chips cannot store odd numbers.',
            'To fill up unused hard disk sectors.'
          ],
          correctIndex: 1,
          explanation: 'CPUs access memory in multi-byte words (e.g. 4 or 8 bytes). Unaligned data requires multiple memory read cycles. Compilers insert padding to keep variables aligned to their natural boundaries.'
        }
      ]
    },
    {
      id: 'dynamic-allocation-pitfalls',
      moduleId: 'c-memory',
      moduleNumber: 7,
      title: 'Dynamic Allocation: malloc, calloc, realloc, free & The Four Fatal Memory Sins',
      subtitle: 'Acquiring heap memory and conquering Memory Leaks, Use-After-Free, Double Free, and Buffer Overflows.',
      estimatedMinutes: 30,
      tags: ['malloc', 'calloc', 'realloc', 'free', 'memory-leaks', 'use-after-free', 'double-free', 'undefined-behaviour'],
      interactiveMode: 'memory',
      definition: 'Dynamic memory allocation is the runtime reservation of arbitrary-sized memory blocks from the Heap using the standard library functions malloc(), calloc(), and realloc(), with manual deallocation performed via free().',
      simpleExplanation: 'When you rent a locker at a train station:\n1. malloc(bytes): Asks the clerk for a locker of a given byte size. The clerk hands you the key (a pointer). The contents inside are whatever junk the last customer left behind.\n2. calloc(count, size): Same as malloc, but the clerk takes a vacuum and zeros out every single bit inside before handing you the key.\n3. realloc(ptr, new_size): Resizes your locker (either stretching it in place or moving your items to a bigger locker and copying them over).\n4. free(ptr): Returns the key to the clerk so someone else can use that space.\n\nWHY DO ISSUES MATTER?\n- Memory Leak: You walk away and never return the key. Do this in a loop, and your server runs out of RAM and crashes!\n- Use-After-Free: You return the key, but keep a duplicate key, sneak back in tomorrow, and read or write data. If another part of the program is using that locker now, you corrupt their data or get hacked!\n- Double Free: You return the exact same key twice to the clerk, corrupting the clerk\'s internal bookkeeping records.\n- Buffer Overflow: You rented a small locker for 10 books, but shoved 50 books in, breaking down the wall into the neighbor\'s locker!',
      whyItExists: 'Static and automatic arrays require knowing their size at compile time. In real applications (like a web browser loading a webpage with an unknown number of images), the exact memory needed is only known at runtime while the program is actively executing.',
      howItWorks: [
        'malloc(size_t size): Allocates "size" consecutive bytes on the Heap. Returns void* pointing to the first byte, or NULL if the system is out of memory. Does NOT initialize memory.',
        'calloc(size_t num, size_t size): Allocates num * size bytes and zeroes out every single byte. Prevents garbage-read bugs.',
        'realloc(void *ptr, size_t new_size): Expands or shrinks an existing heap block, preserving existing contents. If ptr is NULL, behaves like malloc. If new_size is 0, behaves like free.',
        'free(void *ptr): Returns the heap block to the memory allocator. If passed NULL, does nothing safely. Never pass a non-heap or already-freed pointer.',
        'Undefined Behaviour (UB): If code violates C memory rules, the C standard imposes no requirements. The program might crash, print gibberish, delete files, or appear to work temporarily until an exploit strikes.'
      ],
      syntax: '/* Allocation */\ntype *ptr = (type*)malloc(count * sizeof(type));\nif (ptr == NULL) {\n    /* Handle out-of-memory error */\n    return -1;\n}\n\n/* Resizing */\ntype *temp = (type*)realloc(ptr, new_count * sizeof(type));\nif (temp != NULL) {\n    ptr = temp;\n}\n\n/* Deallocation */\nfree(ptr);\nptr = NULL;',
      code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t initial_count = 3;
    
    /* 1. Allocate zero-initialized memory using calloc */
    int *array = (int*)calloc(initial_count, sizeof(int));
    if (array == NULL) {
        fprintf(stderr, "Error: Memory allocation failed!\\n");
        return 1;
    }

    array[0] = 100;
    array[1] = 200;
    array[2] = 300;

    printf("--- Initial Array Allocation (calloc) ---\\n");
    for (size_t i = 0; i < initial_count; i++) {
        printf("array[%zu] = %d\\n", i, array[i]);
    }

    /* 2. Resizing the array dynamically to 5 elements using realloc */
    size_t new_count = 5;
    int *temp = (int*)realloc(array, new_count * sizeof(int));
    if (temp == NULL) {
        fprintf(stderr, "Error: Reallocation failed!\\n");
        free(array);
        return 1;
    }
    array = temp; /* Safe reassignment */

    array[3] = 400;
    array[4] = 500;

    printf("\\n--- Resized Array (realloc) ---\\n");
    for (size_t i = 0; i < new_count; i++) {
        printf("array[%zu] = %d\\n", i, array[i]);
    }

    /* 3. Proper Cleanup to prevent Memory Leaks and Dangling Pointers */
    free(array);
    array = NULL; /* Ground pointer to NULL */

    printf("\\nMemory freed successfully. Pointer grounded to NULL.\\n");
    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'calloc(initial_count, sizeof(int))',
          explanation: 'Allocates 3 * 4 = 12 bytes on the Heap and guarantees all bits are cleared to zero. Always check if the return value is NULL!'
        },
        {
          lineOrToken: 'int *temp = realloc(array, ...)',
          explanation: 'Crucial idiom: Never write "array = realloc(array, ...)". If realloc fails, it returns NULL. Overwriting "array" with NULL would lose the only pointer to the original memory, causing an instant, irreversible Memory Leak!'
        },
        {
          lineOrToken: 'free(array); array = NULL;',
          explanation: 'Deallocates the heap block. Setting array = NULL ensures that any subsequent accidental free(array) is a harmless no-op, preventing a double free crash.'
        }
      ],
      output: '--- Initial Array Allocation (calloc) ---\narray[0] = 100\narray[1] = 200\narray[2] = 300\n\n--- Resized Array (realloc) ---\narray[0] = 100\narray[1] = 200\narray[2] = 300\narray[3] = 400\narray[4] = 500\n\nMemory freed successfully. Pointer grounded to NULL.',
      mistakes: [
        {
          mistake: 'Memory Leak: Allocating memory in a loop without calling free().',
          consequence: 'RAM usage continuously grows over hours or days until the operating system Out-Of-Memory (OOM) killer forcibly terminates the application.',
          solution: 'Ensure every path that allocates memory has a matching free() call before the pointer goes out of scope, or use AddressSanitizer (-fsanitize=address).'
        },
        {
          mistake: 'Use-After-Free: Accessing *ptr after calling free(ptr).',
          consequence: 'Silent memory corruption or severe remote code execution vulnerability (CWE-416).',
          solution: 'Always set ptr = NULL immediately after calling free(ptr).'
        },
        {
          mistake: 'Double Free: Calling free(ptr) twice on the exact same pointer.',
          consequence: 'Corrupts the heap manager internal free-list bins; program aborts with "*** double free detected in tcache 2 ***".',
          solution: 'Grounded NULL pointers are immune: free(NULL) is safely ignored by C.'
        }
      ],
      summary: [
        'malloc() allocates uninitialized heap memory; calloc() allocates zeroed heap memory.',
        'realloc() resizes heap memory dynamically; store the result in a temporary pointer first.',
        'free() releases heap memory back to the operating system allocator.',
        'Always set freed pointers to NULL to prevent use-after-free and double-free vulnerabilities.',
        'Undefined behavior means the C compiler makes no guarantees: crashes, data corruption, or security exploits will occur.'
      ],
      questions: [
        {
          id: 'q-dyn-1',
          question: 'What is a "Memory Leak" in C?',
          options: [
            'When physical RAM chips leak chemical coolant onto the motherboard.',
            'When heap memory is allocated with malloc/calloc but never released with free(), leaving it unrecoverable.',
            'When the CPU stack runs out of room.',
            'When a pointer is set to NULL.'
          ],
          correctIndex: 1,
          explanation: 'A memory leak happens when dynamically allocated heap memory loses all references without being freed, consuming system RAM indefinitely until the process terminates.'
        },
        {
          id: 'q-dyn-2',
          question: 'Why should you assign the return value of realloc() to a temporary pointer before overwriting the original pointer?',
          options: [
            'Because realloc only works with temporary variables.',
            'Because if realloc fails and returns NULL, overwriting the original pointer would lose the memory address forever, causing an unrecoverable memory leak.',
            'To double the speed of realloc.',
            'It is required by the C preprocessor.'
          ],
          correctIndex: 1,
          explanation: 'If realloc fails, the original memory block remains intact on the heap. If you did "ptr = realloc(ptr, ...)" and it returned NULL, ptr would become NULL and the original memory would be lost and leaked.'
        }
      ]
    }
  ]
};
