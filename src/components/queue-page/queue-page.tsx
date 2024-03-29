import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { AnimationFrame, TFormState, TSetActive, TSetFormState } from "../../types/types";
import { Queue } from "../../classes/queue";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { InterfaceOutput } from "../interface-output/interface-output";

export const QueuePage: React.FC<{setActive: TSetActive, active: boolean, setFormState: TSetFormState, formState: TFormState}> = ({setActive, active, setFormState, formState})  => {
  const [queueAnimation, setAnimation] = useState<AnimationFrame>([]);
  const [queue] = useState<Queue<string>>(new Queue<string>(7));
  let size = queue.getAll().filter(item => item !== undefined && item).length === 0;

  const addButton = () => {
    queue.enqueue(formState['queue']);
    setFormState({'queue': ''});
    setActive(true);
    queue.getSize() > 0 && setAnimation(queueFrame(true, queue.getTail()));
    queue.getSize() > 0 && setTimeout(() => setAnimation(queueFrame()), SHORT_DELAY_IN_MS);
    setActive(false);
  }

  const removeButton = () => {
    queue.dequeue();
    setActive(true);
    setAnimation(queueFrame(true, queue.getHead()));
    setTimeout(() => setAnimation(queueFrame()), SHORT_DELAY_IN_MS);
    setActive(false);
  }

  const clearButton = () => {
    queue.clear();
    setAnimation(queue.getAll().map(value => [value, ElementStates.Default]));
  }

  useEffect(() => {
    setAnimation(queue.getAll().map(value => [value, ElementStates.Default]));
    return () => {
      setActive(false);
      setAnimation([])
    }
  }, [setAnimation, queue, setActive]);

  const queueFrame = (isAdding: boolean = false, itemIdx?: number): AnimationFrame => queue.getAll().map((value, idx) => [value, isAdding && itemIdx === idx ? ElementStates.Changing : ElementStates.Default]);

  return (
    <SolutionLayout title="Очередь">
      <InterfaceInput type='queue' setActive={setActive} active={active} setFormState={setFormState} formState={formState} addButton={addButton} removeButton={removeButton} clearButton={clearButton} size={size} />
      <InterfaceOutput type='queue' queueAnimation={queueAnimation} queueHead={queue.getHead()} isHead={queue.getSize() > 0 || queue.getHead() !== 0} queueTail={queue.getTail()} />
    </SolutionLayout>
  );
};
