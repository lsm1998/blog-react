import React from 'react';
import { PostCard } from './PostCard';
import { ProfileCard } from './ProfileCard';
import { useFetch } from '../hooks/useFetch';
import { LoadingState, ErrorState } from './Status';
import type { Article } from '../types';

export const Home: React.FC = () => {
  const { data: posts, loading, error } = useFetch<Article[]>('/api/article');

  if (loading) {
    return <LoadingState message="正在加载文章..." />;
  } 

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* 左侧：文章列表 (占 75%) */}
        <div className="md:w-3/4">
           <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-l-4 border-blue-500 pl-3">
              最新文章
           </h1>
           <div>
             {(posts || []).map(post => (
               <PostCard key={post.id} post={post} />
             ))}
           </div>
        </div>

        {/* 右侧：侧边栏 (占 25%) */}
        <div className="md:w-1/4">
          {/* 2. 直接使用组件，无需传入参数，因为组件内部自己会去 fetch */}
          <ProfileCard />
        </div>
        
      </div>
    </div>
  );
};