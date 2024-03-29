import { ChangeEvent, FC, FormEvent, useEffect } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { RadioInput } from '../ui/radio-input/radio-input';
import styles from './interface-input.module.css';
import { Direction } from "../../types/direction";
import { TFormState, TSetActive, TSetFormState } from "../../types/types";
import { Sort } from "../../types/sort";
import { LoaderStates } from "../../types/element-states";

interface IInterfaceInputProps {
  type: string,
  setActive?: TSetActive,
  active?: boolean,
  setFormState?: TSetFormState,
  formState?: TFormState,
  sort?: {type: Sort, direction: Direction, array: number[]},
  changeRadio?: (newType: Sort) => void,
  changeDirection?: (newDirection: Direction) => void,
  resetArray?: () => void,
  addButton?: () => void,
  removeButton?: () => void,
  clearButton?: () => void,
  addHeadButton?: () => void,
  removeHeadButton?: () => void,
  addTailButton?: () => void,
  removeTailButton?: () => void,
  addByIdxButton?: () => void,
  removeByIdxButton?: () => void,
  size?: boolean,
  loaderState?: LoaderStates | string,
  frameLength?: number,
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

export const InterfaceInput: FC<IInterfaceInputProps> = ({type, active, setFormState, formState, sort, changeRadio, changeDirection, resetArray, addButton, removeButton, clearButton, addHeadButton, removeHeadButton, addTailButton, removeTailButton, addByIdxButton, removeByIdxButton, size, loaderState, frameLength, onSubmit}) => {
  const fillForm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormState && setFormState(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  const fibonacciFillForm = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      e.target.value = e.target.value.slice(0, 2);
    } else if (+e.target.value > 19) {
      e.target.value = '19'
    } else if (+e.target.value < 1 && e.target.value !== '') {
      e.target.value = '1'
    }
    fillForm(e)
  }

  const conditionIdxAdd = (value: string, idx: string, length: number = frameLength ? frameLength : 0, isAdding: boolean): boolean => {
    if (+idx > length - 1) {
      return true
    } else if (value !== '' && idx !== '' && isAdding) {
      return false
    } else if (idx !== '' && !isAdding) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    return() => setFormState && setFormState({'stack': '', 'fibonacci': '', 'string': '', 'queue': '', 'linkedListValue': '', 'linkedListIdx': ''})
  }, [setFormState])

  switch(type) {
    case 'string': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_12pt} onSubmit={(e) => onSubmit && onSubmit(e)} >
            <Input isLimitText={true} value={formState && formState[type]} maxLength={11} name={type} onChange={fillForm} />
            <Button text="Развернуть" type="submit" isLoader={active} disabled={formState && formState[type] === ''} />
          </form>
        </div>
      </div>
    );
    case 'fibonacci': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_12pt} onSubmit={(e) => onSubmit && onSubmit(e)}>
            <Input isLimitText={true} value={formState && formState[type]} type='number' name={type} max={19} onChange={fibonacciFillForm} />
            <Button text="Рассчитать" type="submit" isLoader={active} disabled={formState && (formState[type] === '' || +formState[type] > 19 || +formState[type] < 1)} />
          </form>
        </div>
      </div>
    );
    case 'arraySort': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_80pt} onSubmit={e => e.preventDefault()}>
            <div className={styles[`${`container_${type}`}`]}>
              <div className={styles.container_52pt}>
                <div className={styles.container_40pt}>
                  <RadioInput label="Выбор" disabled={active} checked={sort && sort.type === Sort.Choise} onChange={() => changeRadio && changeRadio(Sort.Choise)} />
                  <RadioInput label="Пузырёк" disabled={active} checked={sort && sort.type === Sort.Bubble} onChange={() => changeRadio && changeRadio(Sort.Bubble)} />
                </div>
                <div className={styles.container_12pt}>
                  <Button text="По возрастанию" isLoader={active && sort?.direction === Direction.Ascending} disabled={active} sorting={Direction.Ascending} type="button" onClick={() => changeDirection && changeDirection(Direction.Ascending)} />
                  <Button text="По убыванию" isLoader={active && sort?.direction === Direction.Descending} disabled={active} sorting={Direction.Descending} type="button" onClick={() => changeDirection && changeDirection(Direction.Descending)} />
                </div>
              </div>
            </div>
            <Button text="Новый массив" disabled={active} type="button" onClick={() => resetArray && resetArray()} />
          </form>
        </div>
      </div>
    );
    case 'stack': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_80pt} onSubmit={e => e.preventDefault()}>
            <div className={`${styles.container_12pt} ${styles[`${`container_${type}`}`]}`}>
              <Input isLimitText={true} name={type} value={formState && formState[type]} maxLength={4} onChange={fillForm} />
              <Button text="Добавить" type="button" isLoader={loaderState === LoaderStates.Add} disabled={formState && formState[type] === ''} onClick={() => addButton && addButton()} />
              <Button text="Удалить" type="button" isLoader={loaderState === LoaderStates.Remove} disabled={active || size} onClick={() => removeButton && removeButton()} />
            </div>
            <Button text="Очистить" type="button" isLoader={loaderState === LoaderStates.Reset} disabled={active || size} onClick={() => clearButton && clearButton()} />
          </form>
        </div>
      </div>
    );
    case 'queue': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_80pt} onSubmit={e => e.preventDefault()}>
            <div className={`${styles.container_12pt} ${styles[`${`container_${type}`}`]}`}>
              <Input isLimitText={true} name={type} value={formState && formState[type]} maxLength={4} placeholder="Введите значение" onChange={fillForm} />
              <Button text="Добавить" isLoader={loaderState === LoaderStates.Add} disabled={formState && formState[type] === ''} onClick={() => addButton && addButton()} type="submit" />
              <Button text="Удалить" isLoader={loaderState === LoaderStates.Remove} disabled={active || size} type="button" onClick={() => removeButton && removeButton()} />
            </div>
            <Button text="Очистить" isLoader={loaderState === LoaderStates.Reset} disabled={active || size} type="button" onClick={() => clearButton && clearButton()} />
          </form>
        </div>
      </div>
    );
    case 'linkedList': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <div className={styles.interfaceHalf}>
            <form className={styles.container_12pt} onSubmit={e => e.preventDefault()}>
              <div className={styles[`${`container_${type}`}`]}>
                <Input isLimitText={true} name={`${type}Value`} value={formState && formState[`${type}Value`]} maxLength={4} placeholder="Введите значение" onChange={fillForm} />
              </div>
              <Button text="Добавить в head" disabled={formState && formState[`${type}Value`] === ''} isLoader={loaderState === LoaderStates.AddHead} linkedList="small" type="button" onClick={() => addHeadButton && addHeadButton()} />
              <Button text="Добавить в tail" disabled={formState && formState[`${type}Value`] === ''} isLoader={loaderState === LoaderStates.AddTail} linkedList="small" type="button" onClick={() => addTailButton && addTailButton()} />
              <Button text="Удалить из head" disabled={active || size} isLoader={loaderState === LoaderStates.RemoveHead} linkedList="small" type="button" onClick={() => removeHeadButton && removeHeadButton()} />
              <Button text="Удалить из tail" disabled={active || size} isLoader={loaderState === LoaderStates.RemoveTail} linkedList="small" type="button" onClick={() => removeTailButton && removeTailButton()} />
            </form>
            <form className={styles.container_12pt} onSubmit={e => e.preventDefault()}>
              <div className={styles[`${`container_${type}`}`]}>
                <Input name={`${type}Idx`} value={formState && formState[`${type}Idx`]} type='number' placeholder="Введите индекс" onChange={fillForm} />
              </div>
              <Button text="Добавить по индексу" disabled={formState && conditionIdxAdd(formState[`${type}Value`], formState[`${type}Idx`], frameLength, true)} isLoader={loaderState === LoaderStates.AddIdx} linkedList="big" type="button" onClick={() => addByIdxButton && addByIdxButton()} />
              <Button text="Удалить по индексу" disabled={formState && conditionIdxAdd(formState[`${type}Value`], formState[`${type}Idx`], frameLength, false)} isLoader={loaderState === LoaderStates.RemoveIdx} linkedList="big" type="button" onClick={() => removeByIdxButton && removeByIdxButton()} />
            </form>
          </div>
        </div>
      </div>
    );
    default: return <h3>No props</h3>
  }
}