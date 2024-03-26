import React, { MouseEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { AnimationFrame, TFormState, TSetActive, TSetFormState } from "../../types/types";
import { Stack } from "../../classes/stack";
import { ElementStates } from "../../types/element-states";
import { InterfaceOutput } from "../interface-output/interface-output";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC<{setActive: TSetActive, active: boolean, setFormState: TSetFormState, formState: TFormState}> = ({setActive, active, setFormState, formState})  => {
  const stack = new Stack<string>();
  const [stackAnimation, setAnimation] = useState<AnimationFrame>([]);

  const addToStack = () => {
    console.log(formState)
    stack.push(formState['stack']);
    setFormState({...formState, 'stack': '' });
    setActive(true);
    stack.getSize() > 0 && setTimeout(() => setAnimation(stackFrame()), 0);
    stack.getSize() > 0 && setTimeout(() => setAnimation(stackFrame()), SHORT_DELAY_IN_MS)
  }

  const removeFromStack = () => {
    stack.pop();
    setAnimation(stackFrame());
    setTimeout(() => setAnimation(stackFrame()), SHORT_DELAY_IN_MS)
  }

  const clearStack = () => {
    stack.clear();
    setAnimation([]);
  }

  const stackFrame = (): AnimationFrame => stack.getAll().map((value, idx) => [value, stack.getSize() - 1 === idx ? ElementStates.Changing : ElementStates.Default]);

  return (
    <SolutionLayout title="Стек">
      <InterfaceInput type='stack' setActive={setActive} active={active} setFormState={setFormState} formState={formState} addToStack={addToStack} removeFromStack={removeFromStack} clearStack={clearStack} />
      <InterfaceOutput type='stack' stackAnimation={stackAnimation} />
    </SolutionLayout>
  );
};
