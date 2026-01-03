import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 管理搜索框的输入状态
  const [keyword, setKeyword] = useState('');

  const getLinkClass = (path: string) => {
    return location.pathname === path 
      ? "text-blue-600 font-medium" 
      : "hover:text-blue-500 transition";
  };

  // 处理搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表单默认提交刷新
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword)}`);
      setKeyword(''); // 可选：搜索后清空输入框
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-600">
          博客
        </Link>
        
        <div className="flex items-center gap-6 w-full md:w-auto">
          <nav className="space-x-5 text-gray-600 dark:text-gray-300 text-sm md:text-base hidden sm:block">
            <Link to="/" className={getLinkClass('/')}>首页</Link>
            <Link to="/archive" className={getLinkClass('/archive')}>归档</Link>
            <Link to="/tags" className={getLinkClass('/tags')}>标签</Link>
            <Link to="/about" className={getLinkClass('/about')}>关于</Link>
          </nav>

          <form onSubmit={handleSearch} className="relative flex-grow md:flex-grow-0">
             <input
               type="text"
               placeholder="搜索文章..."
               className="w-full md:w-48 bg-gray-100 text-sm text-gray-700 rounded-full px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all"
               value={keyword}
               onChange={(e) => setKeyword(e.target.value)}
             />
            
             <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </button>
          </form>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};