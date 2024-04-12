import { fibonacci } from "../../utils/utils";

describe(`Страница 'Последовательность Фибоначи', тестирование функции`, () => {
  test('Корректный вывод при целом зачении между 1 и 19', () => {
    const result = fibonacci(19);
    const { length } = result;
    expect(result[length - 1][length - 1]).toStrictEqual(6765)
  })
})