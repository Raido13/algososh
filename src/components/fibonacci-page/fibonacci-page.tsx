import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { TFormState, TSetActive, TSetFormState } from "../../types/types";
import { InterfaceOutput } from "../interface-output/interface-output";
import { fibonacci } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC<{setActive: TSetActive, active: boolean, setFormState: TSetFormState, formState: TFormState}> = ({setActive, active, setFormState, formState})  => {
  const [fibonacciAnimation, setAnimation] = useState<number[]>();

  const onSubmit = () => {
    setActive(true);
    const finobacciAnimations = fibonacci(+formState['fibonacci']);
    finobacciAnimations.forEach((frame, i) => {
      setTimeout(() => {
        setAnimation(frame)
        if(i === finobacciAnimations.length - 1) {
          setActive(false)
        }
      }, i * SHORT_DELAY_IN_MS)
    })
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
