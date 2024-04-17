import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { TFormState, TSetActive, TSetFormState } from "../../types/types";
import { LinkedList } from "../../classes/linkedList";
import { ElementStates, LoaderStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { InterfaceOutput } from "../interface-output/interface-output";
import { delay } from "../../utils/utils";

export const ListPage: React.FC<{setActive: TSetActive, active: boolean, setFormState: TSetFormState, formState: TFormState}> = ({setActive, active, setFormState, formState})  => {
  const [list] = useState<LinkedList<string | [string, ElementStates]>>(new LinkedList<string | [string, ElementStates]>());

  const listFrame = (state: ElementStates, changeIdx: null | number = null) => list.print().map((val, idx) => [val, idx === changeIdx ? state : ElementStates.Default]);

  const listFrameUpdate = (newState: ElementStates, changeIdx: null | number = null, array: [string, ElementStates][][]) => array.map((element, idx) => [element[0], changeIdx && idx < changeIdx ? newState : element[1]]);

  const [linkedListAnimation, setAnimation] = useState<(string | [string, ElementStates])[][]>([]);

  const [isAdding, setAdding] = useState(false);

  const [loaderState, setLoaderState] = useState<LoaderStates | string>('');

  if (list.getSize() === 0) {
    list.append('1');
    list.append('2');
    list.append('3');
    list.append('4');
    list.append('5');
    list.append('6')
  }

  const addHeadButton = async () => {
    setAdding(true);
    setActive(true);
    setLoaderState(LoaderStates.AddHead);
    let frame = listFrame(ElementStates.Default);
    frame[0].push([formState['linkedListValue'], ElementStates.Changing]);
    await delay(DELAY_IN_MS);
    setAnimation(frame);

    list.insertAt(formState['linkedListValue'], 0);
    setFormState(prevState => ({...prevState, 'linkedListValue': ''}));
    await delay(DELAY_IN_MS);
    setAnimation(listFrame(ElementStates.Modified, 0));

    setAdding(false);
    setActive(false);
    setLoaderState('');
    await delay(DELAY_IN_MS);
    setAnimation(listFrame(ElementStates.Default))
  }

  const removeHeadButton = async () => {
    setActive(true);
    setLoaderState(LoaderStates.RemoveHead);
    let frame = listFrame(ElementStates.Default);
    frame[0][0] = '';
    frame[0].push([list.print()[0] as string, ElementStates.Changing]);
    setAnimation(frame);

    list.removeAt(0);
    setActive(false);
    setLoaderState('');
    await delay(DELAY_IN_MS);
    setAnimation(listFrame(ElementStates.Default))
  }

  const addTailButton = async () => {
    setAdding(true);
    setActive(true);
    setLoaderState(LoaderStates.AddTail);
    let frame = listFrame(ElementStates.Default);
    frame[list.getSize() - 1].push([formState['linkedListValue'], ElementStates.Changing]);
    await delay(DELAY_IN_MS);
    setAnimation(frame);

    list.insertAt(formState['linkedListValue'], list.getSize());
    setFormState(prevState => ({...prevState, 'linkedListValue': ''}));
    await delay(DELAY_IN_MS);
    setAnimation(listFrame(ElementStates.Modified, list.getSize() - 1))

    setAdding(false);
    setActive(false);
    setLoaderState('');
    await delay(DELAY_IN_MS);
    setAnimation(listFrame(ElementStates.Default));
  }

  const removeTailButton = async () => {
    setActive(true);
    setLoaderState(LoaderStates.RemoveTail);
    let frame = listFrame(ElementStates.Default);
    frame[list.getSize() - 1].push([list.print()[list.getSize() - 1] as string, ElementStates.Changing]);
    frame[list.getSize() - 1][0] = '';
    setAnimation(frame);

    list.removeAt(list.getSize() - 1);
    setActive(false);
    setLoaderState('');
    await delay(DELAY_IN_MS);
    setAnimation(listFrame(ElementStates.Default));
  }

  const addByIdxButton = async () => {
    setAdding(true);
    setActive(true);
    setLoaderState(LoaderStates.AddIdx);
    const idx = +formState['linkedListIdx'];
    setFormState(prevState => ({...prevState, 'linkedListIdx': ''}));

    for (let i = 0; i <= idx; i++) {
      let frame: (string | [string, ElementStates])[][] = listFrame(ElementStates.Default, i);
      if (i > 0) {
        frame = listFrameUpdate(ElementStates.Changing, i, frame as [string, ElementStates][][]);
      }
      frame[i].push([formState['linkedListValue'], ElementStates.Changing]);

      await delay(DELAY_IN_MS);
      setAnimation(frame);
    }

    list.insertAt(formState['linkedListValue'], idx);
    setFormState(prevState => ({...prevState, 'linkedListValue': ''}));
    let frame = listFrame(ElementStates.Modified, idx);
    await delay(DELAY_IN_MS);
    setAnimation(frame)

    setAdding(false);
    setActive(false);
    setLoaderState('');
    await delay(DELAY_IN_MS);
    setAnimation(listFrame(ElementStates.Default));
  }

  const removeByIdxButton = async () => {
    setActive(true);
    setLoaderState(LoaderStates.RemoveIdx);
    const idx = +formState['linkedListIdx'];
    setFormState(prevState => ({...prevState, 'linkedListIdx': ''}));
      
    for (let i = 0; i <= idx; i++) {
      let frame: (string | [string, ElementStates])[][] = listFrame(ElementStates.Changing, i);
      
      if (i > 0) {
        frame = listFrameUpdate(ElementStates.Changing, i, frame as [string, ElementStates][][]);
      }

      await delay(DELAY_IN_MS);
      setAnimation(frame);
    }

    await delay(DELAY_IN_MS);
    let frame = listFrame(ElementStates.Default);
    frame = listFrameUpdate(ElementStates.Changing, idx, frame as [string, ElementStates][][]);
    frame[idx].push([frame[idx][0] as string, ElementStates.Changing]);
    frame[idx][0] = '';
    frame[idx][1] = ElementStates.Default;
    await delay(DELAY_IN_MS);
    setAnimation(frame)

    list.removeAt(idx);
    setFormState(prevState => ({...prevState, 'linkedListValue': ''}));
    setActive(false);
    setLoaderState('');
    await delay(DELAY_IN_MS);
    setAnimation(listFrame(ElementStates.Default));
  }

  useEffect(() => {
    setAnimation(listFrame(ElementStates.Default));
    return () => {
      setActive(false);
      setLoaderState('');
      setAnimation([]);
    }
  }, [setAnimation]);

  let size = linkedListAnimation.length === 0;
  let frameLength = linkedListAnimation.length;
  return (
    <SolutionLayout title="Связный список">
      <InterfaceInput type='linkedList' setActive={setActive} active={active} setFormState={setFormState} formState={formState} addHeadButton={addHeadButton} addTailButton={addTailButton} removeHeadButton={removeHeadButton} removeTailButton={removeTailButton} addByIdxButton={addByIdxButton} removeByIdxButton={removeByIdxButton} size={size} loaderState={loaderState} frameLength={frameLength} />
      <InterfaceOutput type='linkedList' linkedListAnimation={linkedListAnimation} isAdding={isAdding} />
    </SolutionLayout>
  );
};
