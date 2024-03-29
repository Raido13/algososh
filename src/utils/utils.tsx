import { ReactElement } from "react";
import { Circle } from "../components/ui/circle/circle";
import { Direction } from "../types/direction";
import { ElementStates } from "../types/element-states";
import { AnimationFrame } from "../types/types";

export const reverse = (string: string): AnimationFrame[] => {
  if (!string) return [];

  let array = string.split('');
  let animation: AnimationFrame[] = [];
  
  animation.push(array.map(letter => [letter, ElementStates.Default] as [string, ElementStates]));
  
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    let swapAnimation = animation[animation.length - 1].map((it, idx) => {
      if (idx === start || idx === end) {
        return [it[0], ElementStates.Changing] as [string, ElementStates]
      }
      return it
    });

    animation.push(swapAnimation);

    [array[start], array[end]] = [array[end], array[start]];

    let modifiedAnimation = swapAnimation.map((it, idx) => {
      if (idx === start || idx === end) {
        return [array[idx], ElementStates.Modified] as [string, ElementStates]
      }
      return it
    });

    animation.push(modifiedAnimation);

    ++start;
    --end
  }

  return animation
}

export const fibonacci = (number: number): number[][] => {
  if (!number) return [];
  let array: number[] = [0, 1];

  for (let i = 2; i < number + 2; i++) {
    array.push(array[i - 2] + array[i - 1]);
  }

  array.shift();

  const res: number[][] = [[array[0]]];

  for (let i = 1; i < number + 1; i++) {
    const temp = [...res[res.length - 1], array[i]];
    res.push(temp)
  }

  return res
}

export const createInitialArray = (array: number[] = [], minLen = 3, maxLen = 17, min = 0, max = 101): number[] => {
  const arrLength = Math.floor(Math.random() * (maxLen - minLen) + minLen)
  for (let i = 0; i <= arrLength; i++) {
    array.push(Math.floor(Math.random() * (max - min) + min))
  }
  return array
}

export const createInitialAnimation = (array: number[]): AnimationFrame => array.map(num => [num, ElementStates.Default]);

export const choiseSort = (array: number[], direction: Direction): AnimationFrame[] => {
  const {length} = array;
  let animationFrames: AnimationFrame[] = [];
  let currentState: AnimationFrame = createInitialAnimation(array);

  for (let i = 0; i < length - 1; i++) {
    let maxIdx = i;

    for (let k = maxIdx + 1; k < length; k++) {
      let comprassionFrame: AnimationFrame = currentState.map(([val, state], idx) => [val, idx === i || idx === k ? ElementStates.Changing : state]);
      animationFrames.push(comprassionFrame);

      if (direction === Direction.Ascending ? array[k] < array[maxIdx] : array[k] > array[maxIdx]) {
        maxIdx = k;
      }
    }

    if (maxIdx !== i) {
      [array[i], array[maxIdx]] = [array[maxIdx], array[i]];
      [currentState[i], currentState[maxIdx]] = [[array[i], ElementStates.Default], [array[maxIdx], ElementStates.Default]];

      let postSwapFrame: AnimationFrame = currentState.map(([val, state], idx) => [val, idx === i ? ElementStates.Modified : state]);
      animationFrames.push(postSwapFrame);
    }
    currentState[i] = [array[i], ElementStates.Modified];
  }

  currentState[array.length - 1][1] = ElementStates.Modified;
  animationFrames.push(currentState);

  return animationFrames;
};

export const bubbleSort = (array: number[], direction: Direction): AnimationFrame[] => {
  const {length} = array;
  let animationFrames: AnimationFrame[] = [];
  let currentState: AnimationFrame = createInitialAnimation(array);
  let sorted = false;

  for (let i = 0; i < length - 1; i++) {
    sorted = true

    for (let k = 0; k < length - i - 1; k++) {
      let comparisonFrame: AnimationFrame = currentState.map(([val], idx) =>
        idx === k || idx === k + 1 ? [val, ElementStates.Changing] : idx > length - i - 1 ? [val, ElementStates.Modified] : [val, ElementStates.Default]);
      animationFrames.push(comparisonFrame)

      if (direction === Direction.Ascending ? array[k] > array[k + 1] : array[k] < array[k + 1]) {
        sorted = false;
        [array[k], array[k + 1]] = [array[k + 1], array[k]];
        [comparisonFrame[k], comparisonFrame[k + 1]] = [[array[k], ElementStates.Changing], [array[k + 1], ElementStates.Changing]]
        animationFrames.push(comparisonFrame)
      }

      currentState[k] = [array[k], ElementStates.Default];
      
      if (k === length - i - 2) currentState[k + 1] = [array[k + 1], ElementStates.Modified]
    }

    if (sorted) break;

    currentState[length - i - 1] = [array[length - i - 1], ElementStates.Modified];
  }

  let finalFrame: AnimationFrame = array.map((num) => [num, ElementStates.Modified]);
  animationFrames.push(finalFrame);

  return animationFrames
}

export const getSmallCircle = (value: string, state: ElementStates): string | ReactElement => <Circle state={state} letter={value} isSmall={true} />

export const delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))