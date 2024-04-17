import { DELAY_IN_MS } from '../../src/constants/delays';
import { ElementStates } from '../../src/types/element-states';

describe(`Проверка работы страницы 'Связный список'`, () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it(`Проверка дизейбла кнопок 'Добавить в head', 'Добавить в tail' и 'Добавить по индексу', если инпут 'Введите значение' пуст`, () => {
    cy.get('input[placeholder*="Введите значение"]').should('be.empty');
    cy.contains('button', /добавить в head/i).should('be.disabled');
    cy.contains('button', /добавить в tail/i).should('be.disabled');
    cy.contains('button', /добавить по индексу/i).should('be.disabled')
  });

  it(`Проверка дизейбла кнопок 'Добавить по индексу' и 'Удалить по индексу', если инпут 'Введите индекс' пуст`, () => {
    cy.get('input[placeholder*="Введите индекс"]').should('be.empty');
    cy.contains('button', /добавить по индексу/i).should('be.disabled');
    cy.contains('button', /удалить по индексу/i).should('be.disabled')
  });

  it(`Проверка дизейбла кнопок 'Добавить по индексу' и 'Удалить по индексу', если в инпут 'Введите индекс' введено значение выше длины списка`, () => {
    cy.get('input[placeholder*="Введите индекс"]').type('6');
    cy.contains('button', /добавить по индексу/i).should('be.disabled')
  });

  it(`Проверка дизейбла кнопок 'Добавить по индексу' и 'Удалить по индексу', если в инпут 'Введите индекс' введено значение ниже длины списка`, () => {
    cy.get('input[placeholder*="Введите индекс"]').type('-1');
    cy.contains('button', /добавить по индексу/i).should('be.disabled')
  });

  // it(`Проверка дизейбла кнопок 'Удалить из head' и 'Удалить из tail' при пустом списке`, () => {
  //   let length = 5;
  //   let i = 0;

  //   while (i <= length) {
  //     cy.contains('button', /удалить из head/i).click();
  //     cy.wait(DELAY_IN_MS);
  //     i++;
  //   }

  //   cy.get('[class^="interface-output"]').find('[class^="circle_content"]').should('not.exist');
  //   cy.contains('button', /удалить из head/i).should('be.disabled');
  //   cy.contains('button', /удалить из tail/i).should('be.disabled')
  // });

  it(`Проверка отрисовки списка по умолчанию`, () => {
    const result = [
      [['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
    ];

    const { length } = result;

    const checkFrame = (index) => {
      if (index >= length) return;

      cy.get('[class^="interface-output"]').find('[class^="circle_content"]').each(($circleContent, idx, $list) => {
        cy.wrap($circleContent).find('[class^="circle_circle"]').should('have.text', result[index][idx][0]);
        cy.wrap($circleContent).find('[class*="circle_index"]').should('have.text', idx);
        cy.wrap($list[0]).find('[class*="circle_head"]').should('have.text', 'head');
        cy.wrap($list[$list.length - 1]).find('[class*="circle_tail"]').should('have.text', 'tail');
        cy.wrap($circleContent).find('[class^="circle_circle"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][1]}`);
      }); 
      cy.wait(DELAY_IN_MS).then(() => checkFrame(index + 1));
    }

    checkFrame(0);
  });

  it(`Проверка добавления элемента в head списка`, () => {
    const result = [
      [['1', ElementStates.Default, ['1', ElementStates.Changing]], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
      [['1', ElementStates.Modified], ['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
      [['1', ElementStates.Default], ['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
    ];

    const { length } = result;

    const checkFrame = (index) => {
      if (index >= length) return;

      if (index === 0) {
        cy.get('input[placeholder*="Введите значение"]').type('1');
        cy.contains('button', /добавить в head/i).click();
      }

      cy.get('[class^="interface-output"]').find('[class^="circle_circle"]').not('[class*="circle_small"]').parent().each(($circleContent, idx, $list) => {
        cy.wrap($circleContent).find('[class^="circle_circle"]').should('have.text', result[index][idx][0]);
        cy.wrap($circleContent).find('[class*="circle_index"]').should('have.text', idx);
        
        if (index === 0 && idx === 0) {
          cy.wrap($circleContent).find('[class*="circle_head"]').find('[class^="circle_circle"]').should('have.text', result[index][idx][2][0])
          cy.wrap($circleContent).find('[class*="circle_head"]').find('[class^="circle_circle"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][2][1]}`);
        } else if (index > 0) {
          cy.wrap($list[0]).find('[class*="circle_head"]').should('have.text', 'head')
        }

        cy.wrap($list[$list.length - 1]).find('[class*="circle_tail"]').should('have.text', 'tail');
        cy.wrap($circleContent).find('[class^="circle_circle"]').not('[class*="circle_small"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][1]}`);
      }); 
      cy.wait(DELAY_IN_MS).then(() => checkFrame(index + 1));
    }

    checkFrame(0);
  });

  it(`Проверка добавления элемента в tail списка`, () => {
    const result = [
      [['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default, ['6', ElementStates.Changing]]],
      [['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default], ['6', ElementStates.Modified]],
      [['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default], ['6', ElementStates.Default]],
    ];

    const { length } = result;

    const checkFrame = (index) => {
      if (index >= length) return;

      if (index === 0) {
        cy.get('input[placeholder*="Введите значение"]').type('6');
        cy.contains('button', /добавить в tail/i).click();
      }

      cy.get('[class^="interface-output"]').find('[class^="circle_circle"]').not('[class*="circle_small"]').parent().each(($circleContent, idx, $list) => {
        cy.wrap($circleContent).find('[class^="circle_circle"]').should('have.text', result[index][idx][0]);
        cy.wrap($circleContent).find('[class*="circle_index"]').should('have.text', idx);
        
        if (index === 0 && idx === $list.length) {
          cy.wrap($circleContent).find('[class*="circle_head"]').find('[class^="circle_small"]').should('have.text', result[index][idx][2][0])
          cy.wrap($circleContent).find('[class*="circle_head"]').find('[class^="circle_small"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][2][1]}`);
        } else if (index > 0) {
          cy.wrap($list[$list.length - 1]).find('[class*="circle_head"]').should('have.text', '')
        }

        cy.wrap($list[0]).find('[class*="circle_head"]').should('have.text', 'head');
        cy.wrap($circleContent).find('[class^="circle_circle"]').not('[class*="circle_small"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][1]}`);
      }); 
      cy.wait(DELAY_IN_MS).then(() => checkFrame(index + 1));
    }

    checkFrame(0);
  });

  it(`Проверка добавления элемента в список по индексу`, () => {
    const result = [
      [['1', ElementStates.Default, ['44', ElementStates.Changing]], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
      [['1', ElementStates.Changing], ['2', ElementStates.Default, ['44', ElementStates.Changing]], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
      [['1', ElementStates.Changing], ['2', ElementStates.Changing], ['3', ElementStates.Default, ['44', ElementStates.Changing]], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
      [['1', ElementStates.Changing], ['2', ElementStates.Changing], ['3', ElementStates.Changing], ['4', ElementStates.Default, ['44', ElementStates.Changing]], ['5', ElementStates.Default], ['6', ElementStates.Default]],
      [['1', ElementStates.Changing], ['2', ElementStates.Changing], ['3', ElementStates.Changing], ['4', ElementStates.Changing], ['5', ElementStates.Default, ['44', ElementStates.Changing]], ['6', ElementStates.Default]],
      [['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['44', ElementStates.Modified], ['5', ElementStates.Default], ['6', ElementStates.Default]],
      [['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['44', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
    ];

    const { length } = result[result.length - 1];

    const checkFrame = (index) => {
      if (index >= length) return;

      if (index === 0) {
        cy.get('input[placeholder*="Введите значение"]').type('44');
        cy.get('input[placeholder*="Введите индекс"]').type('4');
        cy.contains('button', /добавить по индексу/i).click();
      }

      cy.get('[class^="interface-output"]').find('[class^="circle_circle"]').not('[class*="circle_small"]').parent().each(($circleContent, idx, $list) => {
        cy.wrap($circleContent).find('[class^="circle_circle"]').not('[class*="circle_small"]').should('have.text', result[index][idx][0]);
        cy.wrap($circleContent).find('[class*="circle_index"]').should('have.text', idx);

        if (index !== 0) {
          cy.wrap($list[0]).find('[class*="circle_head"]').should('have.text', 'head')
        }
        
        if (idx === index && $list.length !== length) {
          cy.wrap($circleContent).find('[class*="circle_head"]').find('[class^="circle_circle"]').should('have.text', result[index][idx][2][0])
          cy.wrap($circleContent).find('[class*="circle_head"]').find('[class^="circle_circle"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][2][1]}`);          
        }

        cy.wrap($list[$list.length - 1]).find('[class*="circle_tail"]').should('have.text', 'tail');
        cy.wrap($circleContent).find('[class^="circle_circle"]').not('[class*="circle_small"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][1]}`);
      }); 
      cy.wait(DELAY_IN_MS).then(() => checkFrame(index + 1));
    }

    checkFrame(0);
  });

  it(`Проверка удаления элемента из head списка`, () => {
    const result = [
      [['1', ElementStates.Default, ['1', ElementStates.Changing]], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
      [['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
    ];

    const { length } = result;

    const checkFrame = (index) => {
      if (index >= length) return;

      if (index === 0) {
        cy.contains('button', /удалить из head/i).click();
      }

      cy.get('[class^="interface-output"]').find('[class^="circle_circle"]').not('[class*="circle_small"]').parent().each(($circleContent, idx, $list) => {
        cy.wrap($circleContent).find('[class^="circle_circle"]').should('have.text', result[index][idx][0]);
        cy.wrap($circleContent).find('[class*="circle_index"]').should('have.text', idx);
        
        if (index === 0 && idx === 0) {
          cy.wrap($circleContent).find('[class*="circle_tail"]').find('[class^="circle_circle"]').should('have.text', result[index][idx][2][0])
          cy.wrap($circleContent).find('[class*="circle_tail"]').find('[class^="circle_circle"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][2][1]}`);
        } else if (index > 0) {
          cy.wrap($list[0]).find('[class*="circle_tail"]').should('have.text', '')
        }

        cy.wrap($list[0]).find('[class*="circle_head"]').should('have.text', 'head');
        cy.wrap($circleContent).find('[class^="circle_circle"]').not('[class*="circle_small"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][1]}`);
      }); 
      cy.wait(DELAY_IN_MS).then(() => checkFrame(index + 1));
    }

    checkFrame(0);
  });

  it(`Проверка удаления элемента из tail списка`, () => {
    const result = [
      [['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default, ['6', ElementStates.Changing]]],
      [['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default]],
    ];

    const { length } = result;

    const checkFrame = (index) => {
      if (index >= length) return;

      if (index === 0) {
        cy.contains('button', /удалить из tail/i).click();
      }

      cy.get('[class^="interface-output"]').find('[class^="circle_circle"]').not('[class*="circle_small"]').parent().each(($circleContent, idx, $list) => {
        cy.wrap($circleContent).find('[class^="circle_circle"]').should('have.text', result[index][idx][0]);
        cy.wrap($circleContent).find('[class*="circle_index"]').should('have.text', idx);
        
        if (index === 0 && idx === $list.length - 1) {
          cy.wrap($circleContent).find('[class*="circle_tail"]').find('[class^="circle_circle"]').should('have.text', result[index][idx][2][0])
          cy.wrap($circleContent).find('[class*="circle_tail"]').find('[class^="circle_circle"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][2][1]}`);
        } else if (index > 0) {
          cy.wrap($list[$list.length - 1]).find('[class*="circle_tail"]').should('have.text', 'tail')
        }

        cy.wrap($list[0]).find('[class*="circle_head"]').should('have.text', 'head');
        cy.wrap($circleContent).find('[class^="circle_circle"]').not('[class*="circle_small"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][1]}`);
      }); 
      cy.wait(DELAY_IN_MS).then(() => checkFrame(index + 1));
    }

    checkFrame(0);
  });

  it(`Проверка удаления элемента из списка по индексу`, () => {
    const result = [
      [['1', ElementStates.Changing], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
      [['1', ElementStates.Changing], ['2', ElementStates.Changing], ['3', ElementStates.Default], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
      [['1', ElementStates.Changing], ['2', ElementStates.Changing], ['3', ElementStates.Changing], ['4', ElementStates.Default], ['5', ElementStates.Default], ['6', ElementStates.Default]],
      [['1', ElementStates.Changing], ['2', ElementStates.Changing], ['3', ElementStates.Changing], ['4', ElementStates.Changing], ['5', ElementStates.Default], ['6', ElementStates.Default]],
      [['1', ElementStates.Changing], ['2', ElementStates.Changing], ['3', ElementStates.Changing], ['4', ElementStates.Changing], ['5', ElementStates.Changing], ['6', ElementStates.Default]],
      [['1', ElementStates.Changing], ['2', ElementStates.Changing], ['3', ElementStates.Changing], ['4', ElementStates.Changing], ['', ElementStates.Default, ['5', ElementStates.Changing]], ['6', ElementStates.Default]],
      [['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Default], ['4', ElementStates.Default], ['6', ElementStates.Default]],
    ];

    const { length } = result[result.length - 1];

    const checkFrame = (index) => {
      if (index >= length) return;

      let typedNumber = 4;

      if (index === 0) {
        cy.get('input[placeholder*="Введите индекс"]').type(`${typedNumber}`);
        cy.contains('button', /удалить по индексу/i).click();
      }

      cy.get('[class^="interface-output"]').find('[class^="circle_circle"]').not('[class*="circle_small"]').parent().each(($circleContent, idx, $list) => {
        cy.wrap($circleContent).find('[class^="circle_circle"]').not('[class*="circle_small"]').should('have.text', result[index][idx][0]);
        cy.wrap($circleContent).find('[class*="circle_index"]').should('have.text', idx);

        if (index !== $list.length) {
          cy.wrap($list[$list.length - 1]).find('[class*="circle_tail"]').should('have.text', 'tail')
        }
        
        if (index === typedNumber + 1 && index === idx) {
          cy.wrap($circleContent).find('[class*="circle_tail"]').find('[class^="circle_circle"]').should('have.text', result[index][idx][2][0]);
          cy.wrap($circleContent).find('[class*="circle_tail"]').find('[class^="circle_circle"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][2][1]}`);          
        }

        cy.wrap($list[0]).find('[class*="circle_head"]').should('have.text', 'head');
        cy.wrap($circleContent).find('[class^="circle_circle"]').not('[class*="circle_small"]').invoke('attr', 'class').should('contain', `circle_${result[index][idx][1]}`);
      }); 
      cy.wait(DELAY_IN_MS).then(() => checkFrame(index + 1));
    }

    checkFrame(0);
  });
})