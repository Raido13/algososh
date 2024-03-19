import { FC } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { RadioInput } from '../ui/radio-input/radio-input';
import styles from './interface-input.module.css';
import { Direction } from "../../types/direction";

export const InterfaceInput: FC<{type: string}> = ({type}) => {
  // const state: {[key: string]: string} = 

  switch(type) {
    case 'string': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <div className={styles.container_12pt}>
            <Input maxLength={11} />
            <Button text="Развернуть" />
          </div>
        </div>
      </div>
    );
    case 'finobacci': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <div className={styles.container_12pt}>
            <Input max={19} />
            <Button text="Рассчитать" />
          </div>
        </div>
      </div>
    );
    case 'arraySort': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <div className={styles.container_80pt}>
            <div className={styles[`${`container_${type}`}`]}>
              <div className={styles.container_52pt}>
                <div className={styles.container_40pt}>
                  <RadioInput label="Выбор" />
                  <RadioInput label="Пузырёк" />
                </div>
                <div className={styles.container_12pt}>
                  <Button text="По возрастанию" sorting={Direction.Ascending} />
                  <Button text="По убыванию" sorting={Direction.Descending} />
                </div>
              </div>
            </div>
            <Button text="Новый массив" />
          </div>
        </div>
      </div>
    )
    case 'stack': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <div className={styles.container_80pt}>
            <div className={`${styles.container_12pt} ${styles[`${`container_${type}`}`]}`}>
              <Input maxLength={4} />
              <Button text="Добавить" type="submit" />
              <Button text="Удалить" type="submit" />
            </div>
            <Button text="Очистить" type="reset" />
          </div>
        </div>
      </div>
    );
    case 'queue': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <div className={styles.container_80pt}>
            <div className={`${styles.container_12pt} ${styles[`${`container_${type}`}`]}`}>
              <Input maxLength={4} placeholder="Введите значение" />
              <Button text="Добавить" type="submit" />
              <Button text="Удалить" type="submit" />
            </div>
            <Button text="Очистить" type="reset" />
          </div>
        </div>
      </div>
    );
    case 'linkedList': return (
      <div className={styles.interfaceInput}>
        <div className={styles[`${`interfaceInput_${type}`}`]}>
          <div className={styles.interfaceHalf}>
            <div className={styles.container_12pt}>
              <div className={styles[`${`container_${type}`}`]}>
                <Input maxLength={4} placeholder="Введите значение" />
              </div>
              <Button text="Добавить в head" linkedList="small" type="submit" />
              <Button text="Добавить в tail" linkedList="small" type="submit" />
              <Button text="Удалить из head" linkedList="small" type="submit" />
              <Button text="Удалить из tail" linkedList="small" type="submit" />
            </div>
            <div className={styles.container_12pt}>
              <div className={styles[`${`container_${type}`}`]}>
                <Input placeholder="Введите индекс" />
              </div>
              <Button text="Добавить по индексу" linkedList="big" type="submit" />
              <Button text="Удалить по индексу" linkedList="big" type="submit" />
            </div>
          </div>
        </div>
      </div>
    );
    default: return <h3>No props</h3>
  }
}