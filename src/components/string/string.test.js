import { ElementStates } from "../../types/element-states";
import { reverse } from "../../utils/utils";

describe('Функция разворота строки', () => {
  test('Пустая строка', () => expect(reverse('')).toStrictEqual([]));

  test('Строка с одним символом', () => {
    const result  = reverse('a');
    const { length } = result;
    expect(result[length - 1]).toStrictEqual([['a', ElementStates.Modified]])
  });

  test('Корректный разворот строки четное количество символов', () => {
    const result  = reverse('asdf');
    const { length } = result;
    expect(result[length - 1]).toStrictEqual([['f', ElementStates.Modified], ['d', ElementStates.Modified], ['s', ElementStates.Modified], ['a', ElementStates.Modified]])
  });

  test('Корректный разворот строки нечетное количество символов', () => {
    const result  = reverse('asdfg');
    const { length } = result;
    expect(result[length - 1]).toStrictEqual([['g', ElementStates.Modified], ['f', ElementStates.Modified], ['d', ElementStates.Modified], ['s', ElementStates.Modified], ['a', ElementStates.Modified]])
  });
})