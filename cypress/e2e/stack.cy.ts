import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { ElementStates } from '../../src/types/element-states';

describe(`Проверка работы страницы 'Стек'`, () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack');
  });

  it(`Проверка дизейбла кнопки 'Добавить', если инпут пуст`, () => {
    cy.get('input').should('be.empty');
    cy.contains('button', /добавить/i).should('be.disabled')
  });

  it(`Проверка дизейбла кнопок 'Удалить' и 'Очистить'`, () => {
    cy.get('[class^="interface-output"]').not('[class^="circle_circle"]');
    cy.contains('button', /удалить/i).should('be.disabled');
    cy.contains('button', /очистить/i).should('be.disabled')
  })

  it(`Проверка добавления элементов в Стек`, () => {
    const result = [
      [['1', ElementStates.Changing]],
      [['1', ElementStates.Default], ['1', ElementStates.Changing]],
      [['1', ElementStates.Default], ['1', ElementStates.Default], ['2', ElementStates.Changing]],
      [['1', ElementStates.Default], ['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Changing]]
    ];
    
    const { length } = result;

    const checkFrame = (index) => {
      if (index >= length) return;

      cy.get('input').type(index === 0 ? index + 1 : index);
      cy.contains('button', /добавить/i).click();

      cy.get('[class^="interface-output"]').get('[class^="circle_content"]').each(($circleContent, idx, $list) => {
        cy.wrap($circleContent).find('[class^="circle_circle"]').should('have.text', result[index][idx][0]);
        cy.wrap($circleContent).find('[class*="circle_index"]').should('have.text', idx);
        cy.wrap($list[$list.length - 1]).find('[class*="circle_head"]').should('have.text', 'top');
        cy.wrap($circleContent).find('[class^="circle_circle"]').invoke('attr', 'class', ).should('contain', `circle_${result[index][idx][1]}`);
      }); 
      cy.wait(SHORT_DELAY_IN_MS).then(() => checkFrame(index + 1));
    }

    checkFrame(0);
  });

  it(`Проверка удаления элементов из Стека`, () => {
    const result = [
      [['1', ElementStates.Default], ['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Changing]],
      [['1', ElementStates.Default], ['1', ElementStates.Default], ['2', ElementStates.Changing]],
      [['1', ElementStates.Default], ['1', ElementStates.Changing]],
      [['1', ElementStates.Changing]]    
    ];
    
    const { length } = result;

    let i = 0;

    const checkFrame = (index) => {
      if (index >= length) return;

      while(i < length) {
        cy.get('input').type(`${i === 0 ? i + 1 : i}`);
        cy.contains('button', /добавить/i).click();
        cy.wait(SHORT_DELAY_IN_MS);
        i++;
      }

      cy.contains('button', /удалить/i).click();

      if (index === length - 1) {
        cy.get('[class^="interface-output"]').find('[class^="circle_content"]').should('not.exist');
      } else {
        cy.get('[class^="interface-output"]').get('[class^="circle_content"]').each(($circleContent, idx, $list) => {
          cy.wrap($circleContent).find('[class^="circle_circle"]').should('have.text', result[index][idx][0]);
          cy.wrap($circleContent).find('[class*="circle_index"]').should('have.text', idx);
          cy.wrap($list[$list.length - 1]).find('[class*="circle_head"]').should('have.text', 'top');
          cy.wrap($circleContent).find('[class^="circle_circle"]').invoke('attr', 'class', ).should('contain', `circle_${result[index][idx][1]}`);
        }); 
      }

      cy.wait(SHORT_DELAY_IN_MS).then(() => checkFrame(index + 1));
    }

    checkFrame(0);
  });

  it(`Проверка очистки Стека`, () => {
    const result = [
      [['1', ElementStates.Default], ['1', ElementStates.Default], ['2', ElementStates.Default], ['3', ElementStates.Default]]
    ];
    
    const { length } = result[0];

    let i = 0;

    const checkFrame = (index) => {
      if (index >= 1) return;

      while(i < length) {
        cy.get('input').type(`${i === 0 ? i + 1 : i}`);
        cy.contains('button', /добавить/i).click();
        cy.wait(SHORT_DELAY_IN_MS);
        i++;
      }

      cy.contains('button', /очистить/i).click().then(() => {
        cy.get('[class^="interface-output"]').find('[class^="circle_content"]').should('not.exist');
      })

      cy.wait(SHORT_DELAY_IN_MS).then(() => checkFrame(index + 1));
    }

    checkFrame(0);
  })
})