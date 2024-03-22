import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { TFormState, TSetActive, TSetFormState } from "../../types/types";
import { reverse } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { InterfaceOutput } from "../interface-output/interface-output";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC<{setActive: TSetActive, active: boolean, setFormState: TSetFormState, formState: TFormState}> = ({setActive, active, setFormState, formState}) => {
  const [reverseAnimation, setAnimation] = useState<[string, ElementStates][]>();

  useEffect(() => {
    if (active) {
      const swapAnimations = reverse(formState['string']);
      swapAnimations.forEach((it, i) => {
        setTimeout(() => {
          setAnimation(it)
          if(i === swapAnimations.length - 1) {
            setActive(false)
          }
        }, i * DELAY_IN_MS)
      })
    }
  }, [formState, setActive, active])

  return (
    <SolutionLayout title="Строка">
      <InterfaceInput type='string' setActive={setActive} active={active} setFormState={setFormState} formState={formState} />
      {reverseAnimation?.length && <InterfaceOutput type='string' reverseAnimation={reverseAnimation} />}
    </SolutionLayout>
  );
};
