import React, { useState } from 'react';
import { PostCard } from './PostCard';
import { ProfileCard } from './ProfileCard';
import { useFetch } from '../hooks/useFetch';
import { LoadingState, ErrorState } from './Status';
import { Pagination } from './Pagination';
import type { Article, PaginatedResponse } from '../types';

import { PAGINATION } from '../constants';

export const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  
  const { data, loading, error } = useFetch<PaginatedResponse<Article>>(
    `/api/article?page=${page}&pageSize=${PAGINATION.DEFAULT_PAGE_SIZE}`, 
    [page] 
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingState message={`正在加载第 ${page} 页...`} />;
  } 

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  const articles = data?.list || [];
  const total = data?.total || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-3/4">
           <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-l-4 border-blue-500 pl-3">
              最新文章
           </h1>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]"> 
             {articles.length > 0 ? (
               articles.map(post => (
                 <div key={post.id} className="h-full"> 
                    <PostCard post={post} />
                 </div>
               ))
             ) : (
               <div className="col-span-full text-gray-500 text-center py-10">暂无文章</div>
             )}
           </div>

           <div className="mt-10 border-t border-gray-100 pt-6">
              <Pagination 
                currentPage={page}
                totalCount={total}
                pageSize={PAGINATION.DEFAULT_PAGE_SIZE}
                onPageChange={handlePageChange}
              />
           </div>
        </div>

        {/* 右侧：侧边栏 (保持 sticky) */}
        <div className="md:w-1/4 sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-l-4 border-purple-500 pl-3">
             关于作者
          </h2>
          <ProfileCard />
        </div>
        
      </div>
    </div>
  );
};