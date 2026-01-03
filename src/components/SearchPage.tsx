import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_POSTS } from '../data';
import { PostCard } from './PostCard';

export const SearchPage: React.FC = () => {
  // 1. 获取 URL 查询参数 (例如 ?q=React)
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // 2. 执行搜索逻辑 (使用 useMemo 优化性能)
  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    
    return MOCK_POSTS.filter(post => {
      // 搜索范围：标题、摘要、标签
      const inTitle = post.title.toLowerCase().includes(lowerQuery);
      const inSummary = post.summary.toLowerCase().includes(lowerQuery);
      const inTags = post.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      
      return inTitle || inSummary || inTags;
    });
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-2xl text-gray-800">
          搜索结果: <span className="font-bold text-blue-600">"{query}"</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          找到 {filteredPosts.length} 篇相关文章
        </p>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900">没有找到相关文章</h3>
          <p className="text-gray-500 mt-2">尝试更换关键词，或者去归档页看看。</p>
        </div>
      )}
    </div>
  );
};