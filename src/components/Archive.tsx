import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_POSTS } from '../data';
import type { BlogPost } from '../types';

export const Archive: React.FC = () => {
  // 1. 按年份分组数据 (类似 SQL 的 GROUP BY)
  const postsByYear = MOCK_POSTS.reduce((acc, post) => {
    const year = post.date.split('-')[0]; // 假设日期格式 YYYY-MM-DD
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, BlogPost[]>);

  // 2. 获取所有年份并倒序排列 (2026, 2025...)
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
        文章归档
      </h1>

      <div className="space-y-12">
        {years.map(year => (
          <div key={year}>
            <h2 className="text-2xl font-bold text-gray-400 mb-6 flex items-center">
              <span className="mr-4 text-4xl opacity-20 italic">{year}</span>
              <span className="h-px bg-gray-200 flex-grow"></span>
            </h2>
            
            <ul className="space-y-4">
              {postsByYear[year].map(post => (
                <li key={post.id} className="flex flex-col sm:flex-row sm:items-baseline gap-2 group">
                  <span className="text-gray-400 font-mono text-sm w-32 flex-shrink-0">
                    {post.date}
                  </span>
                  <Link 
                    to={`/post/${post.id}`} 
                    className="text-lg text-gray-700 hover:text-blue-600 hover:underline transition-colors font-medium truncate"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};