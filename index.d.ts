declare module 'react-condify' {
    import { ReactNode } from 'react';
  
    type CondCaseProps = {
      condition: boolean;
      then: ReactNode;
    };
  
    type CondProps = {
      condition?: boolean;
      then?: ReactNode;
      cases?: CondCaseProps[];
      fallback?: ReactNode;
    };
  
    export const Cond: React.FC<CondProps>;
  
    type AsyncCondProps<T> = {
      asyncFunction: () => Promise<T>;
      then: (data: T) => ReactNode;
      else: ReactNode;
      loading: ReactNode;
      error: ReactNode;
      polling?: number;
      cacheKey?: string;
      onError?: (error: Error) => void;
    };
  
    export const AsyncCond: React.FC<AsyncCondProps<any>>;
  }