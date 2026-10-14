import { CourseModule } from '../../types/course';

export const module10DataStructures: CourseModule = {
  id: 'c-data-structures',
  number: 10,
  title: 'Data Structures & Algorithmic Complexity',
  description: 'Build foundational computer science structures in raw C: dynamic arrays, singly and doubly linked lists, LIFO stacks, FIFO queues, binary search trees, hash tables, and Big-O computational complexity.',
  topics: [
    {
      id: 'linked-lists-dynamic-arrays',
      moduleId: 'c-data-structures',
      moduleNumber: 10,
      title: 'Dynamic Arrays & Linked Lists',
      subtitle: 'Contiguous amortized resizing vs pointer-linked non-contiguous heap nodes.',
      estimatedMinutes: 30,
      tags: ['linked-lists', 'dynamic-arrays', 'pointers', 'nodes', 'big-o'],
      interactiveMode: 'pointers',
      definition: 'A dynamic array is a contiguously allocated array that automatically resizes by allocating a larger heap buffer when full (amortized O(1) push). A linked list is a linear collection of discrete heap data nodes where each node contains a value and a pointer to the next node in sequence.',
      simpleExplanation: 'Imagine two ways to seat people:\n1. DYNAMIC ARRAY: A long bench. Everyone sits shoulder to shoulder. Finding the 5th person is instantaneous (bench[4]). But if the bench fills up, you must build a brand-new bench twice as long, move everyone over, and burn the old bench!\n2. LINKED LIST: A treasure hunt. People can sit in completely different rooms or buildings anywhere in RAM! Person #1 holds a piece of paper with the address of Person #2. Person #2 holds the address of Person #3. Adding a new person anywhere is effortless: just hand them a paper address! But to find Person #5, you must walk through persons #1, #2, #3, and #4 first.',
      whyItExists: 'Different problems demand different trade-offs. If you need lightning-fast random lookups by index, dynamic arrays win because CPU caches love contiguous memory. If you need frequent O(1) insertions and deletions without reallocating giant memory chunks, linked lists win.',
      howItWorks: [
        'Dynamic Array Resizing: Starts with capacity C. When size reaches C, capacity is doubled (2 * C) via realloc(), ensuring O(1) amortized insertion cost.',
        'Linked List Node: A struct containing a data payload and a pointer to the next struct node: "struct Node *next;".',
        'Head Pointer: Points to the first node in the list. If head is NULL, the list is empty.',
        'Traversal: A pointer starts at head and advances via "current = current->next" until current becomes NULL.',
        'Deletion: Update the preceding node pointer to bypass the deleted node, then call free() on the deleted node.'
      ],
      syntax: '/* Linked List Node */\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\n/* Allocation of a node */\nNode *new_node = (Node*)malloc(sizeof(Node));\nnew_node->data = 42;\nnew_node->next = NULL;',
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

/* Push a new element to the front of the list (O(1) time) */
void push_front(Node **head_ref, int new_val) {
    Node *new_node = (Node*)malloc(sizeof(Node));
    if (!new_node) return;

    new_node->value = new_val;
    new_node->next = *head_ref; /* Points to the current head */
    *head_ref = new_node;       /* Updates head to point to new node */
}

/* Print all nodes */
void print_list(const Node *head) {
    const Node *curr = head;
    while (curr != NULL) {
        printf("[%d] -> ", curr->value);
        curr = curr->next;
    }
    printf("NULL\\n");
}

/* Free all allocated nodes to prevent memory leaks */
void free_list(Node **head_ref) {
    Node *curr = *head_ref;
    while (curr != NULL) {
        Node *temp = curr->next;
        free(curr);
        curr = temp;
    }
    *head_ref = NULL;
}

int main(void) {
    Node *head = NULL; /* Empty list */

    printf("--- Building Singly Linked List ---\\n");
    push_front(&head, 30);
    push_front(&head, 20);
    push_front(&head, 10);

    print_list(head);

    printf("\\nFreeing list memory safely...\\n");
    free_list(&head);
    print_list(head);

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'push_front(Node **head_ref, int new_val)',
          explanation: 'Accepts a pointer-to-pointer (Node**) so the function can alter the caller head pointer itself when a new node is inserted.'
        },
        {
          lineOrToken: 'new_node->next = *head_ref; *head_ref = new_node;',
          explanation: 'Standard O(1) front insertion: the new node links to the old head, and the head pointer is updated to the new node.'
        },
        {
          lineOrToken: 'free_list(Node **head_ref)',
          explanation: 'Crucial deallocation loop: saves curr->next in a temporary variable before freeing curr. If you freed curr first, curr->next would be a use-after-free bug!'
        }
      ],
      output: '--- Building Singly Linked List ---\n[10] -> [20] -> [30] -> NULL\n\nFreeing list memory safely...\nNULL',
      mistakes: [
        {
          mistake: 'Freeing a node before reading its next pointer: "free(curr); curr = curr->next;".',
          consequence: 'Use-After-Free! Once curr is freed, reading curr->next accesses deallocated heap memory, corrupting data or crashing.',
          solution: 'Always save curr->next to a temporary pointer before calling free(curr).'
        },
        {
          mistake: 'Losing the head pointer of a linked list.',
          consequence: 'Permanent memory leak of every single node in the entire list.',
          solution: 'Always maintain a permanent reference to head, and use a traversal pointer (like "curr") to walk the list.'
        }
      ],
      summary: [
        'Dynamic arrays offer O(1) random access but require expensive O(N) reallocations when resizing.',
        'Linked lists link non-contiguous heap nodes via pointers, enabling O(1) insertions without resizing.',
        'Traversing a linked list is O(N) because the CPU must follow pointer chains.',
        'Always save the next pointer before freeing any node in a linked list.'
      ],
      questions: [
        {
          id: 'q-ds-1',
          question: 'What is the time complexity to look up an element by index in a Dynamic Array vs a Linked List?',
          options: [
            'Array: O(1) constant time | Linked List: O(N) linear time',
            'Array: O(N) | Linked List: O(1)',
            'Both are O(1)',
            'Both are O(N^2)'
          ],
          correctIndex: 0,
          explanation: 'An array provides instant O(1) random access via arithmetic offset. A linked list requires walking through nodes sequentially from head, taking O(N) time.'
        },
        {
          id: 'q-ds-2',
          question: 'Why do we need a temporary pointer when freeing all nodes of a linked list?',
          options: [
            'To make the code look longer.',
            'Because freeing a node deallocates its memory; if you do not save the next address beforehand, you cannot safely find the next node.',
            'Because malloc requires it.',
            'To convert the list into an array.'
          ],
          correctIndex: 1,
          explanation: 'Calling free(node) releases that node. If you did not save node->next into a temporary variable first, reading node->next after free would be an illegal Use-After-Free error.'
        }
      ]
    },
    {
      id: 'stacks-queues-trees-hash-tables',
      moduleId: 'c-data-structures',
      moduleNumber: 10,
      title: 'Stacks, Queues, Binary Trees & Hash Tables',
      subtitle: 'LIFO, FIFO, hierarchical branching, and constant-time key-value hashing.',
      estimatedMinutes: 30,
      tags: ['stacks', 'queues', 'binary-search-tree', 'hash-tables', 'complexity'],
      interactiveMode: 'pointers',
      definition: 'A Stack is a LIFO (Last-In, First-Out) structure. A Queue is a FIFO (First-In, First-Out) structure. A Binary Search Tree (BST) is a hierarchical node structure where left descendants are smaller and right descendants are larger (O(log N) lookup). A Hash Table maps keys to values using a mathematical hashing function to achieve O(1) average lookup.',
      simpleExplanation: '1. STACK (LIFO): A stack of plates. You add plates to the top (push), and remove plates from the top (pop). The last plate put on is the first plate taken off.\n2. QUEUE (FIFO): A line at a cinema. First person to arrive is the first person served (enqueue at rear, dequeue at front).\n3. BINARY SEARCH TREE: A guessing game. "Is the number higher or lower than 50?" You eliminate half of all remaining candidates with every single step (O(log N)).\n4. HASH TABLE: An indexed dictionary. A hash function converts a text word like "Alice" into an integer index (say 4), and stores the phone number directly in bucket 4 for instant O(1) lookup.',
      whyItExists: 'Every modern software system relies on these four primitives: the CPU call stack is a stack; printer queues and packet schedulers are queues; database indexing uses B-trees; and symbol tables, caching systems, and key-value databases (like Redis) use hash tables.',
      howItWorks: [
        'Stack Operations: push(val) adds to top; pop() removes from top; peek() inspects top. All O(1).',
        'Queue Operations: enqueue(val) appends to tail; dequeue() removes from head. All O(1).',
        'BST Invariant: For every node N, every node in N->left has key < N->key, and every node in N->right has key > N->key.',
        'Hash Collisions: When two different keys hash to the same bucket index, systems use "Separate Chaining" (a linked list inside each bucket) or "Open Addressing" (probing the next empty slot).'
      ],
      syntax: '/* Binary Search Tree Node */\ntypedef struct BSTNode {\n    int key;\n    struct BSTNode *left;\n    struct BSTNode *right;\n} BSTNode;\n\n/* Hash Table Entry */\ntypedef struct Entry {\n    char *key;\n    int value;\n    struct Entry *next; /* For chaining */\n} Entry;',
      code: `#include <stdio.h>
#include <stdlib.h>

/* Simple Stack implemented with an array */
#define STACK_CAPACITY 5

typedef struct {
    int data[STACK_CAPACITY];
    int top_index; /* Index of topmost element */
} Stack;

void init_stack(Stack *s) { s->top_index = -1; }
int is_full(const Stack *s) { return s->top_index == STACK_CAPACITY - 1; }
int is_empty(const Stack *s) { return s->top_index == -1; }

void push(Stack *s, int val) {
    if (is_full(s)) {
        printf("Stack Overflow! Cannot push %d\\n", val);
        return;
    }
    s->data[++(s->top_index)] = val;
    printf("Pushed: %d\\n", val);
}

int pop(Stack *s) {
    if (is_empty(s)) {
        printf("Stack Underflow!\\n");
        return -1;
    }
    return s->data[(s->top_index)--];
}

int main(void) {
    Stack my_stack;
    init_stack(&my_stack);

    printf("--- LIFO Stack Demonstration ---\\n");
    push(&my_stack, 10);
    push(&my_stack, 20);
    push(&my_stack, 30);

    printf("\\nPopping elements (Notice reverse order!):\\n");
    while (!is_empty(&my_stack)) {
        printf("Popped: %d\\n", pop(&my_stack));
    }

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 's->top_index = -1;',
          explanation: 'Initializes the stack to empty. When top_index is -1, there are 0 items on the stack.'
        },
        {
          lineOrToken: 's->data[++(s->top_index)] = val;',
          explanation: 'Pre-increments top_index and stores val in that slot. Both push and pop execute in O(1) time.'
        },
        {
          lineOrToken: 'pop(&my_stack)',
          explanation: 'Retrieves 30 first, then 20, then 10, demonstrating the Last-In, First-Out (LIFO) property.'
        }
      ],
      output: '--- LIFO Stack Demonstration ---\nPushed: 10\nPushed: 20\nPushed: 30\n\nPopping elements (Notice reverse order!):\nPopped: 30\nPopped: 20\nPopped: 10',
      mistakes: [
        {
          mistake: 'Popping from an empty stack (Stack Underflow).',
          consequence: 'Reading invalid or negative array indices, leading to undefined behavior.',
          solution: 'Always verify "!is_empty(&stack)" before calling pop().'
        },
        {
          mistake: 'Failing to handle hash collisions in a hash table.',
          consequence: 'New keys with matching hash values overwrite and delete older keys silently.',
          solution: 'Implement separate chaining with linked lists or open addressing to store colliding keys.'
        }
      ],
      summary: [
        'Stack: LIFO (Last-In, First-Out), O(1) push and pop.',
        'Queue: FIFO (First-In, First-Out), O(1) enqueue and dequeue.',
        'Binary Search Tree: O(log N) lookup and insertion if balanced.',
        'Hash Table: O(1) average case lookup using hashing and collision chaining.'
      ],
      questions: [
        {
          id: 'q-ds-3',
          question: 'If you push elements 5, 8, and 12 onto a Stack in that order, what element comes off on the first pop() call?',
          options: [
            '5',
            '8',
            '12',
            'Random'
          ],
          correctIndex: 2,
          explanation: 'Stacks follow Last-In, First-Out (LIFO). 12 was the last item pushed onto the stack, so it is the first item popped off.'
        },
        {
          id: 'q-ds-4',
          question: 'What is a "hash collision" in a Hash Table?',
          options: [
            'When two completely different keys produce the exact same array bucket index after hashing.',
            'When the computer memory runs out of electrical power.',
            'When a hash function returns 0.',
            'When keys are integers instead of strings.'
          ],
          correctIndex: 0,
          explanation: 'A hash collision happens when two distinct keys yield the same bucket index. Hash tables use collision resolution (such as linked lists in buckets) to safely store both.'
        }
      ]
    }
  ]
};
