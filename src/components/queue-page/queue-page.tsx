import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
      <InterfaceInput type='queue' />
    </SolutionLayout>
  );
};
