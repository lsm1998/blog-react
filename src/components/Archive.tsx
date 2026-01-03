import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { LoadingState, ErrorState } from './Status';
import type { Article, PaginatedResponse } from '../types';
import { PAGINATION } from '../constants';

export const Archive: React.FC = () => {
  // 1. 从接口获取数据
  // 注意：归档页面通常需要展示所有文章，这里暂时将 pageSize 设大
  // 理想情况下，后端应提供一个专门的 /api/archive 接口只返回 id, title, date 字段以减小体积
  const { data, loading, error } = useFetch<PaginatedResponse<Article>>(
    `/api/article?page=1&pageSize=${PAGINATION.ALL_PAGE_SIZE}`
  );

  // 2. 使用 useMemo 缓存分组逻辑，避免每次渲染都重新计算
  const { years, postsByYear } = useMemo(() => {
    const list = data?.list || [];

    // 按年份分组
    const grouped = list.reduce((acc, post) => {
      // 兼容处理：防止 date 为空导致报错
      const dateStr = post.date || '';
      const year = dateStr.split('-')[0] || '未知年份';
      
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {} as Record<string, Article[]>);

    // 获取年份列表并倒序排列 (2026, 2025...)
    const sortedYears = Object.keys(grouped).sort((a, b) => {
        if (a === '未知年份') return 1; // 把未知放在最后
        if (b === '未知年份') return -1;
        return Number(b) - Number(a);
    });

    return { years: sortedYears, postsByYear: grouped };
  }, [data]);

  if (loading) {
    return <LoadingState message="正在加载归档..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
        文章归档
      </h1>

      <div className="space-y-12">
        {years.map(year => (
          <div key={year}>
            <h2 className="text-2xl font-bold text-gray-400 mb-6 flex items-center">
              <span className="mr-4 text-4xl opacity-20 italic font-serif">{year}</span>
              <span className="h-px bg-gray-200 dark:bg-gray-700 flex-grow"></span>
            </h2>
            
            <ul className="space-y-4">
              {postsByYear[year].map((post: Article) => (
                <li key={post.id} className="flex flex-col sm:flex-row sm:items-baseline gap-2 group">
                  <span className="text-gray-400 font-mono text-sm w-32 flex-shrink-0">
                    {post.date}
                  </span>
                  <Link 
                    to={`/post/${post.id}`} 
                    className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors font-medium truncate flex-grow"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {years.length === 0 && (
            <div className="text-center text-gray-500 py-10">暂无归档文章</div>
        )}
      </div>
    </div>
  );
};