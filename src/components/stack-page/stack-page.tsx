import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <InterfaceInput type='stack' />
    </SolutionLayout>
  );
};
