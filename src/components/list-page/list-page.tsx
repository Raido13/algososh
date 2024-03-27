import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { TFormState, TSetActive, TSetFormState } from "../../types/types";
import { LinkedList } from "../../classes/linkedList";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { InterfaceOutput } from "../interface-output/interface-output";

export const ListPage: React.FC<{setActive: TSetActive, active: boolean, setFormState: TSetFormState, formState: TFormState}> = ({setActive, active, setFormState, formState})  => {
  const [list] = useState<LinkedList<string | [string, ElementStates]>>(new LinkedList<string | [string, ElementStates]>());
  const [linkedListAnimation, setAnimation] = useState<(string | [string, ElementStates])[][]>([]);

  if (list.getSize() === 0) {
    list.append('1');
    list.append('2');
    list.append('3');
    list.append('4');
    list.append('5');
    list.append('6')
  }

  const addHeadButton = () => {
    let frame = listFrame(ElementStates.Default);
    frame[0].push([formState['linkedListValue'], ElementStates.Changing]);
    setAnimation(frame);

    setTimeout(() => {
      list.append(formState['linkedListValue']);
      setFormState(prevState => ({...prevState, 'linkedListValue': ''}));
      setAnimation(listFrame(ElementStates.Modified, 0))
    }, DELAY_IN_MS)

    setTimeout(() => {
      setAnimation(listFrame(ElementStates.Default));
    }, DELAY_IN_MS * 2)
  }

  const removeHeadButton = () => {
    let frame = listFrame(ElementStates.Default);
    frame[list.getSize() - 1].push(['', ElementStates.Changing]);
    setAnimation(frame);

    setTimeout(() => {
      list.removeAt(0);
      setAnimation(listFrame(ElementStates.Default))
    }, DELAY_IN_MS)
  }

  const removeTailButton = () => {
    let frame = listFrame(ElementStates.Default);
    frame[list.getSize() - 1].push([formState['linkedListValue'], ElementStates.Changing]);
    setAnimation(frame);

    setTimeout(() => {
      list.removeAt(list.getSize() - 1);
      setAnimation(listFrame(ElementStates.Default))
    }, DELAY_IN_MS)
  }

  const addTailButton = () => {
    let frame = listFrame(ElementStates.Default);
    frame[list.getSize() - 1].push([formState['linkedListValue'], ElementStates.Changing]);
    setAnimation(frame);

    setTimeout(() => {
      list.insertAt(formState['linkedListValue'], list.getSize());
      setFormState(prevState => ({...prevState, 'linkedListValue': ''}));
      setAnimation(listFrame(ElementStates.Modified, list.getSize()))
    }, DELAY_IN_MS);

    setTimeout(() => {
      setAnimation(listFrame(ElementStates.Default));
    }, DELAY_IN_MS * 2)
  }

  const addByIdxButton = () => {
    const idx = +formState['linkedListIdx'];
    setFormState(prevState => ({...prevState, 'linkedListIdx': ''}));

    for (let i = 0; i <= idx; i++) {
      let frame: (string | [string, ElementStates])[][] = listFrame(ElementStates.Changing, i);

      if (i > 0) {
        frame[i - 1].pop();
        frame = listFrameUpdate(ElementStates.Changing, i - 1, frame as [string, ElementStates][][]);
      }

      frame[i].push([formState['linkedListValue'], ElementStates.Changing]);

      setTimeout(() => {
        setAnimation(frame);
      }, i * DELAY_IN_MS)
    }

    setTimeout(() => {
      list.insertAt(formState['linkedListValue'], idx);
      setFormState(prevState => ({...prevState, 'linkedListValue': ''}));
      let frame = listFrame(ElementStates.Modified, idx);
      setAnimation(frame)
    }, DELAY_IN_MS * (idx + 1))

    setTimeout(() => {
      setAnimation(listFrame(ElementStates.Default))
    }, DELAY_IN_MS * (idx + 2))
  }

  const removeByIdxButton = () => {
    const idx = +formState['linkedListIdx'];
    setFormState(prevState => ({...prevState, 'linkedListIdx': ''}));
      
    for (let i = 0; i <= idx; i++) {
      let frame: (string | [string, ElementStates])[][] = listFrame(ElementStates.Changing, i);

      if (i > 0) {
        frame = listFrameUpdate(ElementStates.Changing, i - 1, frame as [string, ElementStates][][]);
      }

      setTimeout(() => {
        setAnimation(frame);
      }, i * DELAY_IN_MS)
    }

    setTimeout(() => {
      let frame = listFrame(ElementStates.Default);
      frame = listFrameUpdate(ElementStates.Changing, idx, frame as [string, ElementStates][][]);
      setAnimation(frame)
    }, DELAY_IN_MS * (idx + 2))

    setTimeout(() => {
      list.removeAt(idx);
      setFormState(prevState => ({...prevState, 'linkedListValue': ''}));
      setAnimation(listFrame(ElementStates.Default))
    }, DELAY_IN_MS * (idx + 3))
  }

  const listFrame = (state: ElementStates, changeIdx: null | number = null) => list.print().map((val, idx) => [val, idx === changeIdx ? state : ElementStates.Default]);

  const listFrameUpdate = (newState: ElementStates, changeIdx: null | number = null, array: [string, ElementStates][][]) => array.map((element, idx) => [element[0], changeIdx && idx <= changeIdx ? newState : element[1]])

  return (
    <SolutionLayout title="Связный список">
      <InterfaceInput type='linkedList' setActive={setActive} active={active} setFormState={setFormState} formState={formState} addHeadButton={addHeadButton} addTailButton={addTailButton} removeHeadButton={removeHeadButton} removeTailButton={removeTailButton} addByIdxButton={addByIdxButton} removeByIdxButton={removeByIdxButton} />
      <InterfaceOutput type='linkedList' linkedListAnimation={linkedListAnimation} />
    </SolutionLayout>
  );
};
