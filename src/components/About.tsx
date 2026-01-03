import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="prose prose-lg prose-blue mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* 头像区域 */}
        <div className="flex flex-col items-center mb-8 not-prose">
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 shadow-inner"></div>
            <h1 className="text-3xl font-bold text-gray-800">关于我</h1>
            <p className="text-gray-500 mt-2">后端开发工程师 / 轮子制造者</p>
        </div>

        <p>
          你好！我是 <strong>MyName</strong>，一名专注于高性能服务端开发的程序员。
          目前主要使用 C++ 和 Go 语言，对操作系统原理、网络协议栈以及分布式存储系统有浓厚兴趣。
        </p>

        <h3>技术栈</h3>
        <ul>
          <li><strong>Languages:</strong> C/C++ (Modern C++), Go, Rust (Learning)</li>
          <li><strong>Frontend:</strong> React, Tailwind CSS (Just enough to build this blog)</li>
          <li><strong>Infrastructure:</strong> Docker, Kubernetes, Linux Kernel</li>
        </ul>

        <h3>联系方式</h3>
        <p>
          如果你对我的博客内容感兴趣，或者有任何技术问题想要探讨，欢迎通过邮件联系我：
          <a href="mailto:example@email.com">example@email.com</a>
        </p>

        <blockquote>
          "Talk is cheap. Show me the code." — Linus Torvalds
        </blockquote>

      </div>
    </div>
  );
};