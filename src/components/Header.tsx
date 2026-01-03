import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / 博客名称 */}
        <div className="text-xl font-bold text-gray-800 hover:text-blue-600 cursor-pointer">
        个人博客
        </div>
        
        {/* 简单的右侧导航 */}
        <nav className="space-x-6 text-gray-600">
          <a href="#" className="hover:text-blue-500 transition">首页</a>
          <a href="#" className="hover:text-blue-500 transition">标签</a>
          <a href="#" className="hover:text-blue-500 transition">归档</a>
          <a href="#" className="hover:text-blue-500 transition">关于我</a>
        </nav>
      </div>
    </header>
  );
};