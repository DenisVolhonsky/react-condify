import React from "react";
type CondCaseProps = {
    condition: boolean;
    then: React.ReactNode;
};
type CondProps = {
    condition?: boolean;
    then: React.ReactNode;
    cases?: CondCaseProps[];
    fallback: React.ReactNode;
};
export declare const Cond: React.FC<CondProps>;
export {};
