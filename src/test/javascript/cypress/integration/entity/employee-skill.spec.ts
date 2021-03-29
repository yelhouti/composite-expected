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

describe('EmployeeSkill e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/employee-skills*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('employee-skill');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load EmployeeSkills', () => {
    cy.intercept('GET', '/api/employee-skills*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('EmployeeSkill').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details EmployeeSkill page', () => {
    cy.intercept('GET', '/api/employee-skills*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('employeeSkill');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create EmployeeSkill page', () => {
    cy.intercept('GET', '/api/employee-skills*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('EmployeeSkill');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit EmployeeSkill page', () => {
    cy.intercept('GET', '/api/employee-skills*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('EmployeeSkill');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  /* this test is commented because it contains required relationships
  it('should create an instance of EmployeeSkill', () => {
    cy.intercept('GET', '/api/employee-skills*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill');
    cy.wait('@entitiesRequest')
      .then(({ request, response }) => startingEntitiesCount = response.body.length);
    cy.get(entityCreateButtonSelector).click({force: true});
    cy.getEntityCreateUpdateHeading('EmployeeSkill');

    cy.get(`[data-cy="name"]`).type('Kenya', { force: true }).invoke('val').should('match', new RegExp('Kenya'));


    cy.get(`[data-cy="level"]`).type('72900').should('have.value', '72900');

    cy.setFieldSelectToLastOfEntity('task');

    cy.setFieldSelectToLastOfEntity('employee');

    cy.setFieldSelectToLastOfEntity('teacher');

    cy.get(entityCreateSaveButtonSelector).click({force: true});
    cy.scrollTo('top', {ensureScrollable: false});
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/employee-skills*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });
  */

  /* this test is commented because it contains required relationships
  it('should delete last instance of EmployeeSkill', () => {
    cy.intercept('GET', '/api/employee-skills*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/employee-skills/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({force: true});
        cy.getEntityDeleteDialogHeading('employeeSkill').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({force: true});
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/employee-skills*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('employee-skill');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
  */
});
