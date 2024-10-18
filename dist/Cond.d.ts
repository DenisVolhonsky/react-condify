import React from 'react';
type CondCaseProps = {
    condition: boolean;
    render: React.ReactNode;
};
type CondProps = {
    case?: CondCaseProps;
    cases?: CondCaseProps[];
    fallback?: React.ReactNode;
};
export declare const Cond: React.FC<CondProps>;
export {};
