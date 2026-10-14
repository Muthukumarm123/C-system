import { CourseModule } from '../../types/course';

export const module02Fundamentals: CourseModule = {
  id: 'c-fundamentals',
  number: 2,
  title: 'C Fundamentals',
  description: 'Master program structure, memory cells, variables, data types (int, float, char), constants, operators, expressions, type conversion, variable scope, and storage duration.',
  topics: [
    {
      id: 'variables-and-memory',
      moduleId: 'c-fundamentals',
      moduleNumber: 2,
      title: 'Variables, Memory Cells, and Data Types',
      subtitle: 'How the CPU names and reserves physical bytes in Random Access Memory (RAM).',
      estimatedMinutes: 25,
      tags: ['variables', 'memory', 'data-types', 'integers', 'float', 'char'],
      interactiveMode: 'memory',
      definition: 'A variable in C is a human-readable identifier bound to a specific block of physical memory addresses in RAM, having a designated data type that determines its byte size, binary encoding representation, and valid operations.',
      simpleExplanation: 'Imagine the computer RAM as a giant grid of numbered mailboxes. Each mailbox holds one byte (8 bits) of information. If you want to store a number like 42, you cannot expect a human to remember "mailbox number 0x7ffd9820". Instead, you declare a variable named "age". The compiler picks a mailbox for you and writes the number 42 into it. Whenever you write "age" in your code, the computer looks inside that mailbox.',
      whyItExists: 'Without variables and explicit types, programmers would have to manually track raw numerical memory addresses and manually remember whether the bits at address 1044 represent a signed integer, an IEEE-754 decimal number, or an ASCII character. Data types tell the compiler exactly how many bytes to reserve and how to interpret the binary bits inside.',
      howItWorks: [
        'Variable Declaration: You specify the type followed by an identifier: "int score;". The compiler reserves memory on the stack.',
        'Variable Initialization: You assign an initial value: "score = 100;". The CPU writes the binary value into those reserved bytes.',
        'Data Types dictate byte sizes: char (1 byte, -128 to 127 or 0 to 255), int (typically 4 bytes, -2,147,483,648 to 2,147,483,647), float (4 bytes single-precision decimal), double (8 bytes double-precision decimal).',
        'Address Binding: The variable name exists purely during compilation. Once compiled into machine code, the CPU only uses the raw memory address.'
      ],
      syntax: '/* Type specifier followed by name and optional initialization */\ntype variable_name = initial_value;\n\nint age = 25;\nfloat temperature = 98.6f;\ndouble precise_pi = 3.141592653589793;\nchar grade = \'A\';',
      code: `#include <stdio.h>

int main(void) {
    int age = 25;
    float price = 19.99f;
    double atomic_mass = 1.007825032;
    char letter = 'C';

    printf("Age: %d years (size: %zu bytes)\\n", age, sizeof(age));
    printf("Price: $%.2f (size: %zu bytes)\\n", price, sizeof(price));
    printf("Atomic mass: %.6f (size: %zu bytes)\\n", atomic_mass, sizeof(atomic_mass));
    printf("Letter: %c (size: %zu byte, ASCII: %d)\\n", letter, sizeof(letter), letter);

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'int age = 25;',
          explanation: 'Reserves 4 bytes (32 bits) of memory on the stack for a signed two\'s-complement whole integer named "age" and writes the binary representation of 25 into it.'
        },
        {
          lineOrToken: 'float price = 19.99f;',
          explanation: 'Reserves 4 bytes for a single-precision floating-point number. The "f" suffix tells C this is a 32-bit float literal rather than a 64-bit double.'
        },
        {
          lineOrToken: 'char letter = \'C\';',
          explanation: 'Reserves 1 single byte (8 bits). In C, characters are actually small integers mapped via ASCII. The character \'C\' stores the integer value 67 in memory.'
        },
        {
          lineOrToken: 'sizeof(...)',
          explanation: 'A compile-time operator in C that returns the exact memory size in bytes occupied by a data type or variable. It returns a value of type size_t (formatted with %zu).'
        },
        {
          lineOrToken: '%d, %.2f, %c',
          explanation: 'Format specifiers for printf: %d formats a signed decimal integer, %.2f formats a float to 2 decimal places, and %c prints a single character.'
        }
      ],
      output: 'Age: 25 years (size: 4 bytes)\nPrice: $19.99 (size: 4 bytes)\nAtomic mass: 1.007825 (size: 8 bytes)\nLetter: C (size: 1 byte, ASCII: 67)',
      mistakes: [
        {
          mistake: 'Using an uninitialized local variable before assigning it a value.',
          consequence: 'In C, local variables are not set to zero automatically. They contain whatever leftover junk electrical data happened to be in that RAM location ("garbage value").',
          solution: 'Always initialize variables at the moment of declaration (e.g., int counter = 0;).'
        },
        {
          mistake: 'Using double quotes "A" instead of single quotes \'A\' for a char.',
          consequence: '"A" is a string literal containing two bytes (\'A\' and a null terminator \'\\0\'), which fails to compile when assigning to a 1-byte char.',
          solution: 'Use single quotes for single characters (\'A\') and double quotes for text strings ("Hello").'
        }
      ],
      summary: [
        'A variable is a named label for a physical block of RAM bytes.',
        'Data types specify the number of bytes reserved and how bits are interpreted (int, float, double, char).',
        'Local variables contain random garbage data unless explicitly initialized.',
        'The sizeof operator calculates the exact byte footprint of any type or variable at compile time.'
      ],
      questions: [
        {
          id: 'q-var-1',
          question: 'If you declare "int count;" inside main without assigning a value, what does count contain?',
          options: [
            'It is automatically set to 0 by the compiler.',
            'It contains an undefined "garbage" value from whatever bits were previously left in that RAM address.',
            'It causes an immediate operating system crash.',
            'It is set to NULL.'
          ],
          correctIndex: 1,
          explanation: 'C does not zero out local automatic variables on the stack. Whatever random electrical bits existed in that memory location become the variable\'s value until you overwrite it.'
        },
        {
          id: 'q-var-2',
          question: 'What is the memory size of a standard char in C on all compliant architectures?',
          options: [
            '4 bytes',
            '2 bytes',
            'Exactly 1 byte',
            '8 bytes'
          ],
          correctIndex: 2,
          explanation: 'By the C standard specification, sizeof(char) is defined to be exactly 1 byte (at least 8 bits) on every platform.'
        }
      ]
    },
    {
      id: 'constants-and-operators',
      moduleId: 'c-fundamentals',
      moduleNumber: 2,
      title: 'Constants, Operators, Expressions & Statements',
      subtitle: 'Arithmetic, logical, bitwise manipulation, and immutable compile-time constants.',
      estimatedMinutes: 25,
      tags: ['constants', 'operators', 'expressions', 'precedence', 'bitwise'],
      interactiveMode: 'memory',
      definition: 'An operator is a symbol that instructs the compiler to perform a specific mathematical, relational, or bitwise operation on one or more operands; an expression is a sequence of operators and operands that evaluates to a single value; and a constant is an immutable data value that cannot be altered during program execution.',
      simpleExplanation: 'Expressions are like sentences in math. When you write "3 + 5", the plus sign is the operator, 3 and 5 are operands, and the whole thing evaluates to 8. In C, you use operators to calculate numbers, compare whether values are equal (==), check logical conditions (&&, ||), or flip individual electrical bits (<<, >>). If you have a value that must never change (like the speed of light or maximum allowed users), you lock it with the "const" keyword or an enum.',
      whyItExists: 'Computers exist to calculate and evaluate decisions. Operators provide direct mappings to the Arithmetic Logic Unit (ALU) instructions of your CPU, such as ADD, SUB, MUL, DIV, AND, OR, and XOR.',
      howItWorks: [
        'Arithmetic Operators: + (add), - (subtract), * (multiply), / (divide), % (modulus/remainder for integers).',
        'Relational Operators: == (equality), != (inequality), < (less than), > (greater than), <=, >=. In C, there is no separate native boolean type in ancient C; true is any non-zero integer, false is 0 (though <stdbool.h> provides bool, true, and false in C99+).',
        'Logical Operators: && (Logical AND), || (Logical OR), ! (Logical NOT). Evaluated using short-circuit logic.',
        'Bitwise Operators: & (AND), | (OR), ^ (XOR), ~ (NOT), << (Left shift), >> (Right shift). These manipulate the exact binary bits in a byte.',
        'Operator Precedence: Governs the order in which operators are evaluated (multiplication before addition, etc.). Parentheses () always override precedence.'
      ],
      syntax: '/* Constant definition */\nconst int MAX_USERS = 50;\n\n/* Arithmetic and Compound Assignment */\nint result = (a + b) * 2;\na += 5; /* a = a + 5 */\n\n/* Bitwise Shift */\nint shifted = 1 << 3; /* Multiplies 1 by 2^3 = 8 */',
      code: `#include <stdio.h>

int main(void) {
    const int MAX_CAPACITY = 100;
    int current_items = 45;
    
    int items_left = MAX_CAPACITY - current_items;
    int is_half_full = (current_items >= (MAX_CAPACITY / 2));
    
    int bit_flags = 0b00000101; /* Decimal 5 (bits 0 and 2 active) */
    int mask = 0b00000100;      /* Decimal 4 (bit 2 active) */
    int has_flag = (bit_flags & mask) != 0;

    printf("Items left: %d\\n", items_left);
    printf("Is half full: %d (1 = true, 0 = false)\\n", is_half_full);
    printf("Flag 2 active: %d\\n", has_flag);

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'const int MAX_CAPACITY = 100;',
          explanation: 'Declares a read-only variable. If any subsequent line attempts to write "MAX_CAPACITY = 200;", the compiler immediately rejects the code with a compile-time error.'
        },
        {
          lineOrToken: 'MAX_CAPACITY - current_items',
          explanation: 'An arithmetic subtraction expression. The CPU subtracts 45 from 100 and stores 55 in items_left.'
        },
        {
          lineOrToken: 'current_items >= (MAX_CAPACITY / 2)',
          explanation: 'An expression combining division and relational comparison. Because 45 is not >= 50, this evaluates to the integer 0 (false).'
        },
        {
          lineOrToken: 'bit_flags & mask',
          explanation: 'A bitwise AND operation performed directly at the CPU register level, comparing each bit column. Only bits that are 1 in both numbers remain 1.'
        }
      ],
      output: 'Items left: 55\nIs half full: 0 (1 = true, 0 = false)\nFlag 2 active: 1',
      mistakes: [
        {
          mistake: 'Using single equals = instead of double equals == in a comparison.',
          consequence: 'Writing "if (status = 1)" does not check equality; it overwrites status with 1 and always evaluates to true, introducing a severe logic bug.',
          solution: 'Always use == for checking equality and = strictly for assignment.'
        },
        {
          mistake: 'Performing integer division and expecting a decimal result (e.g. 5 / 2 yielding 2.5).',
          consequence: 'In C, dividing an integer by an integer performs integer truncation, discarding the fractional part completely: 5 / 2 evaluates to 2, not 2.5.',
          solution: 'Cast at least one operand to a float/double: "(double)5 / 2" or "5.0 / 2" evaluates to 2.5.'
        }
      ],
      summary: [
        'Expressions evaluate to a value; statements end in a semicolon and perform an action.',
        'Constants defined with const prevent accidental mutations.',
        'Relational operators evaluate to 1 (true) or 0 (false).',
        'Integer division truncates decimals toward zero; cast to float/double for fractional precision.'
      ],
      questions: [
        {
          id: 'q-op-1',
          question: 'What is the exact result of the integer expression "7 / 2" in C?',
          options: [
            '3.5',
            '3',
            '4',
            'A runtime exception'
          ],
          correctIndex: 1,
          explanation: 'In C, when both operands of the division operator / are integers, integer division is performed, which discards any remainder. 7 / 2 equals 3.'
        },
        {
          id: 'q-op-2',
          question: 'What is the crucial difference between the operators "=" and "=="?',
          options: [
            '"=" assigns a value to a memory location, while "==" tests if two expressions have equal values.',
            '"=" is for numbers, while "==" is for text.',
            'There is no difference in C.',
            '"==" assigns a value twice.'
          ],
          correctIndex: 0,
          explanation: '"=" is the assignment operator. "==" is the relational equality comparison operator.'
        }
      ]
    },
    {
      id: 'type-conversion-scope',
      moduleId: 'c-fundamentals',
      moduleNumber: 2,
      title: 'Type Conversion, Scope & Storage Duration',
      subtitle: 'Implicit vs explicit casting, block scoping, global variables, and the static keyword.',
      estimatedMinutes: 25,
      tags: ['casting', 'type-conversion', 'scope', 'storage-duration', 'static'],
      interactiveMode: 'memory',
      definition: 'Scope defines the region of source code where a variable name is visible and accessible, while Storage Duration dictates the lifetime of the variable memory cell in physical RAM (automatic, static, or dynamic). Type conversion changes a value representation from one data type to another.',
      simpleExplanation: 'If you create a variable inside a set of curly braces { }, it is born when the program enters the braces and destroyed the instant the computer leaves the braces. That is "automatic block scope". But if you prefix it with the word "static", its memory stays alive in RAM for the entire life of the program! Meanwhile, type conversion is how you translate between types—like turning a floating-point 3.99 into an integer 3.',
      whyItExists: 'RAM is a finite resource. If every variable lived forever, programs would quickly exhaust memory. Scoping lets the computer automatically reuse the same stack memory locations for different functions once they finish. Type conversion allows safe arithmetic between different hardware representations (such as adding an 8-bit char to a 64-bit double).',
      howItWorks: [
        'Automatic Storage Duration (Local): Created on the stack when the block starts, deallocated automatically when the block exits.',
        'Static Storage Duration: Stored in the Data/BSS segment of the binary. Initialized once at program start and retains its value between function calls.',
        'Implicit Type Promotion: The compiler automatically promotes smaller types to larger types during expressions (e.g. char promotes to int).',
        'Explicit Type Casting: The programmer forces conversion by prefixing the expression with the target type in parentheses: "(double)count".'
      ],
      syntax: '/* Explicit Cast */\ndouble ratio = (double)numerator / denominator;\n\n/* Static variable retaining value between calls */\nvoid counter(void) {\n    static int call_count = 0; /* Initialized once */\n    call_count++;\n}',
      code: `#include <stdio.h>

void track_visits(void) {
    int local_temp = 0;       /* Automatic: reset to 0 on every call */
    static int visit_count = 0; /* Static: persists in RAM across calls */

    local_temp++;
    visit_count++;

    printf("local_temp: %d, static visit_count: %d\\n", local_temp, visit_count);
}

int main(void) {
    int total_points = 17;
    int matches = 5;
    
    /* Explicit cast forces floating-point division */
    double average = (double)total_points / matches;
    printf("Average score: %.2f\\n", average);

    printf("Calling track_visits 3 times:\\n");
    track_visits();
    track_visits();
    track_visits();

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: '(double)total_points / matches',
          explanation: 'Explicitly casts the integer total_points (17) to double (17.0). In C arithmetic rules, dividing a double by an integer promotes matches to double, resulting in 17.0 / 5.0 = 3.4.'
        },
        {
          lineOrToken: 'static int visit_count = 0;',
          explanation: 'The static keyword places visit_count in static memory (the BSS segment) rather than the transient stack frame. It is initialized only once when the program boots and remembers its value between calls.'
        },
        {
          lineOrToken: 'int local_temp = 0;',
          explanation: 'An automatic stack variable. Every time track_visits is entered, a fresh 4 bytes are allocated and reset to 0. When the function returns, those 4 bytes vanish.'
        }
      ],
      output: 'Average score: 3.40\nCalling track_visits 3 times:\nlocal_temp: 1, static visit_count: 1\nlocal_temp: 1, static visit_count: 2\nlocal_temp: 1, static visit_count: 3',
      mistakes: [
        {
          mistake: 'Returning the address of an automatic local variable from a function.',
          consequence: 'Because local variables are destroyed when their enclosing function returns, the returned address points to dead memory. Dereferencing it causes undefined behavior or crashes.',
          solution: 'Never return pointers to local stack variables. Either use static storage, allocate dynamically with malloc(), or have the caller pass in a memory buffer.'
        },
        {
          mistake: 'Casting a high float value to an int that exceeds the int range (e.g. (int)1e15).',
          consequence: 'Triggers undefined behavior on x86/ARM processors, resulting in bogus negative numbers or saturation limits.',
          solution: 'Always verify numerical boundaries before narrowing casts.'
        }
      ],
      summary: [
        'Scope governs visibility in code; storage duration governs lifetime in physical RAM.',
        'Automatic variables on the stack die when the enclosing curly braces { } terminate.',
        'Static variables live in the program data segment for the entire run of the application.',
        'Use explicit casts like "(double)x" to prevent unwanted integer truncation.'
      ],
      questions: [
        {
          id: 'q-scope-1',
          question: 'What happens to a static local variable inside a function when the function returns?',
          options: [
            'Its memory is immediately deallocated and wiped to 0.',
            'It persists in RAM and retains its current value for the next call.',
            'The operating system throws a segmentation fault.',
            'It is converted to a string.'
          ],
          correctIndex: 1,
          explanation: 'Static variables have static storage duration. They are allocated in permanent memory for the lifetime of the program and retain their values across multiple calls to that function.'
        },
        {
          id: 'q-scope-2',
          question: 'Why is "(double)(5 / 2)" still equal to 2.0 rather than 2.5?',
          options: [
            'The cast comes too late: the integer division (5 / 2) evaluates to 2 inside parentheses first before being cast to double.',
            'Double cannot represent decimals.',
            'The compiler reverses operator order.',
            '5 is an invalid double literal.'
          ],
          correctIndex: 0,
          explanation: 'Parentheses evaluate first! (5 / 2) produces integer 2. Then (double)(2) becomes 2.0. To get 2.5, you must write ((double)5 / 2) or (5.0 / 2).'
        }
      ]
    }
  ]
};
