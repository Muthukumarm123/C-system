import { CourseModule } from '../../types/course';

export const module09Files: CourseModule = {
  id: 'c-files',
  number: 9,
  title: 'File I/O Streams',
  description: 'Operating system file streams (FILE*), file open modes, reading and writing text and binary files, buffer flushing, and robust error handling with errno and perror.',
  topics: [
    {
      id: 'file-streams-text',
      moduleId: 'c-files',
      moduleNumber: 9,
      title: 'File Streams: fopen, fgets, fprintf, fclose & Text Files',
      subtitle: 'Buffered I/O, file pointers (FILE*), stream modes, and safe file traversal.',
      estimatedMinutes: 25,
      tags: ['files', 'fopen', 'fclose', 'fgets', 'fprintf', 'text-files', 'streams'],
      interactiveMode: 'memory',
      definition: 'A file stream in C is an abstraction represented by a pointer to an opaque structure type (FILE*) that encapsulates an open file descriptor, internal I/O transfer buffers, current byte position indicators, and error state flags.',
      simpleExplanation: 'When you want to save a high score or read a configuration file on your hard drive, your program cannot just send electricity to the magnetic disk or SSD chips directly. The operating system kernel manages all storage. In C, you ask the OS to open a communication pipe called a "FILE Stream". When you read or write text, C buffers the characters in RAM and flushes them to the hard drive in efficient chunks. When finished, you MUST close the stream with fclose() to ensure every byte is written to physical storage.',
      whyItExists: 'Accessing physical storage hardware is thousands of times slower than accessing RAM. Buffered streams collect many small character writes in an internal memory buffer before issuing a single, fast block write to the OS storage driver.',
      howItWorks: [
        'fopen(filename, mode): Opens the file and returns a FILE* pointer. If the file cannot be opened (e.g. missing file or permissions denied), it returns NULL.',
        'File Modes: "r" (read-only, file must exist), "w" (write-only, creates new file or truncates existing file to 0 bytes!), "a" (append to end of file).',
        'Text Reading: fgets(buffer, sizeof(buffer), stream) reads one line at a time until a newline \\n or EOF (End Of File) is reached, automatically null-terminating the string.',
        'Text Writing: fprintf(stream, format, ...) formats and writes strings directly to the file stream.',
        'fclose(stream): Flushes remaining cached bytes to disk, releases kernel file locks, and frees the FILE control block.'
      ],
      syntax: '/* Opening a file safely */\nFILE *fp = fopen("data.txt", "r");\nif (fp == NULL) {\n    perror("Failed to open file");\n    return 1;\n}\n\n/* Reading line by line */\nchar line[128];\nwhile (fgets(line, sizeof(line), fp) != NULL) {\n    printf("%s", line);\n}\n\nfclose(fp);',
      code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    const char *filepath = "app_config.txt";

    /* 1. Writing to a text file */
    FILE *write_stream = fopen(filepath, "w");
    if (write_stream == NULL) {
        perror("Error opening file for write");
        return 1;
    }

    fprintf(write_stream, "PORT=8080\\n");
    fprintf(write_stream, "ENVIRONMENT=production\\n");
    fprintf(write_stream, "MAX_CONNECTIONS=500\\n");
    fclose(write_stream); /* Flushes and saves to disk */
    printf("Successfully wrote configuration to %s\\n\\n", filepath);

    /* 2. Reading from the text file line-by-line */
    FILE *read_stream = fopen(filepath, "r");
    if (read_stream == NULL) {
        perror("Error opening file for read");
        return 1;
    }

    printf("--- Reading File Content Line-by-Line ---\\n");
    char buffer[64];
    int line_number = 1;
    while (fgets(buffer, sizeof(buffer), read_stream) != NULL) {
        printf("Line %d: %s", line_number++, buffer);
    }

    fclose(read_stream);
    printf("\\nFile closed safely.\\n");

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'fopen(filepath, "w")',
          explanation: 'Opens filepath in write mode. Warning: "w" instantly truncates any existing file of that name to zero bytes.'
        },
        {
          lineOrToken: 'fprintf(write_stream, ...)',
          explanation: 'Writes formatted text into the file stream buffer.'
        },
        {
          lineOrToken: 'fgets(buffer, sizeof(buffer), read_stream)',
          explanation: 'Reads at most sizeof(buffer)-1 characters until a newline is found. Bounded and safe from buffer overflow. Returns NULL when EOF is reached.'
        },
        {
          lineOrToken: 'fclose(...)',
          explanation: 'Guarantees any cached buffer contents are flushed down into the operating system filesystem and closes the file descriptor.'
        }
      ],
      output: 'Successfully wrote configuration to app_config.txt\n\n--- Reading File Content Line-by-Line ---\nLine 1: PORT=8080\nLine 2: ENVIRONMENT=production\nLine 3: MAX_CONNECTIONS=500\n\nFile closed safely.',
      mistakes: [
        {
          mistake: 'Forgetting to check if fopen() returned NULL before using the FILE* pointer.',
          consequence: 'Instant crash: Segmentation Fault as soon as fprintf() or fgets() tries to dereference a NULL file pointer.',
          solution: 'Always check "if (fp == NULL)" immediately after calling fopen().'
        },
        {
          mistake: 'Using feof() as a loop condition: "while (!feof(fp))".',
          consequence: 'feof() only returns true AFTER a read has already attempted and failed past the end of the file. This causes the loop to process the last line twice!',
          solution: 'Always test the return value of the read function itself: "while (fgets(...) != NULL)".'
        }
      ],
      summary: [
        'FILE* is a pointer to an internal stream structure managing buffers and status.',
        'Always check if fopen() returns NULL to catch missing files or permission errors.',
        'Use fgets() for reading text lines safely with strict buffer bounds.',
        'Always close files with fclose() to prevent data loss from unwritten stream buffers.'
      ],
      questions: [
        {
          id: 'q-file-1',
          question: 'What happens if you open an existing file using mode "w"?',
          options: [
            'It reads the file from the start.',
            'It appends new text to the end.',
            'It immediately erases (truncates) the existing file content to 0 bytes.',
            'It prompts the user for confirmation.'
          ],
          correctIndex: 2,
          explanation: 'The "w" mode creates a new file or completely truncates (wipes) an existing file to length 0. To add data without erasing, use append mode "a".'
        },
        {
          id: 'q-file-2',
          question: 'Why should you NOT use "while (!feof(fp))" as your read loop condition?',
          options: [
            'feof does not exist in C.',
            'feof only sets its flag after a read operation has already failed past the end, causing the loop body to execute one extra duplicate time.',
            'It slows down disk reading.',
            'It deletes the file upon exit.'
          ],
          correctIndex: 1,
          explanation: 'feof(fp) does not predict the future; it only reports that a previous read tried to read past EOF. Checking it as the loop condition leads to processing stale or corrupted data on the final iteration.'
        }
      ]
    },
    {
      id: 'binary-files-error-handling',
      moduleId: 'c-files',
      moduleNumber: 9,
      title: 'Binary Files: fread, fwrite & Error Handling with errno and perror',
      subtitle: 'Serializing raw struct byte structures to disk and diagnosing operating system error codes.',
      estimatedMinutes: 25,
      tags: ['binary-files', 'fread', 'fwrite', 'errno', 'perror', 'serialization'],
      interactiveMode: 'memory',
      definition: 'Binary file I/O is the direct transfer of unformatted, raw byte sequences between computer RAM and storage without ASCII character translation, using fread() and fwrite().',
      simpleExplanation: 'Text files store numbers as human characters (the number 12345678 takes 8 bytes of ASCII text). But inside RAM, that number is a single 4-byte integer! Storing data as text requires slow conversion (number to text when saving, text to number when loading). In a binary file, you write the exact raw 4 bytes of memory straight to the hard drive in a split second! If an error occurs, the operating system sets a global integer called "errno" (like file not found or permission denied), and perror() prints the exact English description of the failure.',
      whyItExists: 'Databases, game save files, audio recordings, and compiled binaries require compact storage and instantaneous load times. Binary serialization allows raw struct memories to be dumped directly to disk at bus transfer speeds.',
      howItWorks: [
        'Binary Modes: "rb" (read binary), "wb" (write binary), "ab" (append binary). On Windows, this disables automatic \\r\\n translation.',
        'fwrite(ptr, size, count, stream): Writes "count" blocks of "size" bytes directly from RAM at address ptr to the file stream. Returns the number of items successfully written.',
        'fread(ptr, size, count, stream): Reads "count" blocks of "size" bytes from the file stream directly into RAM at address ptr.',
        'errno: A global thread-local integer defined in <errno.h> that holds the error code of the last failed system call (e.g. ENOENT = No such file, EACCES = Permission denied).',
        'perror(prefix): Prints your custom string followed by the OS explanation corresponding to the current errno value.'
      ],
      syntax: '/* Binary Write */\nsize_t written = fwrite(&data, sizeof(data), 1, fp);\n\n/* Binary Read */\nsize_t read_items = fread(&data, sizeof(data), 1, fp);\n\n/* Error reporting */\nif (read_items < 1) {\n    if (ferror(fp)) perror("Read error occurred");\n}',
      code: `#include <stdio.h>
#include <stdlib.h>
#include <errno.h>

typedef struct {
    int player_id;
    int score;
    float coordinates[3];
} GameSaveState;

int main(void) {
    const char *save_file = "savegame.bin";

    GameSaveState original_state = {
        .player_id = 991,
        .score = 15420,
        .coordinates = {100.5f, 25.0f, -42.8f}
    };

    /* 1. Write raw binary struct directly to disk */
    FILE *out = fopen(save_file, "wb");
    if (!out) {
        perror("Failed to open binary save file");
        return 1;
    }

    size_t items_written = fwrite(&original_state, sizeof(GameSaveState), 1, out);
    fclose(out);
    printf("Wrote %zu GameSaveState record (%zu bytes) to %s\\n", 
           items_written, sizeof(GameSaveState), save_file);

    /* 2. Read raw binary struct back into a fresh struct */
    GameSaveState loaded_state;
    FILE *in = fopen(save_file, "rb");
    if (!in) {
        perror("Failed to open save file for reading");
        return 1;
    }

    size_t items_read = fread(&loaded_state, sizeof(GameSaveState), 1, in);
    fclose(in);

    if (items_read == 1) {
        printf("\\n--- Loaded State from Binary Storage ---\\n");
        printf("Player ID: %d\\n", loaded_state.player_id);
        printf("Score:     %d\\n", loaded_state.score);
        printf("Coords:    (%.1f, %.1f, %.1f)\\n",
               loaded_state.coordinates[0],
               loaded_state.coordinates[1],
               loaded_state.coordinates[2]);
    }

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'fopen(save_file, "wb")',
          explanation: '"wb" opens the file for writing in binary mode. In binary mode, bytes are written raw without any OS newline conversions.'
        },
        {
          lineOrToken: 'fwrite(&original_state, sizeof(GameSaveState), 1, out)',
          explanation: 'Writes the exact memory footprint of original_state (typically 20 bytes) straight to disk in a single I/O operation.'
        },
        {
          lineOrToken: 'fread(&loaded_state, sizeof(GameSaveState), 1, in)',
          explanation: 'Reads the 20 raw bytes from disk directly into loaded_state in RAM, restoring the complete object state instantly.'
        },
        {
          lineOrToken: 'perror(...)',
          explanation: 'Translates the system errno integer into a readable message (e.g. "Permission denied" or "No such file or directory").'
        }
      ],
      output: 'Wrote 1 GameSaveState record (20 bytes) to savegame.bin\n\n--- Loaded State from Binary Storage ---\nPlayer ID: 991\nScore:     15420\nCoords:    (100.5, 25.0, -42.8)',
      mistakes: [
        {
          mistake: 'Writing structs containing raw pointers directly to binary files with fwrite().',
          consequence: 'Pointers store RAM addresses! Saving a pointer to disk saves a transient memory address. When loaded tomorrow or on another computer, that address points to invalid memory or crashes.',
          solution: 'Never serialize pointers directly. Serialize the actual data elements pointed to (deep serialization).'
        },
        {
          mistake: 'Ignoring endianness when sharing binary files between different CPU architectures (e.g. x86 little-endian vs network big-endian).',
          consequence: 'Integers are read in reverse byte order, turning 1 into 16,777,216.',
          solution: 'Use standard byte-order conversion functions like htonl() / ntohl() when serializing multi-byte values across architectures.'
        }
      ],
      summary: [
        'Binary I/O transfers raw byte sequences directly between RAM and storage without character translation.',
        'fread() and fwrite() process memory blocks defined by element size and count.',
        'Never write raw pointer addresses to disk: serialize the underlying data instead.',
        'errno holds operating system error codes; perror() displays human-readable explanations.'
      ],
      questions: [
        {
          id: 'q-bin-1',
          question: 'Why should you NEVER write a struct containing pointer members directly to a binary file using fwrite()?',
          options: [
            'Because fwrite only works with strings.',
            'Because pointers hold transient RAM addresses that are meaningless and invalid once the program exits or runs on another computer.',
            'Because pointers take up too much disk space.',
            'Because compilers do not allow it.'
          ],
          correctIndex: 1,
          explanation: 'A pointer is just a temporary memory address in your current process virtual memory. Saving it to disk saves an address that will be invalid when loaded in another session, leading to crashes.'
        },
        {
          id: 'q-bin-2',
          question: 'What does the function perror("Network error") output if errno is set to ENOENT (file not found)?',
          options: [
            'It terminates the program immediately.',
            'It prints "Network error: No such file or directory" to stderr.',
            'It creates a new file.',
            'It prints the number 0.'
          ],
          correctIndex: 1,
          explanation: 'perror prints your custom prefix followed by a colon and the standard textual description corresponding to the current value of errno.'
        }
      ]
    }
  ]
};
