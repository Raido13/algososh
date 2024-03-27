import { ChangeEvent, FC } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { RadioInput } from '../ui/radio-input/radio-input';
import styles from './interface-input.module.css';
import { Direction } from "../../types/direction";
import { TFormState, TSetActive, TSetFormState } from "../../types/types";
import { Sort } from "../../types/sort";

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
}

export const InterfaceInput: FC<IInterfaceInputProps> = ({type, setActive, active, setFormState, formState, sort, changeRadio, changeDirection, resetArray, addButton, removeButton, clearButton, addHeadButton, removeHeadButton, addTailButton, removeTailButton, addByIdxButton, removeByIdxButton}) => {
  const fillForm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormState && setFormState(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  switch(type) {
    case 'string': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_12pt}>
            <Input isLimitText={true} value={formState && formState[type]} maxLength={11} name={type} onChange={fillForm} />
            <Button text="Развернуть" type="button" isLoader={active} disabled={formState && formState[type] === ''} onClick={() => setActive && setActive(true)} />
          </form>
        </div>
      </div>
    );
    case 'fibonacci': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_12pt}>
            <Input isLimitText={true} value={formState && formState[type]} type={'other'} name={type} max={19} onChange={fillForm} />
            <Button text="Рассчитать" type="button" isLoader={active} disabled={formState && formState[type] === ''} onClick={() => setActive && setActive(true)} />
          </form>
        </div>
      </div>
    );
    case 'arraySort': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_80pt}>
            <div className={styles[`${`container_${type}`}`]}>
              <div className={styles.container_52pt}>
                <div className={styles.container_40pt}>
                  <RadioInput label="Выбор" checked={sort && sort.type === Sort.Choise} onChange={() => changeRadio && changeRadio(Sort.Choise)} />
                  <RadioInput label="Пузырёк" checked={sort && sort.type === Sort.Bubble} onChange={() => changeRadio && changeRadio(Sort.Bubble)} />
                </div>
                <div className={styles.container_12pt}>
                  <Button text="По возрастанию" sorting={Direction.Ascending} type="button" onClick={() => changeDirection && changeDirection(Direction.Ascending)} />
                  <Button text="По убыванию" sorting={Direction.Descending} type="button" onClick={() => changeDirection && changeDirection(Direction.Descending)} />
                </div>
              </div>
            </div>
            <Button text="Новый массив" type="button" onClick={() => resetArray && resetArray()} />
          </form>
        </div>
      </div>
    );
    case 'stack': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_80pt}>
            <div className={`${styles.container_12pt} ${styles[`${`container_${type}`}`]}`}>
              <Input name={type} value={formState && formState[type]} maxLength={4} onChange={fillForm} />
              <Button text="Добавить" type="button" disabled={formState && formState[type] === ''} onClick={() => addButton && addButton()} />
              <Button text="Удалить" type="button" onClick={() => removeButton && removeButton()} />
            </div>
            <Button text="Очистить" type="button" onClick={() => clearButton && clearButton()} />
          </form>
        </div>
      </div>
    );
    case 'queue': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_80pt}>
            <div className={`${styles.container_12pt} ${styles[`${`container_${type}`}`]}`}>
              <Input name={type} value={formState && formState[type]} maxLength={4} placeholder="Введите значение" onChange={fillForm} />
              <Button text="Добавить" disabled={formState && formState[type] === ''} onClick={() => addButton && addButton()} type="submit" />
              <Button text="Удалить" type="button" onClick={() => removeButton && removeButton()} />
            </div>
            <Button text="Очистить" type="button" onClick={() => clearButton && clearButton()} />
          </form>
        </div>
      </div>
    );
    case 'linkedList': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <div className={styles.interfaceHalf}>
            <form className={styles.container_12pt}>
              <div className={styles[`${`container_${type}`}`]}>
                <Input name={`${type}Value`} value={formState && formState[`${type}Value`]} maxLength={4} placeholder="Введите значение" onChange={fillForm} />
              </div>
              <Button text="Добавить в head" linkedList="small" type="button" onClick={() => addHeadButton && addHeadButton()} />
              <Button text="Добавить в tail" linkedList="small" type="button" onClick={() => addTailButton && addTailButton()} />
              <Button text="Удалить из head" linkedList="small" type="button" onClick={() => removeHeadButton && removeHeadButton()} />
              <Button text="Удалить из tail" linkedList="small" type="button" onClick={() => removeTailButton && removeTailButton()} />
            </form>
            <form className={styles.container_12pt}>
              <div className={styles[`${`container_${type}`}`]}>
                <Input name={`${type}Idx`} value={formState && formState[`${type}Idx`]} type='number' placeholder="Введите индекс" onChange={fillForm} />
              </div>
              <Button text="Добавить по индексу" linkedList="big" type="button" onClick={() => addByIdxButton && addByIdxButton()} />
              <Button text="Удалить по индексу" linkedList="big" type="button" onClick={() => removeByIdxButton && removeByIdxButton()} />
            </form>
          </div>
        </div>
      </div>
    );
    default: return <h3>No props</h3>
  }
}