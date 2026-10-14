import { CourseModule } from '../../types/course';

export const module04Functions: CourseModule = {
  id: 'c-functions',
  number: 4,
  title: 'Functions',
  description: 'Understand modular design: function definitions, declarations, forward prototypes, parameters vs arguments, return values, call stack frames, recursion, and function pointers.',
  topics: [
    {
      id: 'function-basics',
      moduleId: 'c-functions',
      moduleNumber: 4,
      title: 'Function Prototypes, Parameters & Return Values',
      subtitle: 'How functions compartmentalize logic, pass data by value, and manage stack frames.',
      estimatedMinutes: 25,
      tags: ['functions', 'prototypes', 'parameters', 'arguments', 'return'],
      interactiveMode: 'memory',
      definition: 'A function in C is a self-contained, named block of statements designed to perform a specific task, characterized by a return type, a parameter list, and a body, with execution invoked via a function call instruction.',
      simpleExplanation: 'Instead of writing the same 20 lines of code every time you want to calculate the area of a circle or validate an email address, you package those lines into a function with a name. A "prototype" is like an announcement at the top of the file telling the compiler: "Hey, there is a function named calculate_area that takes a float and returns a float." Parameters are the placeholder slots inside the function; arguments are the actual values you pass into those slots when calling it.',
      whyItExists: 'In assembly language, running repetitive blocks requires messy, error-prone manual jumps and register management. C functions formalize calling conventions: pushing arguments, saving the return address on the stack, jumping to the function, and restoring the stack when finished.',
      howItWorks: [
        'Function Prototype (Declaration): Informs the compiler of the function signature (return type, name, parameter types) before its actual code appears.',
        'Pass-by-Value: In C, arguments are strictly passed by value. A brand-new copy of each argument is created on the function stack frame. Modifying a parameter inside the function has zero effect on the original caller variable!',
        'Function Call Stack: When a function is called, the CPU pushes a new "Stack Frame" containing parameters, return address, and local variables. When it returns, that frame is popped off.',
        'Return Value: The value computed by the function is placed into a designated CPU register (e.g. RAX/EAX on x86-64) for the caller to receive.'
      ],
      syntax: '/* Function Prototype (Declaration) */\nreturn_type function_name(param_type param1, param_type param2);\n\n/* Function Definition (Implementation) */\nreturn_type function_name(param_type param1, param_type param2) {\n    /* logic */\n    return result;\n}',
      code: `#include <stdio.h>

/* 1. Function Prototype (Forward Declaration) */
int calculate_cube(int number);
void try_to_modify(int val);

int main(void) {
    int original = 4;

    /* Calling calculate_cube */
    int result = calculate_cube(original);
    printf("The cube of %d is: %d\\n", original, result);

    /* Demonstrating Pass-by-Value */
    printf("Original before function call: %d\\n", original);
    try_to_modify(original);
    printf("Original after function call: %d (unchanged!)\\n", original);

    return 0;
}

/* 2. Function Implementation */
int calculate_cube(int number) {
    return number * number * number;
}

void try_to_modify(int val) {
    val = 999; /* Modifies only the local stack copy */
}
`,
      codeExplanation: [
        {
          lineOrToken: 'int calculate_cube(int number);',
          explanation: 'Function prototype. Tells the compiler about calculate_cube before main() uses it. Without this, the compiler will error with "implicit function declaration".'
        },
        {
          lineOrToken: 'int result = calculate_cube(original);',
          explanation: 'Passes the integer 4 into calculate_cube. The return value 64 is returned and stored in result.'
        },
        {
          lineOrToken: 'try_to_modify(int val)',
          explanation: 'Demonstrates pass-by-value. "val" is a completely separate copy of memory. Changing val = 999 alters only that local stack copy, leaving "original" inside main() completely untouched.'
        }
      ],
      output: 'The cube of 4 is: 64\nOriginal before function call: 4\nOriginal after function call: 4 (unchanged!)',
      mistakes: [
        {
          mistake: 'Calling a function before declaring its prototype.',
          consequence: 'Old C standards assumed undeclared functions returned int ("implicit int"). Modern C99/C11/C17 throws a compilation error.',
          solution: 'Always declare your function prototypes at the top of the file or inside a .h header file before calling them.'
        },
        {
          mistake: 'Believing that modifying a parameter inside a function alters the caller variable.',
          consequence: 'Bugs where variables fail to update as expected.',
          solution: 'Remember: C is strictly pass-by-value! If you want a function to modify a caller variable, you MUST pass a pointer (the memory address) to that variable.'
        }
      ],
      summary: [
        'A function prototype informs the compiler of a function signature before its body is defined.',
        'All function arguments in C are passed by value (copied).',
        'Stack frames are allocated on function entry and popped upon return.',
        'To alter an external variable from within a function, you must pass a pointer.'
      ],
      questions: [
        {
          id: 'q-fn-1',
          question: 'If you pass an integer variable "x" with value 10 to a function "void modify(int x) { x = 20; }", what is the value of x in main after the call?',
          options: [
            '20',
            '10',
            '0',
            'Undefined'
          ],
          correctIndex: 1,
          explanation: 'C arguments are passed by value. The function receives a separate copy of x. Modifying the copy inside the function leaves the original variable x in main unchanged at 10.'
        },
        {
          id: 'q-fn-2',
          question: 'What is the primary purpose of a function prototype in C?',
          options: [
            'It allocates memory for the function body.',
            'It tells the compiler the function name, return type, and parameters before the compiler sees calls to it.',
            'It speeds up execution by 50%.',
            'It makes the function accessible over the network.'
          ],
          correctIndex: 1,
          explanation: 'A function prototype provides a forward declaration so the compiler can validate that all calls to the function have matching argument types and return types.'
        }
      ]
    },
    {
      id: 'recursion-function-pointers',
      moduleId: 'c-functions',
      moduleNumber: 4,
      title: 'Recursion and Function Pointers',
      subtitle: 'Self-referential call stacks, base cases, and storing executable code addresses in variables.',
      estimatedMinutes: 25,
      tags: ['recursion', 'stack-overflow', 'function-pointers', 'callbacks'],
      interactiveMode: 'pointers',
      definition: 'Recursion is an algorithmic technique where a function solves a problem by calling a smaller instance of itself until a terminating base case is reached. A function pointer is a pointer variable that stores the physical memory address of the entry point instructions of a function in the code segment.',
      simpleExplanation: 'Recursion is like Russian nesting dolls: each doll opens up a slightly smaller doll, until you hit the smallest doll that cannot be opened (the "base case"). A function pointer sounds intimidating, but it is just a variable that holds the location of a function instead of a number. This lets you pass functions into other functions as "callbacks" (e.g. telling a sorting function how you want items compared).',
      whyItExists: 'Recursion naturally maps to hierarchical data structures like trees, filesystem directories, and expression parsers. Function pointers exist so C can implement polymorphic callbacks, event dispatch tables, and object-oriented style virtual method tables without needing language bloat.',
      howItWorks: [
        'Recursion Base Case: Must be reached to stop recursion. Without it, each call pushes another stack frame until the stack runs out of memory, causing a fatal "Stack Overflow".',
        'Call Stack Unwinding: Once the base case returns, values bubble back up through each previous stack frame.',
        'Function Pointers in Memory: Functions reside in the Code (.text) segment of memory. A function name without parentheses decays into a pointer to its first instruction.',
        'Function Pointer Syntax: "return_type (*pointer_name)(parameter_types);".'
      ],
      syntax: '/* Function Pointer declaration */\nint (*operation)(int, int);\n\n/* Assigning a function address */\noperation = &add; /* or simply: operation = add; */\n\n/* Invoking through the pointer */\nint result = operation(10, 20);',
      code: `#include <stdio.h>

/* Recursive function to calculate factorial */
unsigned long long factorial(unsigned int n) {
    /* 1. Base case: 0! = 1 and 1! = 1 */
    if (n <= 1) {
        return 1;
    }
    /* 2. Recursive step: n * (n - 1)! */
    return n * factorial(n - 1);
}

/* Sample math functions for function pointers */
int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

/* Higher-order function receiving a function pointer callback */
void run_and_print(int (*operation)(int, int), int x, int y, const char *name) {
    int output = operation(x, y);
    printf("Operation %s on (%d, %d) = %d\\n", name, x, y, output);
}

int main(void) {
    /* Recursion test */
    unsigned int num = 5;
    printf("Factorial of %u is: %llu\\n", num, factorial(num));

    /* Function pointer test */
    run_and_print(add, 10, 20, "ADD");
    run_and_print(multiply, 10, 20, "MULTIPLY");

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'if (n <= 1) return 1;',
          explanation: 'The critical base case. Without this condition, factorial would call itself infinitely until stack memory was exhausted.'
        },
        {
          lineOrToken: 'n * factorial(n - 1)',
          explanation: 'The recursive call. The computer suspends the current stack frame and pushes a new frame for factorial(4), factorial(3), etc.'
        },
        {
          lineOrToken: 'int (*operation)(int, int)',
          explanation: 'Declares a function pointer named "operation" that can point to any function that accepts two integers and returns an integer.'
        },
        {
          lineOrToken: 'run_and_print(add, ...)',
          explanation: 'Passes the memory address of the add() function as an argument. The function is called dynamically inside run_and_print.'
        }
      ],
      output: 'Factorial of 5 is: 120\nOperation ADD on (10, 20) = 30\nOperation MULTIPLY on (10, 20) = 200',
      mistakes: [
        {
          mistake: 'Missing or unreachable base case in recursion.',
          consequence: 'Stack Overflow! The program crashes instantly with SIGSEGV (segmentation fault) as the stack exceeds its OS memory limit (typically 8MB).',
          solution: 'Always write and verify the terminating base case condition before writing the recursive call.'
        },
        {
          mistake: 'Forgetting parentheses around (*func_ptr) in function pointer declarations: "int *func(int)" vs "int (*func)(int)".',
          consequence: '"int *func(int)" declares a regular function that returns an int pointer! It is NOT a function pointer.',
          solution: 'Always enclose the pointer name with parentheses: "int (*func_ptr)(int)".'
        }
      ],
      summary: [
        'Recursive functions must always have a verified base case to avoid stack overflow crashes.',
        'Functions reside in executable memory (.text segment) and have memory addresses.',
        'Function pointers allow dynamic dispatch, event listeners, and callback functions in C.',
        'Parentheses around (*pointer_name) are mandatory to bind the pointer to the name instead of the return type.'
      ],
      questions: [
        {
          id: 'q-rec-1',
          question: 'What fatal error occurs if a recursive function does not reach a base case?',
          options: [
            'Compiler syntax error',
            'Stack Overflow (Segmentation fault due to running out of stack space)',
            'The hard drive runs out of disk space',
            'Integer overflow'
          ],
          correctIndex: 1,
          explanation: 'Every recursive call pushes a new stack frame onto the thread stack. Without a base case, frames accumulate continuously until stack limits are exceeded, triggering a stack overflow segmentation fault.'
        },
        {
          id: 'q-rec-2',
          question: 'What does the declaration "void (*callback)(int);" define?',
          options: [
            'A regular function named callback that takes an int and returns void.',
            'A function pointer variable that can point to any function taking one int parameter and returning void.',
            'An array of void pointers.',
            'A memory allocation function.'
          ],
          correctIndex: 1,
          explanation: 'The syntax "void (*callback)(int)" declares a pointer variable named callback which stores the address of a function accepting an int parameter and returning void.'
        }
      ]
    }
  ]
};
