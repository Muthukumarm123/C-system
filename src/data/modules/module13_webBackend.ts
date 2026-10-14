import { CourseModule } from '../../types/course';

export const module13WebBackend: CourseModule = {
  id: 'c-web-backend',
  number: 13,
  title: 'C in Web & High-Performance Backends',
  description: 'How C powers the modern web beneath higher-level runtimes: raw HTTP 1.1 protocol servers, native network microservices, event loops (epoll/kqueue), and the engineering trade-offs of manual memory vs modern web frameworks.',
  topics: [
    {
      id: 'native-http-servers',
      moduleId: 'c-web-backend',
      moduleNumber: 13,
      title: 'Building a Native HTTP Server & Network Backend in C',
      subtitle: 'Constructing an HTTP/1.1 response engine over raw TCP sockets and dissecting manual backend engineering.',
      estimatedMinutes: 30,
      tags: ['http-server', 'backend', 'web-services', 'sockets', 'epoll', 'performance'],
      interactiveMode: 'socket_flow',
      definition: 'A native C HTTP server is a backend network daemon that establishes a listening TCP socket, accepts client HTTP requests, parses the raw ASCII protocol stream (Method, URI, Headers, Body), and transmits formatted HTTP/1.1 responses over the wire.',
      simpleExplanation: 'Can you actually build a web server in C? YES! In fact, the world\'s most famous web servers (Nginx and Apache) and the fastest caching engines (Redis and Memcached) are written entirely in C!\n\nWhen a web browser connects to your C server, it literally sends a stream of plain text over the TCP socket, like:\n"GET /api/status HTTP/1.1\\r\\nHost: localhost\\r\\n\\r\\n"\n\nIn C, you read those raw bytes into a buffer, parse the path, and construct the response string with your own headers and HTML/JSON body: "HTTP/1.1 200 OK\\r\\nContent-Type: application/json...". You then call send() to push those bytes through the network card.\n\nWHY IS THIS HARDER THAN EXPRESS OR DJANGO?\nIn high-level languages like Python, JavaScript, or Go, the framework handles HTTP parsing, TLS encryption, thread pools, cookie security, and JSON serialization automatically. In C, you must write or link every single piece by hand, handle memory allocation for every request, and guard against buffer overflows on every incoming byte!',
      whyItExists: 'When millions of concurrent connections must be processed per second with sub-millisecond latency (such as high-frequency trading engines, global CDN edge nodes like Cloudflare, and video streaming backbones like Netflix), the garbage collection pauses and memory bloat of Python, Node.js, or Java become unacceptable. C gives you sub-microsecond control over raw networking hardware.',
      howItWorks: [
        'Raw Socket Setup: Creates a TCP socket, binds to port 8080, and puts it in listening mode.',
        'Accepting Connection: accept() returns a dedicated client descriptor for the incoming HTTP client.',
        'Request Reading: recv() reads the incoming HTTP request stream into a char buffer.',
        'HTTP Protocol Serialization: The C code crafts an HTTP/1.1 compliant response containing Status Line, Headers (Content-Type, Content-Length), double CRLF (\\r\\n\\r\\n), and the Response Body.',
        'Concurrency Models: Real C web backends use non-blocking I/O multiplexing: epoll (Linux) or kqueue (macOS/BSD), allowing a single operating system thread to manage over 100,000 active web connections without thread stack overhead!'
      ],
      syntax: '/* Minimal HTTP Response Format */\nconst char *http_response =\n    "HTTP/1.1 200 OK\\r\\n"\n    "Content-Type: text/plain\\r\\n"\n    "Content-Length: 13\\r\\n"\n    "Connection: close\\r\\n\\r\\n"\n    "Hello, World!";\nsend(client_fd, http_response, strlen(http_response), 0);',
      code: `#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main(void) {
    /* 1. Create TCP IPv4 Socket */
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd < 0) {
        perror("Socket creation failed");
        return 1;
    }

    /* 2. Configure address and port 8080 */
    struct sockaddr_in address;
    memset(&address, 0, sizeof(address));
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(8080);

    /* 3. Prepare HTTP/1.1 Response Payload */
    const char *json_body = "{\\"status\\":\\"online\\",\\"service\\":\\"native-c-backend\\"}";
    char response[512];
    snprintf(response, sizeof(response),
             "HTTP/1.1 200 OK\\r\\n"
             "Content-Type: application/json\\r\\n"
             "Content-Length: %zu\\r\\n"
             "Connection: close\\r\\n"
             "\\r\\n"
             "%s",
             strlen(json_body),
             json_body);

    printf("--- Native C HTTP Backend Initialized ---\\n");
    printf("1. Prepared compliant HTTP/1.1 wire protocol response:\\n\\n%s\\n\\n", response);
    printf("2. Socket descriptor %d ready for epoll / event-loop polling.\\n", server_fd);
    printf("3. C eliminates runtime virtual machine overhead, delivering near-zero latency.\\n");

    close(server_fd);
    return 0;
}`,
      codeExplanation: [
        {
          lineOrToken: 'HTTP/1.1 200 OK\\r\\n',
          explanation: 'The HTTP Status Line required by RFC 2616 / RFC 7230. Notice the mandatory Carriage Return and Line Feed (\\r\\n).'
        },
        {
          lineOrToken: 'Content-Length: %zu',
          explanation: 'Tells the receiving web browser the exact byte count of the payload so it knows when the response transmission is complete.'
        },
        {
          lineOrToken: '\\r\\n\\r\\n',
          explanation: 'The double CRLF separating HTTP header metadata from the actual response body.'
        },
        {
          lineOrToken: 'snprintf(response, sizeof(response), ...)',
          explanation: 'Safely formats the HTTP response packet into stack memory with strict bounds enforcement.'
        }
      ],
      output: '--- Native C HTTP Backend Initialized ---\n1. Prepared compliant HTTP/1.1 wire protocol response:\n\nHTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: 48\r\nConnection: close\r\n\r\n{"status":"online","service":"native-c-backend"}\n\n2. Socket descriptor 3 ready for epoll / event-loop polling.\n3. C eliminates runtime virtual machine overhead, delivering near-zero latency.',
      mistakes: [
        {
          mistake: 'Spawning a new OS thread or process for every incoming HTTP connection in C.',
          consequence: 'Thread thrashing! Under a flood of 10,000 requests, operating system thread stack memory is exhausted, bringing the server down.',
          solution: 'Use non-blocking asynchronous event loops via epoll (Linux) or libuv, exactly as Nginx and Node.js do under the hood.'
        },
        {
          mistake: 'Assuming URL strings in HTTP headers are null-terminated in the raw socket buffer.',
          consequence: 'Buffer overflow or information disclosure: raw socket buffers contain whatever bytes the client sent without a trailing \'\\0\'.',
          solution: 'Always write your own null terminator at recv_bytes index before using string functions: "buffer[bytes_read] = \'\\0\';".'
        }
      ],
      summary: [
        'C can build ultra-high-performance web servers (e.g. Nginx, Apache, Redis).',
        'HTTP is an ASCII protocol that runs over TCP streams; servers manually parse headers and format responses.',
        'Unlike high-level frameworks (Express, FastAPI, Spring), C requires manual memory management, socket handling, and bounds security.',
        'Production C servers leverage non-blocking event loops (epoll/kqueue) to handle tens of thousands of concurrent clients with minimal RAM.'
      ],
      questions: [
        {
          id: 'q-web-1',
          question: 'Why are industry-leading web servers like Nginx written in C instead of Python or Java?',
          options: [
            'Because C has prettier syntax.',
            'Because C offers deterministic memory management without garbage collection pauses, maximal CPU cache efficiency, and direct OS syscall control.',
            'Because other languages cannot use the internet.',
            'Because C programs cannot be hacked.'
          ],
          correctIndex: 1,
          explanation: 'Nginx is built in C for raw throughput and predictability. C has no garbage collection pauses, minimal memory overhead per connection, and direct access to kernel epoll sockets.'
        },
        {
          id: 'q-web-2',
          question: 'In an HTTP response, what separates the HTTP headers from the response body?',
          options: [
            'A single semicolon (;)',
            'Two consecutive carriage return line feeds ("\\r\\n\\r\\n")',
            'An asterisk (*)',
            'A null terminator ("\\0")'
          ],
          correctIndex: 1,
          explanation: 'The HTTP standard specification dictates that an empty line consisting of "\\r\\n\\r\\n" (Carriage Return + Line Feed twice) separates the header metadata from the payload body.'
        }
      ]
    }
  ]
};
