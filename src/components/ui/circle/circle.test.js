import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";
import { render } from '@testing-library/react';

describe('Компонент Circle', () => {
  test('Отрисовка круга: Без текста', () => {
    const {asFragment} = render(<Circle />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка круга: С текстом', () => {
    const {asFragment} = render(<Circle letter="1" />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });
  
  test('Отрисовка круга: С Head', () => {
    const {asFragment} = render(<Circle head={'head'} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка круга: С Tail', () => {
    const {asFragment} = render(<Circle tail={'tail'} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка круга: С элементом в Head', () => {
    const {asFragment} = render(<Circle head={<Circle isSmall={true} letter='1' />}/>)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка круга: С элементом в Tail', () => {
    const {asFragment} = render(<Circle tail={<Circle isSmall={true} letter='1' />} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка круга: С индексом', () => {
    const {asFragment} = render(<Circle index={'1'} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка круга: В уменьшенной версии', () => {
    const {asFragment} = render(<Circle isSmall={true} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка круга: В дефолтном состоянии', () => {
    const {asFragment} = render(<Circle state={ElementStates.Default} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка круга: В изменяющемся состоянии', () => {
    const {asFragment} = render(<Circle state={ElementStates.Changing} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка круга: В модифицированном состоянии', () => {
    const {asFragment} = render(<Circle state={ElementStates.Modified} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });
})