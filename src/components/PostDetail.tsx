import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MOCK_POSTS } from '../data';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const post = MOCK_POSTS.find(p => p.id === Number(id));

  if (!post) {
    return <div className="text-center py-20">文章不存在</div>;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:underline mb-8 inline-block">
        ← 返回首页
      </Link>

      <header className="mb-10 border-b pb-8">
        <div className="flex gap-2 mb-4">
          {post.tagNames.map((tag: string) => (
            <Link
              key={tag}
              to={`/tags/${tag}`}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded hover:bg-blue-200 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="text-gray-500">{post.date}</div>
      </header>
      <div className="prose dark:prose-invert prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-blue-600 prose-img:rounded-xl">
        <ReactMarkdown
          components={{
            code(props) {
              const { children, className, node, ...rest } = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                // @ts-expect-error 类型定义问题
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={vscDarkPlus}
                  className="rounded-lg text-sm"
                />
              ) : (
                <code {...rest} className="bg-gray-100 text-red-500 px-1 rounded">
                  {children}
                </code>
              )
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article >
  );
};