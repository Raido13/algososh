import { choiseSort, bubbleSort, createInitialArray, createInitialAnimation } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

describe(`Страница 'Сортировка массива', тестирование функций`, () => {
  test('Тестирование функции инициализации числового массива', () => {
    const result = createInitialArray();
    const { length } = result;
    expect(length >= 3 && length <= 17).toStrictEqual(true)
    expect(result.map(it => it >= 0 && it <= 100).length).toStrictEqual(length);
  });

  test('Тестирование функции инициализации кадров', () => {
    const result = createInitialAnimation([1, 10, 100]);
    expect(result).toStrictEqual([[1, ElementStates.Default], [10, ElementStates.Default], [100, ElementStates.Default]])
  });

  test('Тестирование функции сортировки выбором пустого массива', () => expect(choiseSort([], Direction.Descending)).toStrictEqual([]));

  test('Тестирование функции сортировки пузырьком пустого массива', () => expect(bubbleSort([], Direction.Descending)).toStrictEqual([]));

  test('Тестирование функции сортировки выбором c 1 элементом', () => {
    const result = choiseSort([1], Direction.Descending);
    const { length } = result;
    expect(result[length - 1 ]).toStrictEqual([[1, ElementStates.Modified]])
  });

  test('Тестирование функции сортировки пузырьком с 1 элементом', () => {
    const result = bubbleSort([1], Direction.Descending);
    const { length } = result;
    expect(result[length - 1 ]).toStrictEqual([[1, ElementStates.Modified]])
  });

  test('Тестирование функции сортировки выбором', () => {
    const result = choiseSort([1, 10, 100], Direction.Descending);
    const { length } = result;
    expect(result[length - 1 ]).toStrictEqual([[100, ElementStates.Modified], [10, ElementStates.Modified], [1, ElementStates.Modified]])
  });

  test('Тестирование функции сортировки пузырьком', () => {
    const result = bubbleSort([1, 10, 100], Direction.Descending);
    const { length } = result;
    expect(result[length - 1 ]).toStrictEqual([[100, ElementStates.Modified], [10, ElementStates.Modified], [1, ElementStates.Modified]])
  })
})