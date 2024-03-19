import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";

export const FibonacciPage: React.FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <InterfaceInput type='finobacci' />
    </SolutionLayout>
  );
};
