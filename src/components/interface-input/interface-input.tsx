import { ChangeEvent, FC, FormEvent, MouseEvent, useEffect } from "react";
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
  addToStack?: () => void,
  removeFromStack?: () => void,
  clearStack?: () => void,
}

export const InterfaceInput: FC<IInterfaceInputProps> = ({type, setActive, active, setFormState, formState, sort, changeRadio, changeDirection, resetArray, addToStack, removeFromStack}) => {
  const fillForm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormState && setFormState(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive && setActive(true);
  }

  const resetForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive && setActive(false);
  }

  useEffect(() => {
    setFormState && setFormState(prevState => ({...prevState, [type]: ''}));
    return () => setFormState && setFormState({});
  }, [setFormState, type]);

  switch(type) {
    case 'string': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_12pt} onSubmit={submitForm}>
            <Input isLimitText={true} maxLength={11} name={type} onChange={fillForm} />
            <Button text="Развернуть" type="submit" isLoader={active} disabled={formState && (active || formState[type] === '')} />
          </form>
        </div>
      </div>
    );
    case 'fibonacci': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_12pt} onSubmit={submitForm}>
            <Input isLimitText={true} type={'other'} name={type} max={19} onChange={fillForm} />
            <Button text="Рассчитать" type="submit" isLoader={active} disabled={formState && (active || formState[type] === '')} />
          </form>
        </div>
      </div>
    );
    case 'arraySort': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_80pt} onSubmit={submitForm}>
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
          <form className={styles.container_80pt} onSubmit={submitForm} onReset={resetForm}>
            <div className={`${styles.container_12pt} ${styles[`${`container_${type}`}`]}`}>
              <Input name={type} maxLength={4} onChange={fillForm} />
              <Button text="Добавить" type="button" onClick={() => addToStack && addToStack()} />
              <Button text="Удалить" type="button" onClick={() => removeFromStack && removeFromStack()} />
            </div>
            <Button text="Очистить" type="button" onClick={() => resetArray && resetArray()} />
          </form>
        </div>
      </div>
    );
    case 'queue': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <form className={styles.container_80pt} onSubmit={submitForm} onReset={resetForm}>
            <div className={`${styles.container_12pt} ${styles[`${`container_${type}`}`]}`}>
              <Input name={type} maxLength={4} placeholder="Введите значение" onChange={fillForm} />
              <Button text="Добавить" type="submit" />
              <Button text="Удалить" type="submit" />
            </div>
            <Button text="Очистить" type="reset" />
          </form>
        </div>
      </div>
    );
    case 'linkedList': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <div className={styles.interfaceHalf}>
            <form className={styles.container_12pt} onSubmit={submitForm}>
              <div className={styles[`${`container_${type}`}`]}>
                <Input name={`${type}Value`} maxLength={4} placeholder="Введите значение" onChange={fillForm} />
              </div>
              <Button text="Добавить в head" linkedList="small" type="submit" />
              <Button text="Добавить в tail" linkedList="small" type="submit" />
              <Button text="Удалить из head" linkedList="small" type="submit" />
              <Button text="Удалить из tail" linkedList="small" type="submit" />
            </form>
            <form className={styles.container_12pt} onSubmit={submitForm}>
              <div className={styles[`${`container_${type}`}`]}>
                <Input name={`${type}Idx`} type='number' placeholder="Введите индекс" onChange={fillForm} />
              </div>
              <Button text="Добавить по индексу" linkedList="big" type="submit" />
              <Button text="Удалить по индексу" linkedList="big" type="submit" />
            </form>
          </div>
        </div>
      </div>
    );
    default: return <h3>No props</h3>
  }
}