import { Button } from "./button";
import { render } from '@testing-library/react';

describe('Компонент Button', () => {
  test('Отрисовка кнопки: Без текста', () => {
    const {asFragment} = render(<Button />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка кнопки: С текстом', () => {
    const {asFragment} = render(<Button text="Текст" />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });
  
  test('Отрисовка кнопки: Отключена', () => {
    const {asFragment} = render(<Button disabled={true} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка кнопки: Лоадер', () => {
    const {asFragment} = render(<Button isLoader={true} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка кнопки: Клик', () => {
    const {asFragment} = render(<Button onClick={() => jest.fn()} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  })
})