import { CourseModule } from '../../types/course';

export const module03ControlFlow: CourseModule = {
  id: 'control-flow',
  number: 3,
  title: 'Control Flow',
  description: 'Master how the CPU branches execution paths: boolean conditions, if-else trees, switch statements, jump tables, while and do-while loops, for loops, and break/continue control statements.',
  topics: [
    {
      id: 'conditional-branching',
      moduleId: 'control-flow',
      moduleNumber: 3,
      title: 'Conditional Branching: if, else if, else and switch',
      subtitle: 'How the CPU tests conditions, sets flag registers, and jumps execution instructions.',
      estimatedMinutes: 25,
      tags: ['if', 'else', 'switch', 'branching', 'cpu-flags'],
      interactiveMode: 'memory',
      definition: 'A conditional branch is a control flow structure that tests an expression and directs the CPU to jump to different code blocks depending on whether the test evaluates to non-zero (true) or zero (false).',
      simpleExplanation: 'Normally, a computer executes instructions from top to bottom, line by line. But programs need to make decisions: "If the user password is correct, log them in; otherwise, show an error." In C, any number that is not zero is considered true, and zero is false. The "if" statement checks this number and either runs the attached block or skips it. The "switch" statement lets you jump directly to a matching case when checking an integer against multiple possible values.',
      whyItExists: 'Without conditional branches, a program could only perform the exact same fixed list of actions every single time it ran. In hardware, the CPU contains comparison instructions (like CMP) that update processor status flags (Zero Flag, Sign Flag). The processor then uses conditional jump instructions (like JZ for jump if zero, JNZ for jump if not zero) to alter the Instruction Pointer.',
      howItWorks: [
        'Evaluation: The expression inside if (...) is evaluated to an integer result.',
        'Zero vs Non-Zero: If the result is != 0, the body of the if statement executes. If 0, execution jumps to the "else if" or "else" clause.',
        'Switch Statements: Evaluates an integer or char expression once, and jumps directly to the matching "case" label using a compiler-generated jump table (O(1) time complexity).',
        'Fallthrough: In a switch statement, execution flows straight down through subsequent cases unless explicitly stopped with a "break;" statement.'
      ],
      syntax: '/* if / else if / else */\nif (condition1) {\n    /* executes if condition1 != 0 */\n} else if (condition2) {\n    /* executes if condition2 != 0 */\n} else {\n    /* executes if all conditions == 0 */\n}\n\n/* switch */\nswitch (integer_expr) {\n    case 1:\n        /* action */\n        break;\n    case 2:\n        /* action */\n        break;\n    default:\n        /* fallback action */\n        break;\n}',
      code: `#include <stdio.h>

int main(void) {
    int access_level = 2;
    int system_load = 45;

    /* Evaluating condition with if-else */
    if (system_load > 90) {
        printf("CRITICAL: Server load exceeded 90%%.\\n");
    } else if (system_load > 70) {
        printf("WARNING: High system load.\\n");
    } else {
        printf("STATUS: System load nominal at %d%%.\\n", system_load);
    }

    /* Multi-way branch using switch */
    printf("Role permissions: ");
    switch (access_level) {
        case 1:
            printf("Viewer (Read-only)\\n");
            break;
        case 2:
            printf("Operator (Read & Execute)\\n");
            break;
        case 3:
            printf("Administrator (Full Root Access)\\n");
            break;
        default:
            printf("Guest (Restricted Access)\\n");
            break;
    }

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'if (system_load > 90)',
          explanation: 'Compares 45 > 90. The comparison evaluates to 0 (false), so the CPU skips the immediately following block.'
        },
        {
          lineOrToken: 'else if (system_load > 70)',
          explanation: 'Evaluates 45 > 70, which is also 0 (false). Skips this block.'
        },
        {
          lineOrToken: 'else { ... }',
          explanation: 'Because none of the prior conditions were true, the CPU enters this default branch.'
        },
        {
          lineOrToken: 'switch (access_level)',
          explanation: 'Evaluates access_level (value 2). The compiler generates a jump directly to "case 2:".'
        },
        {
          lineOrToken: 'break;',
          explanation: 'Terminates the switch block and jumps the CPU immediately to the line following the closing brace }. Without break, execution would fall through into case 3.'
        }
      ],
      output: 'STATUS: System load nominal at 45%.\nRole permissions: Operator (Read & Execute)',
      mistakes: [
        {
          mistake: 'Forgetting the "break;" statement at the end of a switch case.',
          consequence: 'Accidental fallthrough: the program executes all subsequent cases below the matching case, creating unintended security breaches or corrupted state.',
          solution: 'Always end every case block with "break;" unless fallthrough is intentionally desired (and if intentional, add an explicit C23 [[fallthrough]] attribute).'
        },
        {
          mistake: 'Placing a semicolon right after an if condition: "if (x > 0); { do_something(); }".',
          consequence: 'The semicolon becomes an empty statement. The if condition guards that empty statement, and the code inside { } runs unconditionally every time!',
          solution: 'Never place a semicolon directly after the parenthesis of an if or while statement.'
        }
      ],
      summary: [
        'Any non-zero expression in C evaluates as true; exactly zero evaluates as false.',
        'Use if-else for general range or boolean condition testing.',
        'Use switch for fast, multi-way branching against discrete integer or character constants.',
        'Always include break; in switch statements to prevent unwanted case fallthrough.'
      ],
      questions: [
        {
          id: 'q-ctrl-1',
          question: 'What happens if you omit the "break;" statement from a matching case in a switch block?',
          options: [
            'The compiler refuses to compile the file.',
            'Execution falls through into the next case statement and runs its code too.',
            'The program halts with a segmentation fault.',
            'The switch statement restarts from the beginning.'
          ],
          correctIndex: 1,
          explanation: 'In C, switch statements have fallthrough behavior. Without a break statement, the CPU continues executing all lines of code in subsequent case blocks until it hits a break or the closing brace.'
        },
        {
          id: 'q-ctrl-2',
          question: 'In C, which of the following values is evaluated as FALSE by an if statement?',
          options: [
            '1',
            '-1',
            '42',
            '0'
          ],
          correctIndex: 3,
          explanation: 'In C, exactly 0 represents false. Every other integer value (including negative numbers like -1 or positive numbers like 42) evaluates to true.'
        }
      ]
    },
    {
      id: 'loops-and-iteration',
      moduleId: 'control-flow',
      moduleNumber: 3,
      title: 'Loops: for, while, do-while, break & continue',
      subtitle: 'Repetitive instruction loops, iteration bounds, and loop control statements.',
      estimatedMinutes: 25,
      tags: ['for', 'while', 'do-while', 'break', 'continue', 'loops'],
      interactiveMode: 'memory',
      definition: 'A loop is a control flow structure that repeats a block of statements as long as a specified conditional expression evaluates to true (non-zero).',
      simpleExplanation: 'If you want to print 100 invoice lines or process 5,000 sensor readings, you do not write 5,000 lines of code. You tell the computer: "Start a counter at 0. As long as the counter is less than 5,000, do the work, then add 1 to the counter." The for-loop is ideal when you know how many times to repeat; the while-loop is ideal when waiting for a condition to change; and the do-while loop guarantees the code runs at least once before checking the condition.',
      whyItExists: 'Automation is the fundamental purpose of computers. CPUs implement loops using backward jumps in machine code (JMP back to the start of the block after incrementing a register and comparing it against a limit).',
      howItWorks: [
        'for (init; condition; step): Runs init once. Tests condition before each iteration. If true, runs body, then executes step, and repeats. If false, terminates.',
        'while (condition): Tests condition before entering. If condition is false initially, the loop body never executes.',
        'do { ... } while (condition);: Executes the loop body first, then tests the condition at the end. Always runs at least once.',
        'break: Immediately exits the innermost enclosing loop.',
        'continue: Skips the remainder of the current loop iteration and jumps immediately to the step/condition test for the next iteration.'
      ],
      syntax: '/* for loop */\nfor (int i = 0; i < count; i++) {\n    /* body */\n}\n\n/* while loop */\nwhile (condition) {\n    /* body */\n}\n\n/* do-while loop */\ndo {\n    /* runs at least once */\n} while (condition);\n\n/* loop control */\nif (exit_early) break;\nif (skip_item) continue;',
      code: `#include <stdio.h>

int main(void) {
    /* 1. for loop: count 0 to 4 */
    printf("For loop counting:\\n");
    for (int i = 0; i < 5; i++) {
        printf("  Step %d\\n", i);
    }

    /* 2. while loop with continue & break */
    printf("While loop with break and continue:\\n");
    int sensor = 0;
    while (sensor < 10) {
        sensor++;
        
        if (sensor == 3) {
            /* Skip printing step 3 */
            continue;
        }
        
        if (sensor == 6) {
            /* Abort loop completely at 6 */
            break;
        }
        
        printf("  Sensor reading: %d\\n", sensor);
    }

    /* 3. do-while loop (guaranteed at least one run) */
    int runs = 0;
    do {
        printf("Do-while executed once even though runs is %d\\n", runs);
    } while (runs != 0);

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'for (int i = 0; i < 5; i++)',
          explanation: 'Initializes counter i to 0. Checks if i < 5. After each loop body execution, executes i++ (increment i by 1). Runs 5 times (i = 0, 1, 2, 3, 4).'
        },
        {
          lineOrToken: 'if (sensor == 3) continue;',
          explanation: 'When sensor reaches 3, continue halts the current iteration immediately and loops back to the while condition, skipping the printf call for 3.'
        },
        {
          lineOrToken: 'if (sensor == 6) break;',
          explanation: 'When sensor reaches 6, break terminates the while loop immediately. Execution proceeds past the loop.'
        },
        {
          lineOrToken: 'do { ... } while (runs != 0);',
          explanation: 'Executes the printf statement first. Only after executing does it check if runs != 0. Because runs is 0, the loop ends after that single run.'
        }
      ],
      output: 'For loop counting:\n  Step 0\n  Step 1\n  Step 2\n  Step 3\n  Step 4\nWhile loop with break and continue:\n  Sensor reading: 1\n  Sensor reading: 2\n  Sensor reading: 4\n  Sensor reading: 5\nDo-while executed once even though runs is 0',
      mistakes: [
        {
          mistake: 'Infinite loops caused by never updating the loop counter inside a while loop.',
          consequence: 'The CPU stays pegged at 100% usage trapped in the loop forever; the program becomes completely unresponsive and freezes.',
          solution: 'Ensure the loop condition variable is guaranteed to be incremented or modified toward the termination condition on every pass.'
        },
        {
          mistake: 'Off-by-one errors (using <= instead of <).',
          consequence: 'Looping one extra time causes array bounds overflows and memory corruption.',
          solution: 'For zero-indexed iterations of size N, the canonical pattern is always "for (int i = 0; i < N; i++)".'
        }
      ],
      summary: [
        'for loops are best when the iteration count is known beforehand.',
        'while loops are best when looping until an external event or condition occurs.',
        'do-while loops are guaranteed to execute their body at least once.',
        'break exits a loop completely; continue jumps to the next iteration.'
      ],
      questions: [
        {
          id: 'q-loop-1',
          question: 'How many times does the loop "for (int i = 0; i < 4; i++)" execute its body?',
          options: [
            '3 times',
            '4 times',
            '5 times',
            'Infinitely'
          ],
          correctIndex: 1,
          explanation: 'The loop executes for i = 0, 1, 2, and 3. When i increments to 4, the test 4 < 4 evaluates to false (0), terminating the loop. Total executions: 4.'
        },
        {
          id: 'q-loop-2',
          question: 'What is the key difference between a while loop and a do-while loop?',
          options: [
            'A while loop checks its condition at the end, while do-while checks at the beginning.',
            'A do-while loop is guaranteed to execute at least once; a while loop may execute zero times if the condition is initially false.',
            'A while loop can only use integers.',
            'do-while cannot use break.'
          ],
          correctIndex: 1,
          explanation: 'A while loop evaluates the condition before entering the body. A do-while loop executes the body first, then evaluates the condition at the bottom.'
        }
      ]
    }
  ]
};
