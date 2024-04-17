describe(`Проверка работы страницы 'Сортировка массива'`, () => {
  beforeEach(() => {
    cy.visit('/sorting');
  });

  it('Проверка дизейбла кнопок, если генерируем новый массив', () => {
    cy.contains('button', /новый массив/i).click();
    cy.contains('button', /по возрастанию/i).should('be.disabled');
    cy.contains('button', /по убыванию/i).should('be.disabled')
  });

  it('Проверка дизейбла кнопок, если сортируем по возрастанию', () => {
    cy.contains('button', /по возрастанию/i).click();
    cy.contains('button', /новый массив/i).should('be.disabled');
    cy.contains('button', /по убыванию/i).should('be.disabled')
  });

  it('Проверка дизейбла кнопок, если сортируем по убыванию', () => {
    cy.contains('button', /по убыванию/i).click();
    cy.contains('button', /новый массив/i).should('be.disabled');
    cy.contains('button', /по возрастанию/i).should('be.disabled')
  })
})