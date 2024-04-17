import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { AnimationFrame, TFormState, TSetActive, TSetFormState } from "../../types/types";
import { Queue } from "../../classes/queue";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates, LoaderStates } from "../../types/element-states";
import { InterfaceOutput } from "../interface-output/interface-output";
import { delay } from "../../utils/utils";

export const QueuePage: React.FC<{setActive: TSetActive, active: boolean, setFormState: TSetFormState, formState: TFormState}> = ({setActive, active, setFormState, formState})  => {
  const [queueAnimation, setAnimation] = useState<AnimationFrame>([]);
  const [queue] = useState<Queue<string>>(new Queue<string>(7));
  const [loaderState, setLoaderState] = useState<LoaderStates | string>('');
  let size = queue.getAll().filter(item => item !== undefined && item).length === 0;

  const addButton = async () => {
    queue.enqueue(formState['queue']);
    setFormState({'queue': ''});
    setActive(true);
    setLoaderState(LoaderStates.Add);
    queue.getSize() > 0 && setAnimation(queueFrame(true, queue.getTail()));
    await delay(SHORT_DELAY_IN_MS);
    queue.getSize() > 0 && setAnimation(queueFrame());
    setActive(false);
    setLoaderState('')
  }

  const removeButton = async () => {
    queue.dequeue();
    setActive(true);
    setLoaderState(LoaderStates.Remove);
    setAnimation(queueFrame(true, queue.getHead()));
    await delay(SHORT_DELAY_IN_MS);
    setAnimation(queueFrame());
    setActive(false);
    setLoaderState('')
  }

  const clearButton = async () => {
    setLoaderState(LoaderStates.Reset);
    queue.clear();
    await delay(SHORT_DELAY_IN_MS);
    setAnimation(queue.getAll().map(value => [value, ElementStates.Default]));
    setLoaderState('');
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
      <InterfaceInput type='queue' setActive={setActive} active={active} setFormState={setFormState} formState={formState} addButton={addButton} removeButton={removeButton} clearButton={clearButton} size={size} loaderState={loaderState} />
      <InterfaceOutput type='queue' queueAnimation={queueAnimation} queueHead={queue.getHead()} isHead={queue.getSize() > 0 || queue.getHead() !== 0} queueTail={queue.getTail()} />
    </SolutionLayout>
  );
};
