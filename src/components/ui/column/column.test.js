import { ElementStates } from "../../../types/element-states";
import { Column } from "./column";
import { render } from '@testing-library/react';

describe('Компонент Column', () => {  
  test('Отрисовка круга: С индексом', () => {
    const {asFragment} = render(<Column index={'100'} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка круга: В дефолтном состоянии', () => {
    const {asFragment} = render(<Column state={ElementStates.Default} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка круга: В изменяющемся состоянии', () => {
    const {asFragment} = render(<Column state={ElementStates.Changing} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });

  test('Отрисовка круга: В модифицированном состоянии', () => {
    const {asFragment} = render(<Column state={ElementStates.Modified} />)
    expect(asFragment().firstChild).toMatchSnapshot();    
  });
})