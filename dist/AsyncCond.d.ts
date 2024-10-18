import React from 'react';
type AsyncCondProps<T> = {
    asyncFunction: () => Promise<T>;
    then: React.ReactNode;
    else: React.ReactNode;
    loading: React.ReactNode;
    error: React.ReactNode;
    polling?: number;
    cacheKey?: string;
    onError?: (error: Error) => void;
};
export declare const AsyncCond: React.FC<AsyncCondProps<any>>;
export {};
