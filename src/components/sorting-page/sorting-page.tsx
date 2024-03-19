import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <InterfaceInput type='arraySort' />
    </SolutionLayout>
  );
};
