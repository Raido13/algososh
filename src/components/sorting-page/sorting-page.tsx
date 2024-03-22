import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InterfaceInput } from "../interface-input/interface-input";
import { TSetActive } from "../../types/types";
import { Sort } from "../../types/sort";
import { Direction } from "../../types/direction";
import { createInitialAnimation, createInitialArray } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC<{setActive: TSetActive, active: boolean}> = ({setActive, active})  => {
  const [sort, setSort] = useState<{type: Sort, direction: Direction, array: number[]}>({ type: Sort.Choise, direction: Direction.Ascending, array: [] });
  const [sortingAnimation, setAnimation] = useState<(number | ElementStates)[]>([]);

  useEffect(() => {
    const initialArray = createInitialArray();
    setSort({ ...sort, array: initialArray });
    setAnimation(createInitialAnimation(initialArray)[0])
  }, [setSort, sort]);

  const changeRadio = (newType: Sort) => {
    setSort({...sort, type: newType})
    setAnimation(createInitialAnimation(sort.array)[0])
  }

  const changeDirection = (newDirection: Direction) => {
    setSort({...sort, direction: newDirection});
    setAnimation(createInitialAnimation(sort.array)[0])
    setActive(true);
  }

  const resetArray = () => {
    const newArray = createInitialArray();
    setSort({...sort, array: newArray});
    setAnimation(createInitialAnimation(newArray)[0])
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <InterfaceInput type='arraySort' sort={sort} changeRadio={changeRadio} changeDirection={changeDirection} resetArray={resetArray} active={active} />
    </SolutionLayout>
  );
};
