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

describe('EmployeeSkillCertificate e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/employee-skill-certificates*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('employee-skill-certificate');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load EmployeeSkillCertificates', () => {
    cy.intercept('GET', '/api/employee-skill-certificates*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('EmployeeSkillCertificate').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details EmployeeSkillCertificate page', () => {
    cy.intercept('GET', '/api/employee-skill-certificates*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('employeeSkillCertificate');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create EmployeeSkillCertificate page', () => {
    cy.intercept('GET', '/api/employee-skill-certificates*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('EmployeeSkillCertificate');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit EmployeeSkillCertificate page', () => {
    cy.intercept('GET', '/api/employee-skill-certificates*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('EmployeeSkillCertificate');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  /* this test is commented because it contains required relationships
  it('should create an instance of EmployeeSkillCertificate', () => {
    cy.intercept('GET', '/api/employee-skill-certificates*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate');
    cy.wait('@entitiesRequest')
      .then(({ request, response }) => startingEntitiesCount = response.body.length);
    cy.get(entityCreateButtonSelector).click({force: true});
    cy.getEntityCreateUpdateHeading('EmployeeSkillCertificate');

    cy.get(`[data-cy="grade"]`).type('94448').should('have.value', '94448');


    cy.get(`[data-cy="date"]`).type('2021-03-12').should('have.value', '2021-03-12');

    cy.setFieldSelectToLastOfEntity('type');

    cy.setFieldSelectToLastOfEntity('skill');

    cy.get(entityCreateSaveButtonSelector).click({force: true});
    cy.scrollTo('top', {ensureScrollable: false});
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/employee-skill-certificates*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });
  */

  /* this test is commented because it contains required relationships
  it('should delete last instance of EmployeeSkillCertificate', () => {
    cy.intercept('GET', '/api/employee-skill-certificates*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/employee-skill-certificates/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({force: true});
        cy.getEntityDeleteDialogHeading('employeeSkillCertificate').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({force: true});
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/employee-skill-certificates*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('employee-skill-certificate');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
  */
});
