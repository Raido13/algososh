import { FC } from "react";
import styles from './interface-output.module.css';
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";

interface IInterfaceOutputProps {
  type: string;
  reverseAnimation?: [string, ElementStates][];
  fibonacciAnimation?: number[],
  sortingAnimation?: [string, ElementStates][];
}

export const InterfaceOutput: FC<IInterfaceOutputProps> = ({type, reverseAnimation, fibonacciAnimation, sortingAnimation}) => {
  switch(type) {
    case 'string': return (
      <div className={styles.interfaceOutput}>
        <div className={styles[`${`interfaceOutput_${type}`}`]}>
          {reverseAnimation?.length && reverseAnimation.map((letter, idx) => <Circle state={letter[1]} letter={letter[0]} key={idx} />)}
        </div>
      </div>
    );
    case 'fibonacci': return (
      <div className={styles.interfaceOutput}>
        <div className={styles[`${`interfaceOutput_${type}`}`]}>
          {fibonacciAnimation?.length && fibonacciAnimation.map((number, idx) => <Circle letter={String(number)} key={idx} index={idx} />)}
        </div>
      </div>
    );
    case 'arraySort': return (
      <div className={styles.interfaceOutput}>
        <div className={styles[`${`interfaceOutput_${type}`}`]}>
          {sortingAnimation?.length && sortingAnimation.map((letter, idx) => <Column state={letter[1]} key={idx} index={idx} />)}
        </div>
      </div>
    );
    // case 'stack': return (

    // );
    // case 'queue': return (

    // );
    // case 'linkedList': return (

    // );
    default: return <h3>No props</h3>
  }
}