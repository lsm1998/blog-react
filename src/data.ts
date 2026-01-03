import type { Article, Tag, UserProfile, PaginatedResponse } from './types';

export const MOCK_Articles: Article[] = [
  {
    id: 1,
    title: "深入理解 C++20 Coroutines",
    summary: "C++20 引入的协程机制彻底改变了异步编程的方式...",
    date: "2025-12-15",
    tagNames: ["C++", "System"],
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
  {
    id: 2,
    title: "从零实现 TCP/IP 协议栈：ARP 协议",
    summary: "在 tiny-net 项目中，我们首先需要解决的是地址解析问题。",
    date: "2025-12-10",
    tagNames: ["Network", "C"],
    content: "# ARP 协议实现\n\nTODO: 补充详细内容..."
  }
];

export const MOCK_Tags: Tag[] = [
  { name: "C++", count: 10 },
  { name: "C", count: 8 },
  { name: "System", count: 5 },
  { name: "Network", count: 7 },
  { name: "JavaScript", count: 12 },
];

export const MOCK_User: UserProfile = {
  username: "tech_writer",
  description: "专注于系统编程与网络技术的技术博主",
  headshot: "/images/headshot.png",
  position: "高级软件工程师",
  bio: "拥有10年以上C/C++开发经验，热衷于分享技术知识。",
  email: "test@gmail.com",
  github: "",
  techStack: ["C++", "C", "JavaScript", "Linux", "Networking"]
}

export const MOCK_Article_Page: PaginatedResponse<Article> = {
  list: MOCK_Articles,
  total: MOCK_Articles.length
}