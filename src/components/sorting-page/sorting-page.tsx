import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { AnimationFrame, TSetActive } from "../../types/types";
import { Sort } from "../../types/sort";
import { Direction } from "../../types/direction";
import { createInitialAnimation, createInitialArray, delay } from "../../utils/utils";
import { choiseSort } from "../../utils/utils";
import { bubbleSort } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { InterfaceOutput } from '../interface-output/interface-output';
import { LoaderStates } from "../../types/element-states";

export const SortingPage: React.FC<{setActive: TSetActive, active: boolean}> = ({setActive, active})  => {
  const [sort, setSort] = useState<{type: Sort, direction: Direction, array: number[]}>({ type: Sort.Choise, direction: Direction.Ascending, array: [] });
  const [sortingAnimation, setAnimation] = useState<AnimationFrame>([]);
  const [loaderState, setLoaderState] = useState<LoaderStates | string>('');

  const changeRadio = (newType: Sort) => {
    setSort({...sort, type: newType})
    setAnimation(createInitialAnimation(sort.array))
  }

  const changeDirection = async (newDirection: Direction) => {
    setSort({...sort, direction: newDirection});
    setAnimation(createInitialAnimation(sort.array));
    setLoaderState(newDirection);
    setActive(true);

    const animations = sort.type === Sort.Choise
          ? choiseSort(sort.array, newDirection)
          : bubbleSort(sort.array, newDirection);

    for (let i = 0; i < animations.length; i++) {
      await delay(DELAY_IN_MS);
      setAnimation(animations[i]);
      if(i === animations.length - 1) {
        setActive(false);
        setLoaderState('')
      }
    }
  }

  const createInitialFrame = () => {
    const initialArray = createInitialArray();
    setSort({ ...sort, array: initialArray });
    return initialArray;
  }

  const resetArray = async () => {
    setLoaderState(LoaderStates.Reset);
    const initialArray = createInitialFrame();
    setActive(true);
    await delay(DELAY_IN_MS);
    setAnimation(createInitialAnimation(initialArray));
    setActive(false);
    setLoaderState('')
  }

  useEffect(() => {
    const initialArray = createInitialFrame();
    setAnimation(createInitialAnimation(initialArray));

    return () => {
      setActive(false);
      setAnimation([])
    }
  }, [])

  return (
    <SolutionLayout title="Сортировка массива">
      <InterfaceInput type='arraySort' sort={sort} changeRadio={changeRadio} changeDirection={changeDirection} resetArray={resetArray} active={active} loaderState={loaderState} />
      <InterfaceOutput type="arraySort" sortingAnimation={sortingAnimation} />
    </SolutionLayout>
  );
};
