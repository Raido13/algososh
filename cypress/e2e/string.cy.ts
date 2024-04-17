import { ElementStates } from '../../src/types/element-states';
import { DELAY_IN_MS } from '../../src/constants/delays';

describe(`Проверка работы страницы 'Разворот строки'`, () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('Проверка дизейбла кнопки, если инпут пуст', () => {
    cy.get('input').should('be.empty');
    cy.contains('button', 'Развернуть').should('be.disabled')
  });

  it(`Проверка анимации 'Разворота строки'`, () => {
    const result = [
      [['a', ElementStates.Default], ['s', ElementStates.Default], ['d', ElementStates.Default], ['f', ElementStates.Default]],
      [['a', ElementStates.Changing], ['s', ElementStates.Default], ['d', ElementStates.Default], ['f', ElementStates.Changing]],
      [['f', ElementStates.Modified], ['s', ElementStates.Default], ['d', ElementStates.Default], ['a', ElementStates.Modified]],
      [['f', ElementStates.Modified], ['s', ElementStates.Changing], ['d', ElementStates.Changing], ['a', ElementStates.Modified]],
      [['f', ElementStates.Modified], ['d', ElementStates.Modified], ['s', ElementStates.Modified], ['a', ElementStates.Modified]]
    ];
    
    const { length } = result;

    cy.get('input').type('asdf');
    cy.contains('button', /развернуть/i).click();

    const checkFrame = (index) => {
      if (index >= length) return;

      cy.get('[class^="interface-output"]').children().get('[class^="circle_circle"]').each(($circle, idx) => {
        cy.wrap($circle).should('have.text', result[index][idx][0]);
        cy.wrap($circle).invoke('attr', 'class').should('contain', `circle_${result[index][idx][1]}`);
      }); 
      cy.wait(DELAY_IN_MS).then(() => checkFrame(index + 1));
    }

    checkFrame(0);
  })
})