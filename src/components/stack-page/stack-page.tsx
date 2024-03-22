import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { TFormState, TSetActive, TSetFormState } from "../../types/types";

export const StackPage: React.FC<{setActive: TSetActive, active: boolean, setFormState: TSetFormState, formState: TFormState}> = ({setActive, active, setFormState, formState})  => {
  return (
    <SolutionLayout title="Стек">
      <InterfaceInput type='stack' setActive={setActive} active={active} setFormState={setFormState} formState={formState} />
    </SolutionLayout>
  );
};
