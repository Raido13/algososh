describe('Проверка работы раутинга', () => {
  beforeEach(() => cy.visit('http://localhost:3000/'))

  it('Проверка перехода на главную страницу', () => {
    cy.contains(/мбоу алгосош/i)
  });

  it(`Проверка перехода на страницу 'Разворот строки'`, () => {
    cy.get('a[href*="recursion"]').click();
    cy.contains(/строка/i)
  });

  it(`Проверка перехода на страницу 'Последовательность Фибоначчи'`, () => {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains(/фибоначчи/i)
  });

  it(`Проверка перехода на страницу 'Сортировка массива'`, () => {
    cy.get('a[href*="sorting"]').click();
    cy.contains(/сортировка/i)
  });

  it(`Проверка перехода на страницу 'Стек'`, () => {
    cy.get('a[href*="stack"]').click();
    cy.contains(/стек/i)
  });

  it(`Проверка перехода на страницу 'Очередь'`, () => {
    cy.get('a[href*="queue"]').click();
    cy.contains(/очередь/i)
  });

  it(`Проверка перехода на страницу 'Связный список'`, () => {
    cy.get('a[href*="list"]').click();
    cy.contains(/связный список/i)
  })

})