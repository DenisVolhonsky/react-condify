import React, { useEffect, useState } from 'react';

// Типизация для асинхронного компонента AsyncCond
type AsyncCondProps<T> = {
  asyncFunction: () => Promise<T>;
  render: (data: T) => React.ReactNode;
  else: React.ReactNode;
  loading: React.ReactNode;
  error: React.ReactNode;
  polling?: number;
  cacheKey?: string;
  onError?: (error: Error) => void;
};

// Функции для работы с кэшем
const getFromCache = <T,>(cacheKey: string): T | null => {
  const cachedData = typeof window !== 'undefined' && localStorage.getItem(cacheKey);
  return cachedData ? JSON.parse(cachedData) : null;
};

const saveToCache = <T,>(cacheKey: string, data: T) => {
  typeof window !== 'undefined' && localStorage.setItem(cacheKey, JSON.stringify(data));
};

export const AsyncCond = <T,>({
  asyncFunction,
  render,
  else: elseComponent,
  loading,
  error,
  polling,
  cacheKey,
  onError,
}: AsyncCondProps<T>) => {
  const [state, setState] = useState<'loading' | 'success' | 'error' | 'empty'>('loading');
  const [data, setData] = useState<T | null>(null);

  const execute = async () => {
    try {
      setState('loading');
      let response;

      // Проверка наличия данных в кэше
      if (cacheKey) {
        const cachedData = getFromCache<T>(cacheKey);
        if (cachedData) {
          setData(cachedData);
          setState('success');
          return;
        }
      }

      // Выполнение запроса
      response = await asyncFunction();
      if (response) {
        setData(response);
        setState('success');
        if (cacheKey) saveToCache(cacheKey, response);
      } else {
        setState('empty');
      }
    } catch (err) {
      setState('error');
      if (onError) onError(err as Error);
    }
  };

  useEffect(() => {
    execute();
    if (polling) {
      const interval = setInterval(execute, polling * 1000);
      return () => clearInterval(interval);
    }
  }, [asyncFunction, polling, cacheKey]);

  if (state === 'loading') return <>{loading}</>;
  if (state === 'error') return <>{error}</>;
  if (state === 'empty') return <>{elseComponent}</>;
  return data ? <>{render(data)}</> : null;
};