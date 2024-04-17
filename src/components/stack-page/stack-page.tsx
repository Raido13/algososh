import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { AnimationFrame, TFormState, TSetActive, TSetFormState } from "../../types/types";
import { Stack } from "../../classes/stack";
import { ElementStates, LoaderStates } from "../../types/element-states";
import { InterfaceOutput } from "../interface-output/interface-output";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

export const StackPage: React.FC<{setActive: TSetActive, active: boolean, setFormState: TSetFormState, formState: TFormState}> = ({setActive, active, setFormState, formState})  => {
  const [stack] = useState<Stack<string>>(new Stack<string>());
  const [stackAnimation, setAnimation] = useState<AnimationFrame>([]);
  const [loaderState, setLoaderState] = useState<LoaderStates | string>('');
  let size = stackAnimation.length === 0;

  const addButton = async () => {
    stack.push(formState['stack']);
    setFormState({'stack': ''});
    setActive(true);
    setLoaderState(LoaderStates.Add);
    stack.getSize() > 0 && setAnimation(stackFrame(true));
    await delay(SHORT_DELAY_IN_MS);
    stack.getSize() > 0 && setAnimation(stackFrame());
    setActive(false);
    setLoaderState('')
  }

  const removeButton = async () => {
    stack.pop();
    setLoaderState(LoaderStates.Remove);
    setAnimation(stackFrame(true));
    await delay(SHORT_DELAY_IN_MS);
    setAnimation(stackFrame());
    setActive(false);
    setLoaderState('')
  }

  const clearButton = async () => {
    setLoaderState(LoaderStates.Reset);
    stack.clear();
    await delay(SHORT_DELAY_IN_MS);
    setAnimation([]);
    setLoaderState('');
  }

  const stackFrame = (isAdding: boolean = false): AnimationFrame => stack.getAll().map((value, idx) => [value, isAdding && idx === stack.getSize() - 1 ? ElementStates.Changing : ElementStates.Default]);
  
  useEffect(() => () => {
    setAnimation([])
  }, [])

  return (
    <SolutionLayout title="Стек">
      <InterfaceInput type='stack' setActive={setActive} active={active} setFormState={setFormState} formState={formState} addButton={addButton} removeButton={removeButton} clearButton={clearButton} size={size} loaderState={loaderState} />
      <InterfaceOutput type='stack' stackAnimation={stackAnimation} />
    </SolutionLayout>
  );
};
