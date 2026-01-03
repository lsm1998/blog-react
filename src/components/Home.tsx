import React from 'react';
import { PostCard } from './PostCard';
import { MOCK_POSTS } from '../data';

export const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧：文章列表 */}
        <div className="md:w-3/4">
           <h1 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">
              最新文章
           </h1>
           <div>
             {MOCK_POSTS.map(post => (
               <PostCard key={post.id} post={post} />
             ))}
           </div>
        </div>

        {/* 右侧：侧边栏 (保持不变) */}
        <div className="md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 sticky top-24">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 mx-auto"></div>
              <h3 className="text-center font-bold text-lg">lsm1998</h3>
              <p className="text-gray-500 text-sm text-center mt-2">
                  C++ / Go / System Programming.
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};