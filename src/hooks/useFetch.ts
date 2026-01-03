import { useState, useEffect } from 'react';
import { MOCK_User, MOCK_Tags,MOCK_Article_Page } from '../data'

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export function useFetch<T>(url: string, dependencies?: any[]) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;

    if (import.meta.env.VITE_API_MOCK_MODE === 'true') { // 启用 Mock 模式
      console.log(`[Mock Mode] 请求被拦截: ${url}`);

      // 模拟网络延迟
      const mockDelay = setTimeout(() => {
        if (isMounted) {
          let data: T | null = null;
          
          // 根据 URL 返回不同的 Mock 数据
          if (url.startsWith('/api/article')) {
            data = MOCK_Article_Page as unknown as T;
          }else if (url.startsWith('/api/tag')) {
            data = MOCK_Tags as unknown as T;
          } else if (url.startsWith('/api/user')) {
            data = MOCK_User as unknown as T;
          } else {
            console.warn(`[Mock Mode] 未找到匹配的 Mock 数据: ${url}`);
          }

          setData( data|| null);
          setLoading(false);
        }
      }, 500);

      return () => {
        isMounted = false;
        clearTimeout(mockDelay);
      };
    }

    // 创建控制器
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal,
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': import.meta.env.VITE_API_ACCESS_KEY || '',
            'Authorization': `Bearer ${import.meta.env.VITE_API_ACCESS_KEY || ''}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json() as ApiResponse<T>;

        // 业务逻辑错误判断
        if (result.code !== undefined && result.code !== 200) {
          throw new Error(result.message || 'API Business Error');
        }

        if (isMounted) {
          setData(result.data);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Request aborted:', url);
          return;
        }

        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort(); // 取消未完成的请求
    };

  }, [url, ...(dependencies || [])]);

  return { data, loading, error };
}