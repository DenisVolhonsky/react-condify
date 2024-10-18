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

export const Cond: React.FC<CondProps> = ({
  condition,
  then,
  cases,
  fallback,
}) => {
  if (typeof condition === "boolean") {
    return <>{condition ? then : fallback}</>;
  }

  if (Array.isArray(cases)) {
    const matchingCase = cases.find((c) => c.condition);
    if (matchingCase) {
      return <>{matchingCase.then}</>;
    }
  }

  return <>{fallback}</>;
};
