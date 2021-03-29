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

describe('WithUUID e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/with-uuids*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('with-uuid');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load WithUUIDS', () => {
    cy.intercept('GET', '/api/with-uuids*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-uuid');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('WithUUID').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details WithUUID page', () => {
    cy.intercept('GET', '/api/with-uuids*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-uuid');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('withUUID');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create WithUUID page', () => {
    cy.intercept('GET', '/api/with-uuids*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-uuid');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('WithUUID');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit WithUUID page', () => {
    cy.intercept('GET', '/api/with-uuids*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-uuid');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('WithUUID');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of WithUUID', () => {
    cy.intercept('GET', '/api/with-uuids*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-uuid');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('WithUUID');

    cy.get(`[data-cy="name"]`)
      .type('e-tailers pixel Seamless', { force: true })
      .invoke('val')
      .should('match', new RegExp('e-tailers pixel Seamless'));

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/with-uuids*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-uuid');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of WithUUID', () => {
    cy.intercept('GET', '/api/with-uuids*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/with-uuids/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-uuid');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('withUUID').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/with-uuids*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('with-uuid');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
