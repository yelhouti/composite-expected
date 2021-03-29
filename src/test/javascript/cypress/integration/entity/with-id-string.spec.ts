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

describe('WithIdString e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/with-id-strings*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('with-id-string');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load WithIdStrings', () => {
    cy.intercept('GET', '/api/with-id-strings*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-id-string');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('WithIdString').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details WithIdString page', () => {
    cy.intercept('GET', '/api/with-id-strings*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-id-string');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('withIdString');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create WithIdString page', () => {
    cy.intercept('GET', '/api/with-id-strings*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-id-string');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('WithIdString');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit WithIdString page', () => {
    cy.intercept('GET', '/api/with-id-strings*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-id-string');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('WithIdString');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of WithIdString', () => {
    cy.intercept('GET', '/api/with-id-strings*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-id-string');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('WithIdString');

    cy.get(`[data-cy="id"]`)
      .type('multimedia Account Hills', { force: true })
      .invoke('val')
      .should('match', new RegExp('multimedia Account Hills'));

    cy.get(`[data-cy="name"]`).type('Officer teal', { force: true }).invoke('val').should('match', new RegExp('Officer teal'));

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/with-id-strings*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-id-string');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of WithIdString', () => {
    cy.intercept('GET', '/api/with-id-strings*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/with-id-strings/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('with-id-string');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('withIdString').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/with-id-strings*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('with-id-string');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
