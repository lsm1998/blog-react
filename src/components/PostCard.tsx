import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';

interface PostCardProps {
  post: BlogPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="
      bg-white dark:bg-gray-800 
      border border-gray-100 dark:border-gray-700 
      rounded-lg p-6 mb-4 
      hover:shadow-md transition-all duration-300
    ">
      {/* 头部：日期和标签 */}
      <div className="flex items-center flex-wrap gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
        <span>{post.date}</span>
        <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Link
              key={tag}
              to={`/tags/${tag}`}
              className="
                px-2 py-0.5 rounded text-xs transition-colors duration-200
                bg-gray-100 text-gray-600
                hover:bg-blue-100 hover:text-blue-600
                dark:bg-gray-700 dark:text-gray-300 
                dark:hover:bg-gray-600 dark:hover:text-blue-300
              "
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 标题：使用 group 确保 hover 效果平滑 */}
      <Link to={`/post/${post.id}`} className="block group">
        <h2 className="
          text-2xl font-bold mb-3 transition-colors duration-200
          text-gray-800 dark:text-gray-100 
          group-hover:text-blue-600 dark:group-hover:text-blue-400
        ">
          {post.title}
        </h2>
      </Link>

      {/* 摘要 */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        {post.summary}
      </p>

      {/* 阅读全文按钮 */}
      <Link 
        to={`/post/${post.id}`} 
        className="
          inline-flex items-center font-medium text-sm hover:underline transition-colors
          text-blue-500 dark:text-blue-400
        "
      >
        阅读全文 <span className="ml-1">→</span>
      </Link>
    </div>
  );
};