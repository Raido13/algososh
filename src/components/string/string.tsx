import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { AnimationFrame, TFormState, TSetActive, TSetFormState } from "../../types/types";
import { reverse } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { InterfaceOutput } from "../interface-output/interface-output";

export const StringComponent: React.FC<{setActive: TSetActive, active: boolean, setFormState: TSetFormState, formState: TFormState}> = ({setActive, active, setFormState, formState}) => {
  const [reverseAnimation, setAnimation] = useState<AnimationFrame>();

  const onSubmit = () => {
    setActive(true);
    const swapAnimations = reverse(formState['string']);
    swapAnimations.forEach((frame, i) => {
      setTimeout(() => {
        setAnimation(frame)
        if(i === swapAnimations.length - 1) {
          setActive(false)
        }
      }, i * DELAY_IN_MS)
    })
  }

  useEffect(() => () => {
      setActive(false);
      setAnimation([]);
  }, []);

  return (
    <SolutionLayout title="Строка">
      <InterfaceInput type='string' setActive={setActive} active={active} setFormState={setFormState} formState={formState} onSubmit={onSubmit} />
      {reverseAnimation?.length && <InterfaceOutput type='string' reverseAnimation={reverseAnimation} />}
    </SolutionLayout>
  );
};
