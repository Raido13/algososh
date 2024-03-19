import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <InterfaceInput type='linkedList' />
    </SolutionLayout>
  );
};
