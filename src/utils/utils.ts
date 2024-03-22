import { Direction } from "../types/direction";
import { ElementStates } from "../types/element-states";

export const reverse = (string: string): [string, ElementStates][][] => {
  if (!string) return [];

  let array = string.split('');
  let animation: [string, ElementStates][][] = [];
  
  animation.push(array.map(letter => [letter, ElementStates.Default] as [string, ElementStates]));
  
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    let swapAnimation = animation[animation.length - 1].map((it, idx) => {
      if (idx === start || idx === end) {
        return[it[0], ElementStates.Changing] as [string, ElementStates]
      }
      return it
    });

    animation.push(swapAnimation);

    [array[start], array[end]] = [array[end], array[start]];

    let modifiedAnimation = swapAnimation.map((it, idx) => {
      if (idx === start || idx === end) {
        return[array[idx], ElementStates.Modified] as [string, ElementStates]
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

export const createInitialArray = (array: number[] = [], minLen = 3, maxLen = 17, min = 0, max = 101) => {
  const arrLength = Math.floor(Math.random() * (maxLen - minLen) + minLen)
  for (let i = 0; i <= arrLength; i++) {
    array.push(Math.floor(Math.random() * (max - min) + min))
  }
  return array;
}

export const createInitialAnimation = (array: number[]) => array.map(num => [num, ElementStates.Default]);

export const choiseSort = (array: number[], direction: Direction): Array<Array<Array<number | string>>> => {
  let animationArray: Array<Array<Array<number | string>>> = [];
  animationArray.push(array.map(num => [num, ElementStates.Default]));
  let newAnimation;

  for (let i = 0; i < animationArray.length - 1; i++) {
    let maxIdx = i;

    for (let k = i + 1; k < animationArray.length; k++) {
      newAnimation = animationArray[animationArray.length - 1].map((it, idx) => idx === i || idx === k ? [it[0], ElementStates.Changing] : it);
      animationArray.push(newAnimation);

      if (direction === Direction.Ascending ? array[k] < array[maxIdx] : array[i] > array[maxIdx]) {
        maxIdx = k;
      }
    }

    [array[i], array[maxIdx]] = [array[maxIdx], array[i]];

    let modifiedAnimation = newAnimation && newAnimation.map((it, idx) => {
      return idx === i
          ? [array[i], ElementStates.Modified]
          : idx === maxIdx 
              ? [array[maxIdx], ElementStates.Default]
              : it
    });
    
    modifiedAnimation && animationArray.push(modifiedAnimation);
  }
  
  let finalAnimation = array.map((num) => [num, ElementStates.Modified]);
  animationArray.push(finalAnimation);

  return animationArray;
}

export const bubbleSort = (array: number[], direction: Direction): Array<Array<Array<number | string>>> => {
  let animationArray: Array<Array<Array<number | string>>> = [];
  animationArray.push(array.map(num => [num, ElementStates.Default]));
  let newAnimation;
  let length = animationArray.length;

  for (let i = 0; i < length; i++) {

    for (let k = 0; k < length - i - 1; k++) {
      newAnimation = animationArray[length - 1].map((it, idx) => idx === k || idx === k + 1 ? [it[0], ElementStates.Changing] : it);
      animationArray.push(newAnimation);

      if (direction === Direction.Ascending ? array[k] > array[k + 1] : array[k] < array[k + 1]) {
        [array[k], array[k + 1]] = [array[k + 1], array[k]];
        newAnimation = newAnimation && newAnimation.map((it, idx) => idx === k ? [array[k], ElementStates.Modified] : idx === k + 1 ? [array[k + 1], ElementStates.Modified] : it);

        animationArray.push(newAnimation);
      }
    }
    
    newAnimation = newAnimation && newAnimation.map((it, idx) => idx === length - i - 2 ? [array[0], ElementStates.Default] : idx === length - 1 ? [array[0], ElementStates.Modified] : it);

    newAnimation && animationArray.push(newAnimation)
  }

  return animationArray
}