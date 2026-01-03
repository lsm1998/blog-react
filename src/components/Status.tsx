import React from 'react';

// --- Loading 组件 ---
export const LoadingState: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
      <div className="w-12 h-12 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent border-r-transparent border-b-transparent"></div>
    </div>
    <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium text-sm animate-pulse">
      {message}
    </p>
  </div>
);

// --- Error 组件 ---
interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] py-12 px-4 text-center">
    <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-full mb-4">
      <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">哎呀，出错了</h3>
    <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm mb-6">
      {message || "请求后端接口失败，请检查网络或服务状态。"}
    </p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
      >
        重试一下
      </button>
    )}
  </div>
);