import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Task e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/tasks*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('task');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Tasks', () => {
    cy.intercept('GET', '/api/tasks*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('task');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Task').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Task page', () => {
    cy.intercept('GET', '/api/tasks*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('task');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('task');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Task page', () => {
    cy.intercept('GET', '/api/tasks*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('task');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Task');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Task page', () => {
    cy.intercept('GET', '/api/tasks*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('task');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Task');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  /* this test is commented because it contains required relationships
  it('should create an instance of Task', () => {
    cy.intercept('GET', '/api/tasks*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('task');
    cy.wait('@entitiesRequest')
      .then(({ request, response }) => startingEntitiesCount = response.body.length);
    cy.get(entityCreateButtonSelector).click({force: true});
    cy.getEntityCreateUpdateHeading('Task');

    cy.get(`[data-cy="name"]`).type('withdrawal Avon rich', { force: true }).invoke('val').should('match', new RegExp('withdrawal Avon rich'));


    cy.get(`[data-cy="type"]`).select('TYPE3');


    cy.get(`[data-cy="endDate"]`).type('2021-03-12').should('have.value', '2021-03-12');


    cy.get(`[data-cy="createdAt"]`).type('2021-03-12T15:46').invoke('val').should('equal', '2021-03-12T15:46');


    cy.get(`[data-cy="modifiedAt"]`).type('2021-03-13T03:25').invoke('val').should('equal', '2021-03-13T03:25');


    cy.get(`[data-cy="done"]`).should('not.be.checked');
    cy.get(`[data-cy="done"]`).click().should('be.checked');

    cy.get(`[data-cy="description"]`).type('../fake-data/blob/hipster.txt', { force: true }).invoke('val').should('match', new RegExp('../fake-data/blob/hipster.txt'));


    cy.setFieldImageAsBytesOfEntity('attachment', 'integration-test.png', 'image/png');


    cy.setFieldImageAsBytesOfEntity('picture', 'integration-test.png', 'image/png');

    cy.setFieldSelectToLastOfEntity('user');

    cy.get(entityCreateSaveButtonSelector).click({force: true});
    cy.scrollTo('top', {ensureScrollable: false});
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/tasks*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('task');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });
  */

  /* this test is commented because it contains required relationships
  it('should delete last instance of Task', () => {
    cy.intercept('GET', '/api/tasks*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/tasks/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('task');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({force: true});
        cy.getEntityDeleteDialogHeading('task').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({force: true});
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/tasks*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('task');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
  */
});
