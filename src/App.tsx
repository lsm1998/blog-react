import { useState } from 'react';
import { Header } from './components/Header';
import { PostCard } from './components/PostCard';
import type { BlogPost } from './types';

// 模拟后端返回的数据
const MOCK_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "深入理解 C++20 Coroutines",
    summary: "C++20 引入的协程机制彻底改变了异步编程的方式。本文将从底层原理出发，探讨 co_await, co_yield 的实现细节以及与 Go Goroutine 的区别。",
    date: "2025-12-15",
    tags: ["C++", "System"]
  },
  {
    id: 2,
    title: "从零实现 TCP/IP 协议栈：ARP 协议",
    summary: "在 tiny-net 项目中，我们首先需要解决的是地址解析问题。本文记录了如何解析以太网帧并处理 ARP 请求。",
    date: "2025-12-10",
    tags: ["Network", "C"]
  },
  {
    id: 3,
    title: "React vs Vue: 为什么我选择 React",
    summary: "作为一个长期写后端的程序员，React 的单向数据流和 JSX 这种 All-in-JS 的理念更符合我的工程直觉。",
    date: "2026-01-02",
    tags: ["Frontend", "React"]
  }
];

function App() {
  const [posts] = useState<BlogPost[]>(MOCK_POSTS);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. 顶部导航 */}
      <Header />

      {/* 2. 主体内容区域 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
            
          {/* 左侧：文章列表 (占据 70% 宽度) */}
          <div className="md:w-3/4">
             <h1 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">
                最新文章
             </h1>
             <div>
               {posts.map(post => (
                 <PostCard key={post.id} post={post} />
               ))}
             </div>
          </div>

          {/* 右侧：侧边栏 (占据 30% 宽度) - 类似于 GitHub 的 Profile 侧边栏 */}
          <div className="md:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 mx-auto"></div>
                <h3 className="text-center font-bold text-lg">lsm1998</h3>
                <p className="text-gray-500 text-sm text-center mt-2">
                    C++ / Go / System Programming. <br/> Making wheels is fun.
                </p>
                <div className="mt-6 border-t pt-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Projects</h4>
                    <ul className="text-sm space-y-2">
                        <li><a href="#" className="text-blue-600 hover:underline">cppkit</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">tiny-net</a></li>
                    </ul>
                </div>
            </div>
          </div>

        </div>
      </main>
      
      {/* 3. 页脚 */}
      <footer className="bg-white border-t mt-12 py-8 text-center text-gray-400 text-sm">
        © 2026 lsm1998 Blog. Built with React & Tailwind.
      </footer>
    </div>
  );
}

export default App;