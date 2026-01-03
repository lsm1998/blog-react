import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PostCard } from './PostCard';
import { useFetch } from '../hooks/useFetch';
import { LoadingState, ErrorState } from './Status';
import type { Article, PaginatedResponse } from '../types';

// 定义后端 /api/tag 返回的数据格式
interface TagStat {
  name: string;
  count: number;
}

export const Tags: React.FC = () => {
  const { tag: activeTag } = useParams<{ tag: string }>();

  // 1. 获取标签云数据 (独立请求，不依赖 activeTag)
  const { 
    data: tagCloudData = [], // 给个默认值 [] 防止 undefined
    loading: tagsLoading, 
    error: tagsError 
  } = useFetch<TagStat[]>('/api/tag');

  // 2. 获取文章列表 (服务端过滤)
  // 如果没有选中标签，传 '' 或 null 给 useFetch，取决于你的 useFetch 是否支持跳过请求
  // 这里假设 useFetch 内部有判断：如果 url 为空则不请求
  const articleUrl = activeTag 
    ? `/api/article?tag=${activeTag}&page=1&pageSize=100` 
    : '';
    
  const { 
    data: articleData, 
    loading: articlesLoading,
    error: articlesError
  } = useFetch<PaginatedResponse<Article>>(articleUrl, [activeTag]);

  // 如果标签云正在加载，显示 Loading
  if (tagsLoading) return <LoadingState message="正在加载标签索引..." />;
  
  // 如果标签云加载失败 (这是页面的核心数据，如果挂了需要阻断)
  if (tagsError) return <ErrorState message={tagsError} onRetry={() => window.location.reload()} />;

  const filteredPosts = articleData?.list || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* 顶部：标签云区域 */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 inline-block">
            标签索引
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3">
          {(tagCloudData || []).map(({ name, count }) => {
            const isActive = name === activeTag;
            return (
              <Link
                key={name}
                to={isActive ? '/tags' : `/tags/${name}`} // 点击已选中的标签取消选择
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                  ${isActive 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-105' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:text-blue-500 hover:shadow-sm'
                  }
                `}
              >
                {name}
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
          <div className="flex items-center mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              包含 <span className="text-blue-600">#{activeTag}</span> 的文章 
              {/* 如果文章列表还没加载完，不显示数量 */}
              {!articlesLoading && (
                  <span className="text-sm font-normal text-gray-500 ml-2">({filteredPosts.length} 篇)</span>
              )}
            </h2>
            <Link 
                to="/tags" 
                className="ml-auto text-sm text-gray-500 hover:text-red-500 flex items-center transition-colors"
            >
              清除筛选 ✕
            </Link>
          </div>
          
          {/* 文章列表加载状态处理 */}
          {articlesLoading ? (
             <LoadingState message="正在筛选文章..." />
          ) : articlesError ? (
             <div className="text-red-500 py-10 text-center">获取文章失败: {articlesError}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPosts.map(post => (
                  <div key={post.id} className="h-full">
                     <PostCard post={post} />
                  </div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                      该标签下暂时没有文章。
                  </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-20 italic border-t border-gray-100 dark:border-gray-800 mt-8">
          点击上方标签，发现更多精彩内容
        </div>
      )}
    </div>
  );
};