import { CourseModule } from '../../types/course';

export const module06Pointers: CourseModule = {
  id: 'c-pointers',
  number: 6,
  title: 'Pointers',
  description: 'An exhaustive, concept-first masterclass on physical memory architecture, byte addresses, the address-of (&) and dereference (*) operators, pointer arithmetic, struct pointers, pointer-to-pointer, NULL, dangling and wild pointers, and safety rules.',
  topics: [
    {
      id: 'pointer-core-concept',
      moduleId: 'c-pointers',
      moduleNumber: 6,
      title: 'Memory, Addresses & The Core Pointer Concept',
      subtitle: 'Understanding RAM addresses, the address-of operator (&), dereference operator (*), and pointer variables.',
      estimatedMinutes: 30,
      tags: ['pointers', 'memory-addresses', 'dereference', 'address-of', 'pointer-variables'],
      interactiveMode: 'pointers',
      definition: 'A pointer is a variable whose stored value is not a direct business value (such as an integer or character), but rather the numeric physical memory address of another location in the computer Random Access Memory (RAM).',
      simpleExplanation: 'BEFORE LOOKING AT ANY CODE, PICTURE THIS:\nYour computer has gigabytes of RAM. Think of RAM as a very long street of identical houses. Each house holds 1 byte of data. To deliver mail, every house has a unique numerical street address written on its door (like 100, 101, 102, or in computer notation, hexadecimal numbers like 0x7ffd10).\n\nIf you have a normal variable like "int age = 25;", the number 25 is living inside house #100.\nNow, what is a POINTER? A pointer is another house (say house #200), but inside house #200 you do not write a person\'s age—you write the house number "100" on a piece of paper!\n\nHouse #200 "points to" house #100. That is the entire fundamental concept of a pointer.\n- The Address-Of operator (&) asks: "What is the street address of this variable?" (&age gives 100).\n- The Dereference operator (*) says: "Travel to that address, knock on the door, and look at or change what is inside!" (*ptr gives 25).',
      whyItExists: 'In C, functions are pass-by-value (they only receive isolated copies of data). Without pointers, a function could never modify data in the caller, could never allocate memory dynamically on the heap at runtime, could never build data structures like linked lists or trees, and could never pass huge 100-megabyte files without copying the whole thing byte-by-byte (which would crawl at a snail\'s pace). Pointers let you pass a 8-byte address instead of copying megabytes.',
      howItWorks: [
        'Every byte in RAM has a numerical index called its Address. On modern 64-bit operating systems, addresses are 64-bit numbers (8 bytes wide), typically displayed in hexadecimal format (e.g. 0x7ffee218a090).',
        'Declaring a Pointer: You place an asterisk between the type and the variable name: "int *ptr;". This says "ptr is a variable that will store the address of an int".',
        'Getting an Address: The "&" operator retrieves the memory address where a variable is stored: "ptr = &age;".',
        'Dereferencing: The "*" operator placed before a pointer variable follows the pointer to that address: "*ptr = 30;" writes the value 30 directly into the memory location of "age".',
        'Pointer Size: On a 64-bit system, ALL pointers (char*, int*, double*, void*) are exactly 8 bytes wide because they all store a 64-bit address, regardless of how big or small the data they point to is!'
      ],
      syntax: '/* Declaring a pointer */\ntype *pointer_name;\n\n/* Assigning the address of another variable */\npointer_name = &target_variable;\n\n/* Reading the value through dereferencing */\ntype value = *pointer_name;\n\n/* Writing a new value through dereferencing */\n*pointer_name = new_value;',
      code: `#include <stdio.h>

int main(void) {
    /* 1. Declare a standard integer */
    int count = 42;

    /* 2. Declare an integer pointer and store the address of count */
    int *ptr = &count;

    printf("--- Direct Inspection ---\\n");
    printf("Value of count: %d\\n", count);
    printf("Physical memory address of count (&count): %p\\n", (void*)&count);

    printf("\\n--- Pointer Inspection ---\\n");
    printf("Value stored INSIDE ptr (the address):   %p\\n", (void*)ptr);
    printf("Address of the pointer itself (&ptr):    %p\\n", (void*)&ptr);
    printf("Value obtained by dereferencing (*ptr):  %d\\n", *ptr);

    /* 3. Modifying count indirectly via the pointer */
    *ptr = 100;

    printf("\\n--- After Modifying via *ptr = 100 ---\\n");
    printf("New value of count: %d (modified through pointer!)\\n", count);
    printf("Size of ptr in memory: %zu bytes (64-bit address)\\n", sizeof(ptr));

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'int *ptr = &count;',
          explanation: 'Creates a pointer variable named ptr. &count extracts the exact RAM address where the 4 bytes of count live, and stores that address inside ptr.'
        },
        {
          lineOrToken: '%p and (void*)',
          explanation: '%p is the printf format specifier for printing memory addresses in hexadecimal format. The C standard requires casting pointer arguments to (void*) for %p.'
        },
        {
          lineOrToken: '*ptr = 100;',
          explanation: 'The dereference operator (*). The CPU reads the address inside ptr, visits that physical RAM location, and overwrites the 4 bytes there with the binary value 100. count is changed!'
        },
        {
          lineOrToken: 'sizeof(ptr)',
          explanation: 'Notice that sizeof(count) is 4 bytes, but sizeof(ptr) is 8 bytes on a 64-bit architecture because it holds a 64-bit memory address.'
        }
      ],
      output: '--- Direct Inspection ---\nValue of count: 42\nPhysical memory address of count (&count): 0x7ffe0040\n\n--- Pointer Inspection ---\nValue stored INSIDE ptr (the address):   0x7ffe0040\nAddress of the pointer itself (&ptr):    0x7ffe0048\nValue obtained by dereferencing (*ptr):  42\n\n--- After Modifying via *ptr = 100 ---\nNew value of count: 100 (modified through pointer!)\nSize of ptr in memory: 8 bytes (64-bit address)',
      mistakes: [
        {
          mistake: 'Confusing the declaration asterisk with the dereference asterisk.',
          consequence: 'Thinking that "int *ptr;" dereferences something. In a declaration, "*" simply means "this variable is a pointer type". In an executable expression, "*" means "dereference the pointer".',
          solution: 'Distinguish context: "type *name;" declares a pointer; "*name = val;" accesses the target location.'
        },
        {
          mistake: 'Dereferencing an uninitialized pointer: "int *p; *p = 50;".',
          consequence: 'Catastrophic crash: Segmentation Fault (SIGSEGV). "p" contains random garbage bits from RAM; you are asking the CPU to write to an unknown, illegal memory address.',
          solution: 'Never dereference a pointer until you have assigned it a valid address (e.g. "int *p = &x;" or "int *p = malloc(...)") or initialized it to NULL.'
        }
      ],
      summary: [
        'An address is a numerical label identifying a specific byte in RAM.',
        'A pointer is a variable that stores another variable\'s memory address.',
        '& is the address-of operator; * is the dereference operator.',
        'Dereferencing (*ptr) accesses the physical memory cell residing at the stored address.',
        'On 64-bit systems, all pointers are 8 bytes in size.'
      ],
      questions: [
        {
          id: 'q-ptr-1',
          question: 'What is stored inside a pointer variable?',
          options: [
            'A text copy of the variable\'s name',
            'A memory address where another value is located',
            'The value 0 always',
            'A compiler instruction'
          ],
          correctIndex: 1,
          explanation: 'A pointer is simply a variable whose value is the numeric memory address of another variable or data chunk in RAM.'
        },
        {
          id: 'q-ptr-2',
          question: 'If "int x = 10; int *p = &x;", what does "*p" evaluate to?',
          options: [
            'The memory address of x',
            'The integer value 10',
            'The memory address of p',
            'The size of int (4)'
          ],
          correctIndex: 1,
          explanation: 'The asterisk (*) dereferences the pointer, navigating to the address stored in p and reading the value at that address, which is 10.'
        }
      ]
    },
    {
      id: 'pointer-arithmetic-structs',
      moduleId: 'c-pointers',
      moduleNumber: 6,
      title: 'Pointer Arithmetic, Array Decay, Const Pointers & Structs',
      subtitle: 'Stepping through memory in type increments, array-pointer duality, the arrow operator (->), and const qualifiers.',
      estimatedMinutes: 30,
      tags: ['pointer-arithmetic', 'array-decay', 'struct-pointers', 'arrow-operator', 'const-pointers'],
      interactiveMode: 'pointers',
      definition: 'Pointer arithmetic is the addition or subtraction of an integer offset to/from a pointer, where the numerical memory address shifts not by individual bytes, but by multiples of the byte size of the pointed-to data type.',
      simpleExplanation: 'Suppose you have an int pointer pointing to address 1000. If an int is 4 bytes wide, what should happen if you do "ptr + 1"? If it added 1 raw byte to 1001, it would point to the middle of the integer (cutting off bits). That would corrupt the number! Therefore, C compiler math is smart: "ptr + 1" jumps forward by exactly 1 complete element: 1 * sizeof(int) = 4 bytes (address 1004). If it were a double pointer (8 bytes), "ptr + 1" jumps 8 bytes! This is how array indexing works under the hood: array[i] is literally syntactic sugar for *(array + i).',
      whyItExists: 'Hardware memory is a flat array of bytes. Systems programs need to iterate through buffers, network packets, and image pixel matrices at blazing speeds without recalculating multiplication offsets manually.',
      howItWorks: [
        'Pointer Arithmetic Formula: New_Address = Current_Address + (n * sizeof(*ptr)).',
        'Array Decay: When an array name is passed to a function or used in most expressions, it automatically decays into a pointer to its first element (&array[0]).',
        'Struct Pointers and the Arrow Operator (->): If you have a pointer to a struct "struct Person *p;", writing "(*p).age" is tedious. C provides the arrow operator "p->age" as an identical, cleaner shorthand.',
        'Const Pointer vs Pointer to Const: "const int *p" means the integer data is read-only (you cannot change *p). "int * const p" means the pointer address itself is locked (you cannot point p to another address).'
      ],
      syntax: '/* Pointer Arithmetic */\nint *next = ptr + 1; /* advances by sizeof(*ptr) bytes */\n\n/* Arrow operator for structs */\nstruct Player {\n    int health;\n    int score;\n};\nstruct Player p1 = {100, 50};\nstruct Player *ptr = &p1;\nptr->health = 90; /* Identical to (*ptr).health = 90 */',
      code: `#include <stdio.h>

struct Vector {
    float x;
    float y;
    float z;
};

int main(void) {
    /* 1. Pointer Arithmetic on an Array */
    int numbers[4] = {10, 20, 30, 40};
    int *p = numbers; /* Array decays to pointer to first element */

    printf("--- Pointer Arithmetic Demo ---\\n");
    for (int i = 0; i < 4; i++) {
        printf("*(p + %d) = %d at address %p\\n", i, *(p + i), (void*)(p + i));
    }

    /* 2. Pointers to Structures with Arrow Operator */
    struct Vector position = {12.5f, 0.0f, -8.2f};
    struct Vector *v_ptr = &position;

    printf("\\n--- Struct Pointer with -> Operator ---\\n");
    printf("Initial Position: (%.1f, %.1f, %.1f)\\n", v_ptr->x, v_ptr->y, v_ptr->z);
    
    /* Modify through arrow operator */
    v_ptr->y = 5.5f;
    printf("Updated Position: (%.1f, %.1f, %.1f)\\n", position.x, position.y, position.z);

    /* 3. Const qualifiers */
    int val = 50;
    const int *read_only_data = &val;
    /* *read_only_data = 60;  -- COMPILER ERROR: data is const */
    printf("\\nRead-only pointer target: %d\\n", *read_only_data);

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'int *p = numbers;',
          explanation: 'Array decay. "numbers" automatically evaluates to the memory address of numbers[0].'
        },
        {
          lineOrToken: '*(p + i)',
          explanation: 'Calculates the address at offset i (i * 4 bytes from p) and dereferences it. This is identically equivalent to writing numbers[i].'
        },
        {
          lineOrToken: 'v_ptr->y = 5.5f;',
          explanation: 'The arrow operator (->). Dereferences v_ptr and accesses the struct member "y" in a single clean syntax.'
        },
        {
          lineOrToken: 'const int *read_only_data',
          explanation: 'Pointer to constant integer. You can read the value via the pointer, but attempting to write through the pointer is rejected by the compiler.'
        }
      ],
      output: '--- Pointer Arithmetic Demo ---\n*(p + 0) = 10 at address 0x7ffe10\n*(p + 1) = 20 at address 0x7ffe14\n*(p + 2) = 30 at address 0x7ffe18\n*(p + 3) = 40 at address 0x7ffe1c\n\n--- Struct Pointer with -> Operator ---\nInitial Position: (12.5, 0.0, -8.2)\nUpdated Position: (12.5, 5.5, -8.2)\n\nRead-only pointer target: 50',
      mistakes: [
        {
          mistake: 'Subtracting or adding pointers of incompatible types.',
          consequence: 'Compiler error or pointer miscalculation that accesses garbage byte boundaries.',
          solution: 'Pointer arithmetic is only valid within elements of the same contiguous array and with matching types.'
        },
        {
          mistake: 'Confusing "const int *p" (pointer to const) with "int * const p" (const pointer).',
          consequence: 'Trying to modify immutable data or failing to prevent pointer reassignment.',
          solution: 'Read type declarations from right to left: "const int *p" = p is a pointer to an int that is const. "int * const p" = p is a const pointer to an int.'
        }
      ],
      summary: [
        'Pointer arithmetic advances addresses by multiples of sizeof(type), not raw bytes.',
        'array[i] is strictly equivalent to *(array + i).',
        'The arrow operator (ptr->member) is shorthand for (*ptr).member.',
        'const qualifiers protect against unintended data modification or pointer reassignment.'
      ],
      questions: [
        {
          id: 'q-ptrarith-1',
          question: 'If "double *ptr" holds address 0x1000 and sizeof(double) is 8 bytes, what address does "ptr + 2" produce?',
          options: [
            '0x1002',
            '0x1008',
            '0x1010 (which is 0x1000 + 16 bytes in decimal)',
            '0x2000'
          ],
          correctIndex: 2,
          explanation: 'Pointer arithmetic steps by sizeof(type). ptr + 2 advances by 2 * 8 = 16 bytes. In hexadecimal, 16 is 0x10, so the new address is 0x1010.'
        },
        {
          id: 'q-ptrarith-2',
          question: 'What does the expression "p->name" mean when "p" is a pointer to a struct?',
          options: [
            'It sends "name" over a network socket to p.',
            'It is shorthand for "(*p).name" (dereferencing p and accessing member "name").',
            'It creates a new struct called name.',
            'It deletes the member name from memory.'
          ],
          correctIndex: 1,
          explanation: 'The arrow operator (->) dereferences the struct pointer and selects the named member field, exactly equivalent to (*p).name.'
        }
      ]
    },
    {
      id: 'pointer-safety-advanced',
      moduleId: 'c-pointers',
      moduleNumber: 6,
      title: 'Pointer Safety: NULL, Dangling, Wild Pointers & Pointer-to-Pointer',
      subtitle: 'Double pointers (**ptr), the dangers of invalid pointers, and bulletproof pointer hygiene.',
      estimatedMinutes: 30,
      tags: ['null-pointer', 'dangling-pointer', 'wild-pointer', 'double-pointer', 'pointer-safety'],
      interactiveMode: 'pointers',
      definition: 'A NULL pointer is a pointer deliberately assigned the value 0 to indicate that it points to no valid memory address. A Dangling Pointer is a pointer that holds the memory address of an object that has already been deallocated. A Wild Pointer is an uninitialized pointer holding arbitrary electrical noise.',
      simpleExplanation: 'Imagine an address book:\n1. A VALID pointer is a real address of your friend\'s house.\n2. A NULL pointer is a page where you wrote "BLANK / NO ONE LIVES HERE" (address 0). It is safe because you can check it before driving there!\n3. A WILD pointer is where someone scribbled random gibberish into the book. If you try to drive there, you might crash into a wall.\n4. A DANGLING pointer is an address where your friend used to live, but the house was demolished yesterday. If you try to knock on the door, disaster strikes!\n5. A POINTER-TO-POINTER (**ptr) is a note pointing to another note that tells you the house address.',
      whyItExists: 'In high-level languages like Java or Python, the runtime tracks and hides memory, making dangling pointers impossible. In C, you operate with direct hardware privileges. Understanding these exact states is what distinguishes an amateur whose programs crash intermittently from a professional systems engineer whose code runs reliably for years.',
      howItWorks: [
        'NULL Pointer: Defined in <stddef.h> as ((void*)0). Hardware memory management units (MMUs) map page 0 as invalid; attempting to read or write to address 0 triggers an immediate OS trap (Segmentation Fault), making bugs instantly detectable.',
        'Wild Pointer: Occurs when you declare "int *p;" without assigning a value. Dereferencing it writes to random memory, corrupting unrelated variables or crash tables.',
        'Dangling Pointer: Occurs when memory is freed (e.g. free(ptr);) or a local function variable goes out of scope, but the pointer still holds the old address.',
        'Pointer-to-Pointer (**pp): Used when a function needs to change the address stored inside a caller pointer (e.g. allocating memory inside a helper function or modifying linked list head pointers).'
      ],
      syntax: '/* Initializing to NULL */\nint *safe_ptr = NULL;\nif (safe_ptr != NULL) {\n    *safe_ptr = 10; /* Safe from null dereference */\n}\n\n/* Pointer-to-Pointer */\nint val = 99;\nint *p = &val;\nint **pp = &p; /* pp holds the address of pointer p */\n**pp = 150;    /* dereferences twice to modify val */',
      code: `#include <stdio.h>
#include <stdlib.h>

/* Function that allocates memory and updates the caller pointer using a double pointer */
void allocate_integer(int **double_ptr, int initial_val) {
    *double_ptr = (int*)malloc(sizeof(int));
    if (*double_ptr != NULL) {
        **double_ptr = initial_val;
    }
}

int main(void) {
    /* 1. Demonstrating Safe NULL Pointer Handling */
    int *data = NULL;
    
    if (data == NULL) {
        printf("1. data is currently NULL. Cannot dereference yet.\\n");
    }

    /* 2. Allocating via Pointer-to-Pointer (**ptr) */
    allocate_integer(&data, 777);
    printf("2. data allocated successfully! Value: %d\\n", *data);

    /* 3. Preventing a Dangling Pointer */
    free(data);        /* Deallocates the heap memory */
    data = NULL;       /* CRITICAL DEFENSIVE STEP: Reset pointer to NULL immediately! */

    printf("3. Memory freed and pointer grounded to NULL.\\n");
    if (data == NULL) {
        printf("   Verification passed: data is safe NULL, no dangling pointer bug!\\n");
    }

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'int *data = NULL;',
          explanation: 'Initializes data to the well-defined NULL address (0). Prevents it from becoming a dangerous wild pointer.'
        },
        {
          lineOrToken: 'void allocate_integer(int **double_ptr, ...)',
          explanation: 'Accepts a pointer-to-pointer (int**). Because C passes by value, to modify the caller pointer variable "data", we must pass the address of data (&data).'
        },
        {
          lineOrToken: '*double_ptr = malloc(...)',
          explanation: 'Dereferences once to write the new heap address directly into the caller pointer variable "data".'
        },
        {
          lineOrToken: 'free(data); data = NULL;',
          explanation: 'The golden rule of C pointer hygiene: immediately after freeing heap memory, set the pointer to NULL so it can never be accidentally used as a dangling pointer.'
        }
      ],
      output: '1. data is currently NULL. Cannot dereference yet.\n2. data allocated successfully! Value: 777\n3. Memory freed and pointer grounded to NULL.\n   Verification passed: data is safe NULL, no dangling pointer bug!',
      mistakes: [
        {
          mistake: 'Failing to set a pointer to NULL after calling free().',
          consequence: 'Creates a Dangling Pointer. If the program accidentally accesses or frees that pointer again later, it results in a "Use-After-Free" or "Double Free" exploit.',
          solution: 'Always write "free(ptr); ptr = NULL;" as a two-step reflex.'
        },
        {
          mistake: 'Dereferencing a NULL pointer without checking.',
          consequence: 'Instant crash: Segmentation Fault (SIGSEGV).',
          solution: 'Always test "if (ptr != NULL)" before dereferencing pointers returned from allocation or search functions.'
        }
      ],
      summary: [
        'A NULL pointer points to address 0 and represents intentional absence of a target.',
        'A wild pointer is uninitialized and holds dangerous random garbage.',
        'A dangling pointer points to memory that has already been deallocated or destroyed.',
        'Always set pointers to NULL immediately after freeing them.',
        'A pointer-to-pointer (**ptr) allows a function to change where a caller pointer points.'
      ],
      questions: [
        {
          id: 'q-ptrsafety-1',
          question: 'What is a "dangling pointer"?',
          options: [
            'A pointer that points to another pointer.',
            'A pointer that still holds the memory address of storage that has already been freed or destroyed.',
            'A pointer that has been set to NULL.',
            'A pointer declared inside a loop.'
          ],
          correctIndex: 1,
          explanation: 'A dangling pointer points to invalid memory that was once allocated but has since been freed (or stack memory that has unwound). Accessing it triggers undefined behavior.'
        },
        {
          id: 'q-ptrsafety-2',
          question: 'Why do we pass the address of a pointer (&ptr) as an "int **" to a function that needs to allocate memory?',
          options: [
            'Because C does not allow single pointers in functions.',
            'Because C passes arguments by value; to modify the caller pointer variable itself, you must pass its address.',
            'To make the allocation twice as fast.',
            'Because malloc requires double pointers.'
          ],
          correctIndex: 1,
          explanation: 'Just like passing &x allows a function to modify int x, passing &ptr allows a function to modify where pointer variable ptr is pointing.'
        }
      ]
    }
  ]
};
