import { useState, useEffect } from 'react';

// 定义泛型 T，表示返回的数据类型
export function useFetch<T>(url: string, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // 防止组件卸载后更新状态

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          headers: {
            'X-Access-Key': import.meta.env.VITE_API_ACCESS_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_API_ACCESS_KEY}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
1
        if(result.code && result.code !== 200) // 判断接口返回的状态码
        {
          throw new Error(result.message || 'Unknown API error');
        }
        
        if (isMounted) {
          setData(result.data);
        }
      } catch (err) {
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

    return () => { isMounted = false; };
  }, dependencies); // 依赖项变化时重新请求

  return { data, loading, error };
}