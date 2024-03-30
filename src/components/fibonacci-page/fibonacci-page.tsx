import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { TFormState, TSetActive, TSetFormState } from "../../types/types";
import { InterfaceOutput } from "../interface-output/interface-output";
import { delay, fibonacci } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC<{setActive: TSetActive, active: boolean, setFormState: TSetFormState, formState: TFormState}> = ({setActive, active, setFormState, formState})  => {
  const [fibonacciAnimation, setAnimation] = useState<number[]>();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(true);
    const finobacciAnimations = fibonacci(+formState['fibonacci']);
    
    for (let i = 0; i < finobacciAnimations.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setAnimation(finobacciAnimations[i]);
      if (i === finobacciAnimations.length - 1) {
        setActive(false)
      }
    }
  }

  useEffect(() => () => {
      setActive(false);
      setAnimation([])
  }, [])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <InterfaceInput type='fibonacci' setActive={setActive} active={active} setFormState={setFormState} formState={formState} onSubmit={onSubmit} />
      {fibonacciAnimation?.length && <InterfaceOutput type='fibonacci' fibonacciAnimation={fibonacciAnimation} />}
    </SolutionLayout>
  );
};
