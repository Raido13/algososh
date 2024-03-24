import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { TSetActive } from "../../types/types";
import { Sort } from "../../types/sort";
import { Direction } from "../../types/direction";
import { createInitialAnimation, createInitialArray } from "../../utils/utils";
import { choiseSort } from "../../utils/utils";
import { bubbleSort } from "../../utils/utils";
import { DELAY_IN_MS} from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { InterfaceOutput } from '../interface-output/interface-output';

export const SortingPage: React.FC<{setActive: TSetActive, active: boolean}> = ({setActive, active})  => {
  const [sort, setSort] = useState<{type: Sort, direction: Direction, array: number[]}>({ type: Sort.Choise, direction: Direction.Ascending, array: [] });
  const [sortingAnimation, setAnimation] = useState<(number | ElementStates)[][]>([]);

  useEffect(() => {
    if(active) {
      const animations = sort.type === Sort.Choise
          ? choiseSort(sort.array, sort.direction)
          : bubbleSort(sort.array, sort.direction);
      animations.forEach((frame, i) => {
        setTimeout(() => {
          setAnimation(frame);
          if (i === animations.length - 1) {
            setActive(false)
          }
        }, i * DELAY_IN_MS)
      })
    }
  }, [active, sort.array, sort.type, sort.direction, setActive])

  const changeRadio = (newType: Sort) => {
    setSort({...sort, type: newType})
    setAnimation(createInitialAnimation(sort.array))
  }

  const changeDirection = (newDirection: Direction) => {
    setSort({...sort, direction: newDirection});
    setAnimation(createInitialAnimation(sort.array));
    setActive(true);
  }

  const resetArray = () => {
    const initialArray = createInitialArray();
    setSort({ ...sort, array: initialArray });
    setAnimation(createInitialAnimation(initialArray))
  }

  if (sortingAnimation.length === 0) resetArray();

  return (
    <SolutionLayout title="Сортировка массива">
      <InterfaceInput type='arraySort' sort={sort} changeRadio={changeRadio} changeDirection={changeDirection} resetArray={resetArray} active={active} />
      <InterfaceOutput type="arraySort" sortingAnimation={sortingAnimation} />
    </SolutionLayout>
  );
};
