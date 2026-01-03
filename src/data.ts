import type { BlogPost } from './types';

export const MOCK_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "深入理解 C++20 Coroutines",
    summary: "C++20 引入的协程机制彻底改变了异步编程的方式...",
    date: "2025-12-15",
    tags: ["C++", "System"],
    content: `
## 为什么需要协程？

在 C++20 之前，我们通常使用回调或者 \`std::future\` 来处理异步任务。

### 代码示例

下面是一个简单的 Generator 实现：

\`\`\`cpp
#include <coroutine>
#include <iostream>

struct Generator {
    struct promise_type {
        int current_value;
        Generator get_return_object() { return Generator{std::coroutine_handle<promise_type>::from_promise(*this)}; }
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        std::suspend_always yield_value(int value) {
            current_value = value;
            return {};
        }
        void return_void() {}
        void unhandled_exception() { std::exit(1); }
    };

    std::coroutine_handle<promise_type> handle;
    
    // 构造函数
    Generator(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~Generator() { if (handle) handle.destroy(); }
    
    bool move_next() {
        handle.resume();
        return !handle.done();
    }
    int current_value() { return handle.promise().current_value; }
};
\`\`\`
    `
  },
  // 你可以复制上面这个结构补充其他文章...
  {
    id: 2,
    title: "从零实现 TCP/IP 协议栈：ARP 协议",
    summary: "在 tiny-net 项目中，我们首先需要解决的是地址解析问题。",
    date: "2025-12-10",
    tags: ["Network", "C"],
    content: "# ARP 协议实现\n\nTODO: 补充详细内容..."
  }
];