# Mastering C: Complete Systems Programming Course

A zero-assumptions, deeply descriptive, concept-first C programming course and interactive systems laboratory. Designed for learners with zero prior programming knowledge, covering everything from hardware memory and physical byte addresses to compiler internals, pointers, data structures, cybersecurity, POSIX system calls, and network servers.

---

## 🚀 How to Publish to GitHub Pages

This repository is already pre-configured for **GitHub Pages** with automated CI/CD deployment via GitHub Actions and relative asset paths (`base: './'`).

### Quick Setup (3 Steps):

1. **Push this repository to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Complete C Programming Course"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages in your repository settings**:
   - Go to your repository on GitHub.
   - Click **Settings** (gear icon) → **Pages** (in the left sidebar under "Code and automation").
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.

3. **Enjoy your live website!**:
   - The included workflow file (`.github/workflows/deploy.yml`) will automatically trigger on push to `main`.
   - Your site will be live at:
     ```
     https://<your-username>.github.io/<your-repo-name>/
     ```

---

## 💻 Local Development

To run the application locally on your machine:

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (runs on http://localhost:3000)
npm run dev

# 3. Build for production (outputs to ./dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## 📚 Curriculum Structure

Every major concept strictly follows the 11-step pedagogical sequence:

$$\text{DEFINITION} \to \text{SIMPLE EXPLANATION} \to \text{WHY IT EXISTS} \to \text{HOW IT WORKS} \to \text{SYNTAX} \to \text{CODE} \to \text{CODE EXPLANATION} \to \text{OUTPUT} \to \text{MISTAKES} \to \text{SUMMARY} \to \text{QUESTIONS}$$

### Modules:
1. **Setup and Compilation**: What C is, GCC/Clang/MSVC, Linux/macOS/Windows setup, warnings (`-Wall -Wextra -Werror`), headers vs source files, and the full 6-stage journey from Source to Executable.
2. **C Fundamentals**: Program structure, `main()`, variables, memory cells, data types (`int`, `float`, `char`), constants, operators, expressions, type conversion, scope, and storage duration.
3. **Control Flow**: Conditional branching (`if`, `else`, `switch`), jump tables, loops (`for`, `while`, `do-while`), and loop control statements (`break`, `continue`).
4. **Functions**: Function declarations, prototypes, parameters vs arguments, pass-by-value semantics, call stack frames, recursion termination, and function pointers.
5. **Arrays and Strings**: Contiguous memory layout, index math, multidimensional arrays, character arrays, strings, the null terminator byte (`\0`), standard string functions, and buffer limits.
6. **Pointers (Concept-First & In-Depth)**: Memory addresses, pointer variables, address-of (`&`), dereferencing (`*`), 64-bit sizing, pointer arithmetic, struct pointers (`->`), pointer-to-pointer (`**`), NULL, dangling, and wild pointers.
7. **Memory Architecture & Dynamic Allocation**: Virtual memory (Stack, Heap, Data/BSS, Text), struct padding and alignment, `malloc`, `calloc`, `realloc`, `free`, memory leaks, use-after-free, buffer overflows, and double free traps.
8. **Structures, Unions & Enums**: Heterogeneous records (`struct`), `typedef` aliases, designated initializers, memory-overlapping `union`, Tagged Unions, and self-documenting `enum` types.
9. **File I/O Streams**: Buffered `FILE*` streams, file access modes, reading (`fgets`), writing (`fprintf`), binary serialization (`fread`/`fwrite`), and error reporting via `errno` and `perror`.
10. **Data Structures & Complexity**: Amortized dynamic arrays, singly and doubly linked lists, LIFO stacks, FIFO queues, binary search trees, hash tables with collision chaining, and Big-O complexity analysis.
11. **Systems & Sockets**: Kernel Mode (Ring 0) vs User Mode (Ring 3), process creation (`fork`/`exec`), POSIX system calls (`read`/`write`), static vs shared libraries, and Berkeley TCP sockets.
12. **Defensive C Cybersecurity**: Buffer overflows, return address overwriting, stack canaries, ASLR, DEP/NX, integer wraparound exploits, AddressSanitizer (`-fsanitize=address`), UBSan, and static analysis.
13. **C in Web & High-Performance Backends**: Native HTTP/1.1 wire protocol servers over raw sockets, event-driven loops (`epoll`/`kqueue`), and manual memory management trade-offs vs high-level frameworks.

---

## 🛠️ Built With

- **React 19** + **TypeScript**
- **Vite 8** (with relative asset path configuration)
- **Tailwind CSS v4**
- **Lucide Icons**
- **GitHub Actions** CI/CD pipeline
