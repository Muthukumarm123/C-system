import { CourseModule } from '../../types/course';

export const module08Structures: CourseModule = {
  id: 'c-structures',
  number: 8,
  title: 'Structures, Unions, Enums & Typedef',
  description: 'User-defined aggregate types: struct memory packaging, unions with overlapping byte storage, enums for readable named states, typedef aliases, and nested structures with pointers.',
  topics: [
    {
      id: 'struct-and-typedef',
      moduleId: 'c-structures',
      moduleNumber: 8,
      title: 'Structures (struct) and Type Aliasing (typedef)',
      subtitle: 'Grouping heterogeneous data types into unified custom record representations.',
      estimatedMinutes: 25,
      tags: ['struct', 'typedef', 'records', 'custom-types', 'dot-operator'],
      interactiveMode: 'struct_layout',
      definition: 'A struct (structure) in C is a user-defined composite data type that encapsulates a logically related collection of variables of differing data types into a single contiguous block of memory.',
      simpleExplanation: 'Imagine an employee record in an office: one employee has an ID number (integer), a salary (double), and a name (array of characters). An array cannot hold these because an array requires all elements to be the exact same type. A "struct" is like a customized paper form that glues different data types together under one neat package. "typedef" lets you give this new package a clean, short name so you do not have to type "struct Employee" every time.',
      whyItExists: 'Real-world data is inherently complex and heterogeneous (coordinates, network packets, user accounts, 3D mesh vertices). Without structs, related values would have to be passed as dozens of loose variables across every function, leading to unwieldy, error-prone code.',
      howItWorks: [
        'Declaration: Defines the blueprint of the struct with its named member fields.',
        'Instantiation: Reserves physical memory on the stack or heap formatted according to that blueprint.',
        'Member Access: Uses the dot operator (.) to read or write specific fields: "person.age = 30;".',
        'typedef: Creates an alias for an existing type: "typedef struct Person Person_t;".',
        'Pass-by-Value: Passing a struct to a function copies every single byte of the entire struct. To avoid slow copying overhead, programmers almost always pass a pointer to the struct ("const Person_t *p") instead.'
      ],
      syntax: '/* Defining a struct with typedef */\ntypedef struct {\n    int id;\n    char name[32];\n    double balance;\n} Account;\n\n/* Instantiating */\nAccount acc1 = {101, "Alice", 4500.50};\n\n/* Accessing members */\nacc1.balance += 200.0;',
      code: `#include <stdio.h>
#include <string.h>

/* Define a custom structure type with typedef */
typedef struct {
    int id;
    char username[24];
    double hourly_rate;
    int is_active;
} Employee;

/* Function accepting struct pointer for efficiency */
void print_employee(const Employee *emp) {
    printf("ID: %d | User: %-12s | Rate: $%.2f/hr | Active: %s\\n",
           emp->id,
           emp->username,
           emp->hourly_rate,
           emp->is_active ? "YES" : "NO");
}

int main(void) {
    /* Instantiating with designated initializers */
    Employee dev = {
        .id = 1042,
        .username = "c_wizard",
        .hourly_rate = 85.50,
        .is_active = 1
    };

    printf("--- Employee Record ---\\n");
    print_employee(&dev);

    /* Updating member via dot operator */
    dev.hourly_rate = 92.00;
    printf("\\n--- After Rate Adjustment ---\\n");
    print_employee(&dev);

    printf("\\nTotal memory footprint of Employee struct: %zu bytes\\n", sizeof(Employee));
    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'typedef struct { ... } Employee;',
          explanation: 'Defines the composite type and creates an alias named "Employee". You can now declare variables as "Employee emp;" without prepending the keyword "struct".'
        },
        {
          lineOrToken: '.id = 1042, .username = "c_wizard"',
          explanation: 'Designated Initializers (introduced in C99). Allows setting struct fields by name in any order, making initialization clear and resistant to future field reordering.'
        },
        {
          lineOrToken: 'const Employee *emp',
          explanation: 'Accepts a pointer to the struct. Instead of copying all 48 bytes onto the function stack frame, it only passes an 8-byte pointer, saving CPU cycles.'
        },
        {
          lineOrToken: 'emp->id',
          explanation: 'The arrow operator dereferences the pointer and accesses the member field.'
        }
      ],
      output: '--- Employee Record ---\nID: 1042 | User: c_wizard     | Rate: $85.50/hr | Active: YES\n\n--- After Rate Adjustment ---\nID: 1042 | User: c_wizard     | Rate: $92.00/hr | Active: YES\n\nTotal memory footprint of Employee struct: 48 bytes',
      mistakes: [
        {
          mistake: 'Passing large structs by value to functions: "void render(Scene scene)".',
          consequence: 'Severe performance penalty. If Scene is 4,000 bytes, every function call copies all 4,000 bytes onto the stack frame.',
          solution: 'Pass structs by const pointer: "void render(const Scene *scene)".'
        },
        {
          mistake: 'Trying to compare two structs with ==: "if (emp1 == emp2)".',
          consequence: 'Compile error. C does not allow direct == comparisons on structs because padding bytes contain undefined garbage values that would make byte-by-byte comparisons fail.',
          solution: 'Compare the individual fields manually or write a dedicated comparison function.'
        }
      ],
      summary: [
        'struct groups heterogeneous data variables into a unified composite type.',
        'typedef creates a clean type alias, eliminating repetitive struct keywords.',
        'Use designated initializers (.field = val) for clean, safe initialization.',
        'Pass structs to functions via pointers (const Type *ptr) to eliminate memory copy overhead.'
      ],
      questions: [
        {
          id: 'q-struct-1',
          question: 'Why does C not support using the "==" operator to compare two struct variables directly?',
          options: [
            'Because structs cannot hold numbers.',
            'Because compiler padding bytes between fields can contain random garbage bits, which would make bitwise equality checks unreliable.',
            'Because structs are always stored on the GPU.',
            'It is supported in standard C.'
          ],
          correctIndex: 1,
          explanation: 'Because structs often contain invisible alignment padding bytes holding arbitrary undefined bits, a raw memory comparison (memcmp) could return false even if all logical fields are identical. Therefore, C forbids == on structs.'
        },
        {
          id: 'q-struct-2',
          question: 'What is the performance advantage of passing "const Vector3D *v" instead of "Vector3D v"?',
          options: [
            'It passes only an 8-byte memory address rather than copying the entire struct onto the stack frame.',
            'It automatically converts the struct into JSON.',
            'It locks the CPU to prevent other processes from running.',
            'There is no performance difference.'
          ],
          correctIndex: 0,
          explanation: 'Passing by pointer passes only the 8-byte memory address, preventing the CPU from having to copy all member bytes of the struct onto the call stack.'
        }
      ]
    },
    {
      id: 'unions-and-enums',
      moduleId: 'c-structures',
      moduleNumber: 8,
      title: 'Unions, Enums & Nested Structures',
      subtitle: 'Overlapping memory storage in unions and type-safe integer enumerations.',
      estimatedMinutes: 25,
      tags: ['union', 'enum', 'nested-structs', 'memory-overlap', 'tagged-unions'],
      interactiveMode: 'struct_layout',
      definition: 'A union is a user-defined type where all member variables share the exact same physical memory location; its total size equals the size of its largest member. An enum (enumeration) defines a user-defined type consisting of a set of named integer constants.',
      simpleExplanation: 'In a struct, each member gets its own separate room in the house. In a union, ALL members share ONE SINGLE room! If you write an integer into that room, it overwrites whatever float or character was in there before. Why would you want that? When you need a variable that can hold either a temperature reading, or an error code, or a text letter—but NEVER all three at the same instant! It saves vast amounts of memory. Enums give meaningful names to numbers, like naming error codes SUCCESS = 0, TIMEOUT = 1, NOT_FOUND = 2.',
      whyItExists: 'Embedded hardware (microcontrollers in cars, medical devices, space probes) often have less than 32KB of RAM. Unions allow the exact same bytes to be reused for different message types. Enums eliminate cryptic "magic numbers" in code, preventing errors like mistyping an error code 404.',
      howItWorks: [
        'Union Memory Footprint: sizeof(union) is simply the sizeof(largest_member). All members start at the exact same base address.',
        'Tagged Union (Discriminated Union): A common professional pattern where a struct holds an enum "tag" indicating which union field is currently valid, alongside the union itself.',
        'Enum Values: Enums start at integer 0 by default, with each subsequent name incrementing by 1, or you can assign explicit integer values.',
        'Type Punning: Historically, reading a union member different from the one written was used for bit inspection, though strict aliasing rules in modern C require care.'
      ],
      syntax: '/* Enum Definition */\ntypedef enum {\n    STATUS_DISCONNECTED,\n    STATUS_CONNECTING,\n    STATUS_ACTIVE\n} ConnectionState;\n\n/* Union Definition */\ntypedef union {\n    int integer_val;\n    float float_val;\n    char byte_val;\n} DataPayload;',
      code: `#include <stdio.h>

/* 1. Enum for discriminating state */
typedef enum {
    TYPE_INTEGER,
    TYPE_FLOAT,
    TYPE_STRING
} ValueType;

/* 2. Tagged Union (Struct containing an enum tag + union) */
typedef struct {
    ValueType type;
    union {
        int i_val;
        float f_val;
        char str_val[16];
    } payload;
} DynamicVariant;

void print_variant(const DynamicVariant *v) {
    switch (v->type) {
        case TYPE_INTEGER:
            printf("Variant holds INTEGER: %d\\n", v->payload.i_val);
            break;
        case TYPE_FLOAT:
            printf("Variant holds FLOAT:   %.3f\\n", v->payload.f_val);
            break;
        case TYPE_STRING:
            printf("Variant holds STRING:  \\"%s\\"\\n", v->payload.str_val);
            break;
    }
}

int main(void) {
    printf("--- Union Size Demonstration ---\\n");
    printf("Size of union payload: %zu bytes (size of largest member, str_val[16])\\n",
           sizeof(((DynamicVariant*)0)->payload));

    /* 3. Using Tagged Union */
    DynamicVariant v1;
    v1.type = TYPE_INTEGER;
    v1.payload.i_val = 4096;
    print_variant(&v1);

    DynamicVariant v2;
    v2.type = TYPE_FLOAT;
    v2.payload.f_val = 3.14159f;
    print_variant(&v2);

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'typedef enum { ... } ValueType;',
          explanation: 'Creates a clean enumerated type where TYPE_INTEGER = 0, TYPE_FLOAT = 1, and TYPE_STRING = 2.'
        },
        {
          lineOrToken: 'union { int i_val; float f_val; ... } payload;',
          explanation: 'All three members overlap in memory! i_val, f_val, and str_val start at the exact same byte address in RAM.'
        },
        {
          lineOrToken: 'sizeof(...) == 16 bytes',
          explanation: 'The union is 16 bytes wide because the largest member (str_val[16]) requires 16 bytes. If this were a struct, it would take 4 + 4 + 16 = 24 bytes.'
        },
        {
          lineOrToken: 'print_variant(...)',
          explanation: 'The switch inspects the enum tag to safely determine which union field to read.'
        }
      ],
      output: '--- Union Size Demonstration ---\nSize of union payload: 16 bytes (size of largest member, str_val[16])\nVariant holds INTEGER: 4096\nVariant holds FLOAT:   3.142',
      mistakes: [
        {
          mistake: 'Writing to one union field and reading from another without understanding bit representation.',
          consequence: 'Writing a float and reading it as an int reads the raw IEEE-754 mantissa/exponent bits, producing unexpected gibberish numbers.',
          solution: 'Always maintain an enum tag to remember which member was most recently written.'
        },
        {
          mistake: 'Assuming enum values are strings.',
          consequence: 'Printing an enum with printf("%s", state) crashes the program because enums are numbers (integers), not string pointers.',
          solution: 'Format enums using %d or map them with a switch to string literals.'
        }
      ],
      summary: [
        'A union overlaps all of its members in the exact same memory space.',
        'The size of a union is dictated solely by its largest member.',
        'A Tagged Union pairs an enum tag with a union for safe runtime polymorphism.',
        'Enums assign self-documenting names to integer constants.'
      ],
      questions: [
        {
          id: 'q-union-1',
          question: 'If a union contains a char (1 byte), an int (4 bytes), and a double (8 bytes), what is the minimum sizeof the union?',
          options: [
            '13 bytes (1 + 4 + 8)',
            '8 bytes (the size of the largest member)',
            '4 bytes',
            '32 bytes'
          ],
          correctIndex: 1,
          explanation: 'In a union, all members share the same memory location. The size of the union is therefore determined by the largest member (the 8-byte double).'
        },
        {
          id: 'q-union-2',
          question: 'What is the purpose of a "Tagged Union"?',
          options: [
            'To tag data for deletion.',
            'To store an enum tag alongside the union so the code knows which member is currently valid and safe to read.',
            'To connect the union to an external database.',
            'To make the union read-only.'
          ],
          correctIndex: 1,
          explanation: 'Because a union cannot remember what was last written to it, pairing it with an enum tag in a struct creates a safe, self-describing variant type.'
        }
      ]
    }
  ]
};
