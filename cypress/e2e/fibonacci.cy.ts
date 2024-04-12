import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe(`Проверка работы страницы 'Последовательность Фибоначчи'`, () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('Проверка дизейбла кнопки, если инпут пуст', () => {
    cy.get('input').should('be.empty');
    cy.contains('button', 'Рассчитать').should('be.disabled')
  });

  it(`Проверка анимации 'Последовательность Фибоначчи'`, () => {
    const result = [
      ['1'],
      ['1', '1'],
      ['1', '1', '2'],
      ['1', '1', '2', '3'],
      ['1', '1', '2', '3', '5'],
      ['1', '1', '2', '3', '5', '8'],
      ['1', '1', '2', '3', '5', '8', '13'],
      ['1', '1', '2', '3', '5', '8', '13', '21'],
      ['1', '1', '2', '3', '5', '8', '13', '21', '34'],
      ['1', '1', '2', '3', '5', '8', '13', '21', '34', '55'],
      ['1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'],
      ['1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144'],
      ['1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233'],
      ['1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377'],
      ['1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610'],
      ['1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610', '987'],
      ['1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610', '987', '1597'],
      ['1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610', '987', '1597', '2584'],
      ['1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610', '987', '1597', '2584', '4181'],
      ['1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610', '987', '1597', '2584', '4181', '6765']
    ];
    
    const { length } = result;

    cy.get('input').type('19');
    cy.contains('button', 'Рассчитать').click();

    // for (let i = 0; i < length; i++) {
    //   cy.get('[class^="circle_content"]').as('circleContent');
    //   cy.get('@circleContent').should('have.length', result[i].length).each(($circleContent, idx) => {
    //     cy.wrap($circleContent).find('[class*="circle_circle"]').as('circle')
    //     cy.wrap($circleContent).find('[class*="circle_index"]').as('circle_index')
    //     cy.get('@circle').should('have.text', result[i][idx]);
    //     cy.get('@circle_index').should('have.text', i)
    //   }); 
    //   cy.wait(SHORT_DELAY_IN_MS) 
    // }

    const checkFrame = (index) => {
      if (index >= length) return;

      cy.get('[class^="interface-output"]').get('[class^="circle_content"]').each(($circleContent, idx) => {
        cy.wrap($circleContent).find('[class*="circle_circle"]').as('circle');
        cy.wrap($circleContent).find('[class*="circle_index"]').as('circle_index');
        cy.get('@circle').should('have.text', result[index][idx]);
        cy.get('@circle_index').should('have.text', index);
      }); 
      cy.wait(SHORT_DELAY_IN_MS).then(() => checkFrame(index + 1));
    }

    checkFrame(0);
  })
})