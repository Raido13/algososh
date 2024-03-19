import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <InterfaceInput type='string' />
    </SolutionLayout>
  );
};
