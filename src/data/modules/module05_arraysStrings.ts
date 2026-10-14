import { CourseModule } from '../../types/course';

export const module05ArraysStrings: CourseModule = {
  id: 'arrays-strings',
  number: 5,
  title: 'Arrays and Strings',
  description: 'Contiguous memory layout, zero-based indexing, multidimensional grids, character arrays, C-strings, the null terminator byte (\\0), standard string library functions, and buffer overflow limits.',
  topics: [
    {
      id: 'arrays-memory-layout',
      moduleId: 'arrays-strings',
      moduleNumber: 5,
      title: 'Arrays: Definition, Contiguous Memory & Indexing',
      subtitle: 'Contiguous memory blocks, index calculation math, and zero-based indexing.',
      estimatedMinutes: 25,
      tags: ['arrays', 'contiguous-memory', 'indexing', 'bounds', 'multidimensional'],
      interactiveMode: 'memory',
      definition: 'An array in C is a fixed-size, contiguous sequence of elements of the same data type stored back-to-back in physical memory, accessed via a zero-based integer index.',
      simpleExplanation: 'Imagine a row of identical lockers in a hallway, numbered 0, 1, 2, 3, and 4. If each locker is 4 bytes wide, locker 0 starts right at the beginning, locker 1 starts exactly 4 bytes later, locker 2 starts 8 bytes later, and so on. An array is that continuous row of lockers in computer RAM. Because they are all the same size and touching each other, the CPU can jump instantly to any item in O(1) time using simple multiplication.',
      whyItExists: 'If you needed to store 10,000 temperature readings without arrays, you would have to invent 10,000 separate variable names (temp1, temp2, ... temp10000). You could not use a loop to process them. An array lets you store all 10,000 items under one name and use an index counter "temp[i]" inside a loop.',
      howItWorks: [
        'Contiguous Allocation: When you declare "int numbers[5];", the compiler reserves 5 * sizeof(int) = 20 consecutive bytes in memory.',
        'Address Arithmetic: Address of numbers[i] = Base_Address + (i * sizeof(element_type)). This is why array indexing starts at 0! Index 0 requires offset 0 * size = 0.',
        'Zero Bounds Checking: The C compiler does NOT check whether your index is within bounds at runtime. If you access numbers[10] on a 5-element array, the CPU will happily read whatever unrelated data happens to sit 40 bytes ahead in memory!',
        'Multidimensional Arrays: Stored in "row-major order" as a single continuous flat strip of memory.'
      ],
      syntax: '/* 1D Array Declaration & Initialization */\ntype array_name[size] = {val0, val1, val2};\n\n/* 2D Array (Matrix) */\ntype matrix[rows][cols] = {\n    {r0c0, r0c1},\n    {r1c0, r1c1}\n};',
      code: `#include <stdio.h>

int main(void) {
    /* Declare and initialize an array of 5 integers */
    int scores[5] = {95, 88, 72, 64, 100};

    printf("Array scores and their exact memory addresses:\\n");
    for (int i = 0; i < 5; i++) {
        printf("scores[%d] = %3d | Address: %p | Offset: %zu bytes\\n", 
               i, scores[i], (void*)&scores[i], i * sizeof(int));
    }

    /* 2D Array: 2 rows by 3 columns */
    int matrix[2][3] = {
        {10, 20, 30},
        {40, 50, 60}
    };

    printf("\\n2D Matrix element [1][2]: %d\\n", matrix[1][2]);

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'int scores[5] = {95, 88, 72, 64, 100};',
          explanation: 'Allocates 20 contiguous bytes on the stack and populates the 5 elements in consecutive index order.'
        },
        {
          lineOrToken: '&scores[i]',
          explanation: 'The address-of operator applied to index i. Notice in the output that each consecutive address increments by exactly 4 bytes (the size of an int).'
        },
        {
          lineOrToken: 'matrix[1][2]',
          explanation: 'Accesses Row 1, Column 2. In row-major memory, the offset formula is (Row * Num_Columns + Col) = (1 * 3 + 2) = element index 5 (value 60).'
        }
      ],
      output: 'Array scores and their exact memory addresses:\nscores[0] =  95 | Address: 0x7ffe40 | Offset: 0 bytes\nscores[1] =  88 | Address: 0x7ffe44 | Offset: 4 bytes\nscores[2] =  72 | Address: 0x7ffe48 | Offset: 8 bytes\nscores[3] =  64 | Address: 0x7ffe4c | Offset: 12 bytes\nscores[4] = 100 | Address: 0x7ffe50 | Offset: 16 bytes\n\n2D Matrix element [1][2]: 60',
      mistakes: [
        {
          mistake: 'Off-by-one index out of bounds: accessing array[size] instead of array[size - 1].',
          consequence: 'Buffer overflow / memory corruption. On an array of size 5, valid indices are 0, 1, 2, 3, 4. Accessing index 5 reads or overwrites adjacent memory on the stack!',
          solution: 'Remember that an array of size N only has indices from 0 up to N - 1.'
        },
        {
          mistake: 'Attempting to copy an array with the assignment operator: "arrayA = arrayB;".',
          consequence: 'Compilation error: array names in expressions decay into pointers to their first elements and cannot be assigned as l-values.',
          solution: 'Copy elements using a loop or memcpy() from <string.h>.'
        }
      ],
      summary: [
        'Arrays are fixed-size, contiguous sequences of identically-typed elements.',
        'Indexing starts at 0 because the index represents the distance offset from the base address.',
        'C performs zero bounds checking: exceeding array limits corrupts memory without warning.',
        'Address of element i is Base + (i * sizeof(type)).'
      ],
      questions: [
        {
          id: 'q-arr-1',
          question: 'Why does array indexing in C start at 0 instead of 1?',
          options: [
            'Because the index represents the memory offset (in element units) from the starting address.',
            'Because Dennis Ritchie preferred 0.',
            'Because computers cannot count odd numbers.',
            'Because arrays must always contain 0.'
          ],
          correctIndex: 0,
          explanation: 'The index represents the distance offset from the base address of the array. The first element is at offset 0 (0 * sizeof(type) bytes from the start).'
        },
        {
          id: 'q-arr-2',
          question: 'If "int buffer[10];" is declared, what is the valid range of indices?',
          options: [
            '1 to 10',
            '0 to 9',
            '0 to 10',
            '-1 to 9'
          ],
          correctIndex: 1,
          explanation: 'For an array of size N, the valid indices range from 0 to N - 1. For a size 10 array, the indices are 0 through 9.'
        }
      ]
    },
    {
      id: 'strings-null-terminator',
      moduleId: 'arrays-strings',
      moduleNumber: 5,
      title: 'Strings, The Null Terminator (\\0) & Buffer Limits',
      subtitle: 'Why C has no string object, character arrays, and boundary-safe string functions.',
      estimatedMinutes: 25,
      tags: ['strings', 'null-terminator', 'strlen', 'strcpy', 'snprintf', 'buffer-overflow'],
      interactiveMode: 'memory',
      definition: 'A string in C is not a distinct primitive data type or class; it is defined as a contiguous array of char elements terminated by a special null byte with ASCII value zero (\'\\0\').',
      simpleExplanation: 'In other programming languages, strings are smart objects that remember their own length. In C, a string is just raw characters in memory. How does the computer know where the text ends? It scans forward until it hits a byte containing zero (\'\\0\'). If the text is "HI", the memory contains three bytes: \'H\', \'I\', and \'\\0\'. If you forget that invisible third byte, string functions will keep reading through your computer memory until they randomly hit a zero byte or crash your program!',
      whyItExists: 'C was designed in the 1970s for computers with minimal RAM (some with only 16 kilobytes). Storing a 32-bit or 64-bit length header for every string was considered too wasteful. Using a single zero byte terminator allowed strings of any length to be processed with minimal memory overhead.',
      howItWorks: [
        'Memory Footprint: A string of length N requires an array of at least N + 1 bytes to store the trailing \'\\0\'.',
        'strlen(): Scans the array counting bytes one by one until it encounters \'\\0\'. Does NOT count the \'\\0\' itself. Time complexity is O(N).',
        'Unsafe Functions (BANNED): functions like gets(), strcpy(), and strcat() do not check buffer capacity and cause fatal security vulnerabilities (Buffer Overflows).',
        'Safe Modern Functions: Use snprintf(), strncpy(), and fgets(), which strictly enforce a maximum character limit.'
      ],
      syntax: '/* String initialization */\nchar greeting[] = "Hello"; /* 6 bytes: H, e, l, l, o, \\0 */\nchar manual[6] = {\'H\', \'e\', \'l\', \'l\', \'o\', \'\\0\'};\n\n/* Safe string formatting */\nsnprintf(destination_buffer, sizeof(destination_buffer), "Format: %s", source);',
      code: `#include <stdio.h>
#include <string.h>

int main(void) {
    /* Declaring a character buffer of 16 bytes */
    char buffer[16];
    const char *name = "Ada Lovelace";

    /* Safe bounded copy using snprintf */
    int written = snprintf(buffer, sizeof(buffer), "%s", name);

    printf("String content: \\"%s\\"\\n", buffer);
    printf("Logical length (strlen): %zu characters\\n", strlen(buffer));
    printf("Total buffer capacity (sizeof): %zu bytes\\n", sizeof(buffer));
    printf("Bytes that would be written: %d\\n", written);

    /* Inspecting the individual bytes including the null terminator */
    printf("Raw byte examination:\\n");
    for (size_t i = 0; i < strlen(buffer) + 1; i++) {
        if (buffer[i] == '\\0') {
            printf("  buffer[%zu] = '\\\\0' (ASCII 0) -> TERMINATOR\\n", i);
        } else {
            printf("  buffer[%zu] = '%c'  (ASCII %d)\\n", i, buffer[i], buffer[i]);
        }
    }

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'char buffer[16];',
          explanation: 'Reserves 16 bytes of stack memory. Can safely hold a string of at most 15 characters plus 1 null terminator byte.'
        },
        {
          lineOrToken: 'snprintf(buffer, sizeof(buffer), ...)',
          explanation: 'Safely copies characters while strictly obeying sizeof(buffer). Even if the source text is 1,000 characters long, snprintf will write at most 15 characters and always append \'\\0\', preventing buffer overflows.'
        },
        {
          lineOrToken: 'strlen(buffer) vs sizeof(buffer)',
          explanation: 'Crucial distinction: strlen() counts the visible characters up to the null terminator (12). sizeof() returns the total allocated capacity of the array (16 bytes).'
        },
        {
          lineOrToken: 'buffer[i] == \'\\0\'',
          explanation: 'The null terminator byte. It has numerical ASCII value 0 and marks the end of the string.'
        }
      ],
      output: 'String content: "Ada Lovelace"\nLogical length (strlen): 12 characters\nTotal buffer capacity (sizeof): 16 bytes\nBytes that would be written: 12\nRaw byte examination:\n  buffer[0] = \'A\'  (ASCII 65)\n  buffer[1] = \'d\'  (ASCII 100)\n  buffer[2] = \'a\'  (ASCII 97)\n  buffer[3] = \' \'  (ASCII 32)\n  buffer[4] = \'L\'  (ASCII 76)\n  buffer[5] = \'o\'  (ASCII 111)\n  buffer[6] = \'v\'  (ASCII 118)\n  buffer[7] = \'e\'  (ASCII 101)\n  buffer[8] = \'l\'  (ASCII 108)\n  buffer[9] = \'a\'  (ASCII 97)\n  buffer[10] = \'c\'  (ASCII 99)\n  buffer[11] = \'e\'  (ASCII 101)\n  buffer[12] = \'\\0\' (ASCII 0) -> TERMINATOR',
      mistakes: [
        {
          mistake: 'Allocating a buffer without space for the null terminator (e.g. char str[5] = "HELLO";).',
          consequence: 'No room for \'\\0\'. The array is not null-terminated! Passing it to printf("%s", str) or strlen(str) reads past the array bounds until it crashes or leaks private memory.',
          solution: 'Always allocate at least N + 1 bytes for a string of length N (e.g. char str[6] = "HELLO";).'
        },
        {
          mistake: 'Using strcpy() or gets() instead of snprintf() or fgets().',
          consequence: 'Catastrophic security vulnerability (CWE-120: Classic Buffer Overflow). Attackers can overwrite the function return address on the stack and execute arbitrary malware.',
          solution: 'Never use gets() (removed from C11) or unconstrained strcpy(). Use snprintf() or strncpy() with bounded lengths.'
        }
      ],
      summary: [
        'A C string is an array of characters terminated by the null character \'\\0\' (ASCII 0).',
        'A string of length N requires N + 1 bytes of memory storage.',
        'strlen() counts characters up to \'\\0\'; sizeof() returns the array capacity in bytes.',
        'Always use bounded functions like snprintf() to prevent disastrous buffer overflows.'
      ],
      questions: [
        {
          id: 'q-str-1',
          question: 'How many bytes of memory does the string literal "Code" occupy in RAM?',
          options: [
            '4 bytes',
            '5 bytes',
            '8 bytes',
            '32 bytes'
          ],
          correctIndex: 1,
          explanation: '"Code" contains 4 characters (\'C\', \'o\', \'d\', \'e\') plus 1 hidden null terminator byte (\'\\0\'), making a total of 5 bytes.'
        },
        {
          id: 'q-str-2',
          question: 'Why is the function gets() officially removed from modern C standards?',
          options: [
            'Because it was too slow.',
            'Because it has no parameter to specify buffer size, making buffer overflow vulnerabilities inevitable.',
            'Because it only works on Windows.',
            'Because it only reads numbers.'
          ],
          correctIndex: 1,
          explanation: 'gets() cannot know how large the destination buffer is. If input exceeds the buffer, it blindly overwrites whatever follows on the stack, creating one of the most famous security vulnerabilities in computing history.'
        }
      ]
    }
  ]
};
