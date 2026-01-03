import React from 'react';

interface HighlightTextProps {
  text: string;
  keyword: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({ text, keyword }) => {
  if (!keyword || !text) return <>{text}</>;

  // 使用正则拆分文本，保留分隔符（即关键字本身），'gi' 表示全局+忽略大小写
  // 括号 () 是捕获组，关键在于它可以把分割符也保留在数组里
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          // 这里定义高亮样式，比如：黄色背景 或 红色文字
          <span key={index} className="text-red-600 font-bold bg-yellow-100 rounded px-0.5">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};