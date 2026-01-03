import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MOCK_POSTS } from '../data';
import { PostCard } from './PostCard';

export const Tags: React.FC = () => {
  // 从 URL 中获取当前选中的标签 (例如 /tags/React 中的 "React")
  const { tag: activeTag } = useParams<{ tag: string }>();

  // 1. 计算所有标签及其出现次数 (Memo 优化性能)
  const tagData = useMemo(() => {
    const counts: Record<string, number> = {};
    MOCK_POSTS.forEach(post => {
      post.tags.forEach(t => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    // 转换为数组并按数量排序
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  // 2. 根据当前 URL 参数筛选文章
  const filteredPosts = activeTag 
    ? MOCK_POSTS.filter(post => post.tags.includes(activeTag))
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 顶部：标签云区域 */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">标签索引</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {tagData.map(([tagName, count]) => {
            const isActive = tagName === activeTag;
            return (
              <Link
                key={tagName}
                to={`/tags/${tagName}`}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                    : 'bg-white dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 text-gray-600 border border-gray-200 hover:border-blue-400 hover:text-blue-500 hover:shadow-sm'
                  }
                `}
              >
                {tagName}
                <span className={`ml-2 text-xs ${isActive ? 'text-blue-200' : 'text-gray-400'}`}>
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 底部：筛选结果列表 */}
      {activeTag ? (
        <div className="animate-fade-in">
          <div className="flex items-center mb-6 pb-2 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              包含 <span className="text-blue-600">#{activeTag}</span> 的文章
            </h2>
            <Link to="/tags" className="ml-auto text-sm text-gray-500 hover:text-red-500">
              清除筛选 ✕
            </Link>
          </div>
          
          <div className="space-y-6">
            {filteredPosts.map(post => (
              // 复用之前的 PostCard 组件
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12 italic border-t border-gray-100">
          请点击上方标签查看相关文章
        </div>
      )}
    </div>
  );
};