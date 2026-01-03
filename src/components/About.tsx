import React from 'react';
import { useFetch } from '../hooks/useFetch';
import type { UserProfile } from '../types';
import { LoadingState, ErrorState } from './Status';

export const About: React.FC = () => {
  const { data: userProfile, loading, error } = useFetch<UserProfile>('/api/user/lsm1998');

  if (loading) {
    return <LoadingState message="正在加载信息..." />;
  }

  if (error || !userProfile) {
    return <ErrorState message={error || "无法加载用户信息"} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="prose prose-lg prose-blue mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

        <div className="flex flex-col items-center mb-8 not-prose">
          <img
            src={userProfile.headshot}
            alt="Avatar"
            className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover ring-4 ring-gray-50 dark:ring-gray-700"
          />
          <h1 className="text-3xl font-bold text-gray-800">About Me</h1>
          <p className="text-gray-500 mt-2">{userProfile.position}</p>
        </div>


        {/* 渲染html富文本 */}
        <div dangerouslySetInnerHTML={{ __html: userProfile.description }} />


        <h3>技术栈</h3>
        <ul>
          <li><strong>Languages:</strong> C/C++ (Modern C++), Go, Rust (Learning)</li>
          <li><strong>Frontend:</strong> React, Tailwind CSS (Just enough to build this blog)</li>
          <li><strong>Infrastructure:</strong> Docker, Kubernetes, Linux Kernel</li>
        </ul>

        <h3>联系方式</h3>
        <p>
          如果你对我的博客内容感兴趣，或者有任何技术问题想要探讨，欢迎通过邮件联系我：
          <a href={`mailto:${userProfile.email}`}>{userProfile.email}</a>
        </p>

        <blockquote>
          "Talk is cheap. Show me the code." — Linus Torvalds
        </blockquote>
      </div>
    </div>
  );
};