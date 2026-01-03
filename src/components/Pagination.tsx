import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalCount, 
  pageSize, 
  onPageChange 
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  // 如果只有 1 页或没数据，不显示分页条
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      {/* 上一页 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          px-4 py-2 text-sm font-medium rounded-lg border transition-colors
          bg-white border-gray-200 text-gray-700 hover:bg-gray-50
          dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        ← 上一页
      </button>

      {/* 页码指示器 */}
      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        第 {currentPage} / {totalPages} 页
      </span>

      {/* 下一页 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          px-4 py-2 text-sm font-medium rounded-lg border transition-colors
          bg-white border-gray-200 text-gray-700 hover:bg-gray-50
          dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        下一页 →
      </button>
    </div>
  );
};