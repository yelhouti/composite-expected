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

describe('EmployeeSkillCertificateDetails e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/employee-skill-certificate-details*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('employee-skill-certificate-details');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load EmployeeSkillCertificateDetails', () => {
    cy.intercept('GET', '/api/employee-skill-certificate-details*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate-details');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('EmployeeSkillCertificateDetails').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details EmployeeSkillCertificateDetails page', () => {
    cy.intercept('GET', '/api/employee-skill-certificate-details*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate-details');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('employeeSkillCertificateDetails');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create EmployeeSkillCertificateDetails page', () => {
    cy.intercept('GET', '/api/employee-skill-certificate-details*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate-details');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('EmployeeSkillCertificateDetails');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit EmployeeSkillCertificateDetails page', () => {
    cy.intercept('GET', '/api/employee-skill-certificate-details*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate-details');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('EmployeeSkillCertificateDetails');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  /* this test is commented because it contains required relationships
  it('should create an instance of EmployeeSkillCertificateDetails', () => {
    cy.intercept('GET', '/api/employee-skill-certificate-details*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate-details');
    cy.wait('@entitiesRequest')
      .then(({ request, response }) => startingEntitiesCount = response.body.length);
    cy.get(entityCreateButtonSelector).click({force: true});
    cy.getEntityCreateUpdateHeading('EmployeeSkillCertificateDetails');

    cy.get(`[data-cy="detail"]`).type('transmitting', { force: true }).invoke('val').should('match', new RegExp('transmitting'));

    cy.setFieldSelectToLastOfEntity('employeeSkillCertificate');

    cy.get(entityCreateSaveButtonSelector).click({force: true});
    cy.scrollTo('top', {ensureScrollable: false});
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/employee-skill-certificate-details*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate-details');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });
  */

  /* this test is commented because it contains required relationships
  it('should delete last instance of EmployeeSkillCertificateDetails', () => {
    cy.intercept('GET', '/api/employee-skill-certificate-details*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/employee-skill-certificate-details/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('employee-skill-certificate-details');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({force: true});
        cy.getEntityDeleteDialogHeading('employeeSkillCertificateDetails').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({force: true});
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/employee-skill-certificate-details*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('employee-skill-certificate-details');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
  */
});
