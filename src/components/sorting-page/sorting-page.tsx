import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { AnimationFrame, TSetActive } from "../../types/types";
import { Sort } from "../../types/sort";
import { Direction } from "../../types/direction";
import { createInitialAnimation, createInitialArray, delay } from "../../utils/utils";
import { choiseSort } from "../../utils/utils";
import { bubbleSort } from "../../utils/utils";
import { DELAY_IN_MS} from "../../constants/delays";
import { InterfaceOutput } from '../interface-output/interface-output';

export const SortingPage: React.FC<{setActive: TSetActive, active: boolean}> = ({setActive, active})  => {
  const [sort, setSort] = useState<{type: Sort, direction: Direction, array: number[]}>({ type: Sort.Choise, direction: Direction.Ascending, array: [] });
  const [sortingAnimation, setAnimation] = useState<AnimationFrame>([]);

  const changeRadio = (newType: Sort) => {
    setSort({...sort, type: newType})
    setAnimation(createInitialAnimation(sort.array))
  }

  const changeDirection = async (newDirection: Direction) => {
    setSort({...sort, direction: newDirection});
    setAnimation(createInitialAnimation(sort.array));
    setActive(true);

    const animations = sort.type === Sort.Choise
          ? choiseSort(sort.array, newDirection)
          : bubbleSort(sort.array, newDirection);

    for (let i = 0; i < animations.length; i++) {
      await delay(DELAY_IN_MS);
      setAnimation(animations[i]);
      if(i === animations.length - 1) {
        setActive(false)
      }
    }
  }

  const resetArray = () => {
    const initialArray = createInitialArray();
    setSort({ ...sort, array: initialArray });
    setAnimation(createInitialAnimation(initialArray))
  }

  if (sortingAnimation.length === 0) resetArray();

  useEffect(() => () => {
    setActive(false);
    setAnimation([])
  }, [])

  return (
    <SolutionLayout title="Сортировка массива">
      <InterfaceInput type='arraySort' sort={sort} changeRadio={changeRadio} changeDirection={changeDirection} resetArray={resetArray} active={active} />
      <InterfaceOutput type="arraySort" sortingAnimation={sortingAnimation} />
    </SolutionLayout>
  );
};
