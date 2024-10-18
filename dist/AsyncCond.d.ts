import React from 'react';
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
export declare const AsyncCond: <T>({ asyncFunction, render, else: elseComponent, loading, error, polling, cacheKey, onError, }: AsyncCondProps<T>) => import("react/jsx-runtime").JSX.Element | null;
export {};
