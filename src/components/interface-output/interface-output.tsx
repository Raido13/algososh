import { FC } from "react";
import styles from './interface-output.module.css';
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { AnimationFrame } from "../../types/types";

interface IInterfaceOutputProps {
  type: string,
  reverseAnimation?: AnimationFrame,
  fibonacciAnimation?: number[],
  sortingAnimation?: AnimationFrame,
  stackAnimation?: AnimationFrame
}

export const InterfaceOutput: FC<IInterfaceOutputProps> = ({type, reverseAnimation, fibonacciAnimation, sortingAnimation, stackAnimation}) => {
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
          {stackAnimation?.length && stackAnimation.map((frame, idx) => <Circle state={frame[1] as ElementStates} letter={frame[0] as string} index={idx} head={stackAnimation.length - 1 ? 'top' : ''} key={idx} />)}
        </div>
      </div>
    );
    // case 'queue': return (

    // );
    // case 'linkedList': return (

    // );
    default: return <h3>No props</h3>
  }
}