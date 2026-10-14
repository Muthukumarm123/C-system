import { CourseModule } from '../../types/course';

export const module11Systems: CourseModule = {
  id: 'c-systems',
  number: 11,
  title: 'Systems Programming & OS Interfaces',
  description: 'Uncover the boundary between user code and the OS kernel: processes, virtual memory, system calls (fork, exec, read, write), static vs dynamic libraries (.a vs .so), and Berkeley BSD TCP sockets.',
  topics: [
    {
      id: 'processes-system-calls',
      moduleId: 'c-systems',
      moduleNumber: 11,
      title: 'Kernel Mode, Processes & POSIX System Calls',
      subtitle: 'The hardware privilege boundary, context switches, and requesting OS services.',
      estimatedMinutes: 30,
      tags: ['kernel', 'user-mode', 'system-calls', 'posix', 'fork', 'exec', 'processes'],
      interactiveMode: 'memory',
      definition: 'A system call (syscall) is the programmatic mechanism by which an application executing in unprivileged User Mode (Ring 3) requests a privileged hardware or OS service from the Operating System Kernel executing in Supervisor Mode (Ring 0).',
      simpleExplanation: 'Your computer CPU has security rings. Your user application runs in "Ring 3" (unprivileged). It is forbidden from directly touching hard drive heads, network cards, or screen pixels. If it tried, the CPU would halt it with a hardware exception! The only entity allowed to touch physical hardware is the Operating System Kernel ("Ring 0"). When you want to print to the screen or read a file, your code issues a "System Call". The CPU switches from User Mode to Kernel Mode, the OS does the work securely, and then switches back to User Mode.',
      whyItExists: 'Without hardware rings and system calls, any buggy or malicious program could read passwords directly from another program memory or overwrite the operating system bootloader.',
      howItWorks: [
        'Hardware Privilege Levels: x86/ARM CPUs enforce Ring 3 (User) vs Ring 0 (Kernel).',
        'Syscall Instruction: An application loads the syscall number into a CPU register (e.g. RAX) and executes a CPU instruction ("syscall" on x86-64 or "svc" on ARM).',
        'Kernel Context Switch: The CPU saves registers, enters Kernel Mode, verifies the request, performs the hardware operation, and switches back.',
        'fork() & exec(): Under POSIX, fork() duplicates the calling process (creating a child process with Copy-On-Write virtual memory). execve() replaces the current process image with a new binary executable.'
      ],
      syntax: '/* POSIX low-level write system call */\n#include <unistd.h>\nssize_t bytes_written = write(int file_descriptor, const void *buf, size_t count);\n\n/* Forking a child process */\npid_t pid = fork();\nif (pid == 0) {\n    /* Child process */\n} else if (pid > 0) {\n    /* Parent process */\n}',
      code: `#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main(void) {
    /* 1. Direct POSIX System Call: write() bypassing C stdio buffers */
    const char msg[] = "Direct POSIX write() system call to STDOUT (FD 1)\\n";
    write(1, msg, sizeof(msg) - 1);

    /* 2. Process Identification System Calls */
    pid_t current_pid = getpid();
    pid_t parent_pid = getppid();

    printf("Current Process ID (PID): %d\\n", (int)current_pid);
    printf("Parent Process ID  (PPID): %d\\n", (int)parent_pid);

    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'write(1, msg, sizeof(msg) - 1)',
          explanation: 'Low-level POSIX system call. File Descriptor 1 is Standard Output (STDOUT). Unlike printf(), write() does not buffer in user space—it immediately triggers a kernel context switch.'
        },
        {
          lineOrToken: 'getpid() and getppid()',
          explanation: 'System calls querying the OS process scheduler for the process ID of this running program and its parent process.'
        }
      ],
      output: 'Direct POSIX write() system call to STDOUT (FD 1)\nCurrent Process ID (PID): 4128\nParent Process ID  (PPID): 1802',
      mistakes: [
        {
          mistake: 'Assuming system calls are as fast as regular C function calls.',
          consequence: 'Calling write() or read() for 1 single byte in a tight loop of a million iterations causes a million CPU ring transitions, slowing execution down by 1,000x.',
          solution: 'Use buffered standard library functions (like fwrite or printf) or batch data into larger buffers before issuing syscalls.'
        },
        {
          mistake: 'Failing to check return values of system calls for error code -1.',
          consequence: 'Silent failures when files are locked, disks are full, or network cables are unplugged.',
          solution: 'Always check if (bytes_written == -1) and inspect errno.'
        }
      ],
      summary: [
        'User Mode (Ring 3) isolates applications; Kernel Mode (Ring 0) manages hardware.',
        'System calls bridge the privilege boundary between user applications and the kernel.',
        'File descriptors (0 = stdin, 1 = stdout, 2 = stderr) are integer handles managed by the kernel table.',
        'System calls incur context switch overhead; buffer data whenever possible.'
      ],
      questions: [
        {
          id: 'q-sys-1',
          question: 'What is the purpose of CPU privilege rings (User Mode Ring 3 vs Kernel Mode Ring 0)?',
          options: [
            'To make the CPU spin faster.',
            'To prevent user applications from directly corrupting hardware or spying on other processes\' memory.',
            'To allow only one program to run at a time.',
            'To compress memory files.'
          ],
          correctIndex: 1,
          explanation: 'Hardware privilege separation prevents unprivileged user code from directly touching memory or hardware registers belonging to other programs or the OS kernel.'
        },
        {
          id: 'q-sys-2',
          question: 'What is a "File Descriptor" in POSIX systems programming?',
          options: [
            'A text file with instructions.',
            'A low-level integer index used by the kernel to track an open file or network socket for a process.',
            'A compiler setting.',
            'A type of hard drive.'
          ],
          correctIndex: 1,
          explanation: 'A file descriptor is a non-negative integer representing an open I/O channel (file, pipe, network socket) in the per-process kernel file descriptor table.'
        }
      ]
    },
    {
      id: 'networking-berkeley-sockets',
      moduleId: 'c-systems',
      moduleNumber: 11,
      title: 'Networking & Berkeley Sockets: Building a Native TCP Server',
      subtitle: 'Raw internet sockets, socket lifecycle (socket, bind, listen, accept), and binary network protocols.',
      estimatedMinutes: 30,
      tags: ['networking', 'sockets', 'tcp', 'http', 'servers', 'posix'],
      interactiveMode: 'socket_flow',
      definition: 'A Berkeley Socket is an abstraction provided by POSIX operating systems that treats a two-way network communication endpoint across the internet as a standard file descriptor, using socket(), bind(), listen(), accept(), connect(), and send()/recv().',
      simpleExplanation: 'How does a web server written in C actually talk to the internet? Everything in Unix is treated like a file! A network socket is simply an endpoint created by the OS kernel that connects to a network card. For a server, the process is always a 5-step ritual:\n1. socket(): Ask the OS to create an internet socket.\n2. bind(): Attach the socket to a port number (like port 8080).\n3. listen(): Put the socket into listening mode for incoming callers.\n4. accept(): Pick up the phone when a client connects, which returns a brand new socket dedicated to that client!\n5. recv() & send(): Read the request and send back the response!',
      whyItExists: 'Every major web server (Nginx, Apache), database (PostgreSQL, MySQL), and messaging broker (Redis) is written in C using raw Berkeley sockets. Understanding this protocol flow reveals how the entire internet functions beneath web frameworks.',
      howItWorks: [
        'Socket Creation: socket(AF_INET, SOCK_STREAM, 0) requests an IPv4 TCP stream socket.',
        'Address Binding: struct sockaddr_in binds the IP (INADDR_ANY) and port (htons(port)) to the socket.',
        'Endianness (Network Byte Order): Internet protocols mandate Big-Endian format. x86 CPUs use Little-Endian. Functions like htons() (Host To Network Short) and ntohl() flip the bytes to match international standards.',
        'accept(): Blocks until an incoming TCP 3-way handshake (SYN, SYN-ACK, ACK) completes, returning a new client socket descriptor.'
      ],
      syntax: '/* TCP Server Lifecycle */\nint server_fd = socket(AF_INET, SOCK_STREAM, 0);\nbind(server_fd, (struct sockaddr*)&server_addr, sizeof(server_addr));\nlisten(server_fd, 10);\nint client_fd = accept(server_fd, NULL, NULL);\nsend(client_fd, response, strlen(response), 0);\nclose(client_fd);',
      code: `#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main(void) {
    /* 1. Create IPv4 TCP socket */
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd < 0) {
        perror("Socket creation failed");
        return 1;
    }

    /* 2. Configure server address structure */
    struct sockaddr_in address;
    memset(&address, 0, sizeof(address));
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;      /* Bind to all local interfaces */
    address.sin_port = htons(8080);            /* Port 8080 in network byte order */

    printf("--- Berkeley TCP Socket Lifecycle Initialized ---\\n");
    printf("1. Socket Descriptor created: %d\\n", server_fd);
    printf("2. Port 8080 converted to Network Byte Order (Big-Endian): %d\\n", address.sin_port);
    printf("3. Server ready for bind(), listen(), accept() lifecycle.\\n");

    /* Clean up socket */
    close(server_fd);
    printf("4. Socket closed successfully.\\n");
    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'socket(AF_INET, SOCK_STREAM, 0)',
          explanation: 'AF_INET specifies IPv4 address family. SOCK_STREAM requests a reliable, connection-oriented TCP stream.'
        },
        {
          lineOrToken: 'htons(8080)',
          explanation: 'Host-TO-Network-Short. Translates the 16-bit port number from CPU host byte order (little-endian on x86) to network byte order (big-endian).'
        },
        {
          lineOrToken: 'close(server_fd)',
          explanation: 'Releases the socket file descriptor back to the operating system.'
        }
      ],
      output: '--- Berkeley TCP Socket Lifecycle Initialized ---\n1. Socket Descriptor created: 3\n2. Port 8080 converted to Network Byte Order (Big-Endian): 36895\n3. Server ready for bind(), listen(), accept() lifecycle.\n4. Socket closed successfully.',
      mistakes: [
        {
          mistake: 'Forgetting to convert port numbers with htons().',
          consequence: 'Byte order inversion! On an x86 PC, port 8080 (0x1F90) becomes port 36895 (0x901F), causing your server to listen on the completely wrong port.',
          solution: 'Always use htons() for 16-bit ports and htonl() for 32-bit IPv4 addresses.'
        },
        {
          mistake: 'Failing to set SO_REUSEADDR option with setsockopt().',
          consequence: 'If the server restarts quickly, bind() fails with "Address already in use" because TCP connections linger in TIME_WAIT state for 60 seconds.',
          solution: 'Enable setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt)).'
        }
      ],
      summary: [
        'Berkeley Sockets expose network connections as standard file descriptors.',
        'TCP Server ritual: socket() → bind() → listen() → accept() → send()/recv() → close().',
        'Always convert multi-byte values to Network Byte Order (Big-Endian) using htons/htonl.',
        'High-performance servers (Nginx, Redis) run on non-blocking event loops using epoll/kqueue.'
      ],
      questions: [
        {
          id: 'q-net-1',
          question: 'Why must you use the "htons()" function when assigning a port number to a sockaddr_in struct?',
          options: [
            'To encrypt the port number.',
            'To convert the port number from host byte order (Little-Endian on x86) to network byte order (Big-Endian).',
            'To check if the port is open.',
            'Because ports must be strings.'
          ],
          correctIndex: 1,
          explanation: 'TCP/IP network protocols mandate Big-Endian byte ordering. htons() (Host To Network Short) converts integers to the required network byte order across architectures.'
        },
        {
          id: 'q-net-2',
          question: 'In a TCP server, what does the "accept()" function return upon a successful client connection?',
          options: [
            'The client\'s IP address as a string.',
            'A brand-new socket file descriptor dedicated exclusively to communicating with that specific client.',
            'The number of bytes in the request.',
            'A pointer to main().'
          ],
          correctIndex: 1,
          explanation: 'accept() creates and returns a brand-new socket descriptor for the connected client, leaving the original listening server socket free to accept subsequent incoming clients.'
        }
      ]
    }
  ]
};
