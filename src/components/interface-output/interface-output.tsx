import { FC } from "react";
import styles from './interface-output.module.css';
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { AnimationFrame } from "../../types/types";
import { getSmallCircle } from "../../utils/utils";

interface IInterfaceOutputProps {
  type: string,
  reverseAnimation?: AnimationFrame,
  fibonacciAnimation?: number[],
  sortingAnimation?: AnimationFrame,
  stackAnimation?: AnimationFrame,
  queueAnimation?: AnimationFrame,
  linkedListAnimation? : (string | [string, ElementStates])[][],
  queueHead?: number,
  isHead?: boolean,
  queueTail?: number,
  isAdding?: boolean
}

export const InterfaceOutput: FC<IInterfaceOutputProps> = ({type, reverseAnimation, fibonacciAnimation, sortingAnimation, stackAnimation, queueAnimation, linkedListAnimation, queueHead, isHead, queueTail, isAdding}) => {
  
  switch(type) {
    case 'string': return (
      <div className={styles.interfaceOutput}>
        <div className={styles[`${`interfaceOutput_${type}`}`]}>
          {reverseAnimation?.length && reverseAnimation.map((frame, idx) => <Circle state={frame[1]} letter={frame[0] as string} key={idx} />)}
        </div>
      </div>
    );
    case 'fibonacci': return (
      <div className={styles.interfaceOutput}>
        <div className={styles[`${`interfaceOutput_${type}`}`]}>
          {fibonacciAnimation?.length && fibonacciAnimation.map((frame, idx) => <Circle letter={String(frame)} key={idx} index={idx} />)}
        </div>
      </div>
    );
    case 'arraySort': return (
      <div className={styles.interfaceOutput}>
        <div className={styles[`${`interfaceOutput_${type}`}`]}>
          {sortingAnimation?.length && sortingAnimation.map((frame, idx) => <Column state={frame[1] as ElementStates} key={idx} index={frame[0] as number} />)}
        </div>
      </div>
    );
    case 'stack': return (
      <div className={styles.interfaceOutput}>
        <div className={styles[`${`interfaceOutput_${type}`}`]}>
          {stackAnimation && stackAnimation.length !== null && stackAnimation.map((frame, idx) => <Circle state={frame[1] as ElementStates} letter={frame[0] as string} index={idx} head={idx === stackAnimation.length - 1 ? 'top' : ''} key={idx} />)}
        </div>
      </div>
    );
    case 'queue': return (
      <div className={styles.interfaceOutput}>
        <div className={styles[`${`interfaceOutput_${type}`}`]}>
          {queueAnimation && queueAnimation.length !== null && queueAnimation.map((frame, idx) => <Circle state={frame[1] as ElementStates} letter={frame[0] as string} index={idx} head={idx === queueHead && isHead ? 'head' : ''} tail={idx === queueTail && frame[0] ? 'tail' : ''} key={idx} />)}
        </div>
      </div>
    );
    case 'linkedList': return (
      <div className={styles.interfaceOutput}>
        <div className={styles[`${`interfaceOutput_${type}`}`]}>
          {linkedListAnimation && linkedListAnimation.length !== null && linkedListAnimation.map((frame, idx) => <Circle state={frame[1] as ElementStates} letter={frame[0] as string} index={idx} head={frame.length > 2 ? isAdding ? getSmallCircle(frame[2][0] as string, frame[2][1] as ElementStates) : idx === 0 ? 'head' : '' : idx === 0 ? 'head' : ''} tail={frame.length > 2 ? !isAdding ? getSmallCircle(frame[2][0] as string, frame[2][1] as ElementStates) : idx === linkedListAnimation.length - 1 ? 'tail' : '' : idx === linkedListAnimation.length - 1 ? 'tail' : ''} key={idx} />)}
        </div>
      </div>
    );
    default: return <h3>No props</h3>
  }
}