import React from 'react';
import type { BlogPost } from '../types';

interface PostCardProps {
  post: BlogPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4 border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span>{post.date}</span>
        <span className="mx-2">•</span>
        <div className="flex gap-2">
            {post.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                    {tag}
                </span>
            ))}
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer">
        {post.title}
      </h2>
      
      <p className="text-gray-600 leading-relaxed mb-4">
        {post.summary}
      </p>
      
      <button className="text-blue-500 font-medium hover:underline text-sm">
        阅读全文 →
      </button>
    </div>
  );
};