import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { AnimationFrame, TFormState, TSetActive, TSetFormState } from "../../types/types";
import { Stack } from "../../classes/stack";
import { ElementStates } from "../../types/element-states";
import { InterfaceOutput } from "../interface-output/interface-output";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC<{setActive: TSetActive, active: boolean, setFormState: TSetFormState, formState: TFormState}> = ({setActive, active, setFormState, formState})  => {
  const [stack] = useState<Stack<string>>(new Stack<string>());
  const [stackAnimation, setAnimation] = useState<AnimationFrame>([]);

  const addButton = () => {
    stack.push(formState['stack']);
    setFormState({'stack': ''});
    setActive(true);
    stack.getSize() > 0 && setAnimation(stackFrame(true));
    stack.getSize() > 0 && setTimeout(() => setAnimation(stackFrame()), SHORT_DELAY_IN_MS)
  }

  const removeButton = () => {
    stack.pop();
    stack.getSize() > 0 && setAnimation(stackFrame(true));
    stack.getSize() > 0 && setTimeout(() => setAnimation(stackFrame()), SHORT_DELAY_IN_MS)
  }

  const clearButton = () => {
    stack.clear();
    setAnimation([]);
  }

  const stackFrame = (isAdding: boolean = false): AnimationFrame => stack.getAll().map((value, idx) => [value, isAdding && idx === stack.getSize() - 1 ? ElementStates.Changing : ElementStates.Default]);

  return (
    <SolutionLayout title="Стек">
      <InterfaceInput type='stack' setActive={setActive} active={active} setFormState={setFormState} formState={formState} addButton={addButton} removeButton={removeButton} clearButton={clearButton} />
      <InterfaceOutput type='stack' stackAnimation={stackAnimation} />
    </SolutionLayout>
  );
};
