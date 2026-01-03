import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PostCard } from './PostCard';
import { useFetch } from '../hooks/useFetch';
import { LoadingState, ErrorState } from './Status';
import type { Article, PaginatedResponse } from '../types';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data, loading, error } = useFetch<PaginatedResponse<Article>>(
    '/api/article?page=1&pageSize=50&keyword=' + encodeURIComponent(query),
    [query]
  );

  if (loading) return <LoadingState message="正在搜索文章库..." />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  const searchResults = data?.list || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10 border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          搜索结果: <span className="text-blue-600 dark:text-blue-400">"{query}"</span>
        </h1>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-gray-500 text-sm">
            找到 {searchResults.length} 篇相关文章
          </p>
          {searchResults.length === 0 && (
             <Link to="/" className="text-sm text-blue-500 hover:underline">
               返回首页
             </Link>
          )}
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {searchResults.map(post => (
              <div key={post.id} className="h-full">
                <PostCard post={post} highlightKeyword={query} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <div className="text-6xl mb-4 opacity-80">🔍</div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-200">
            没有找到与 "{query}" 相关的文章
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md mx-auto">
            请尝试更换关键词，或者去归档页查看所有文章。
          </p>
          <div className="mt-8 flex justify-center gap-4">
             <Link 
               to="/" 
               className="px-6 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-200"
             >
               返回首页
             </Link>
          </div>
        </div>
      )}
    </div>
  );
};