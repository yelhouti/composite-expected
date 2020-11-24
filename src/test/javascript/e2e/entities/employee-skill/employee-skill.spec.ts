import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  EmployeeSkillComponentsPage,
  /* EmployeeSkillDeleteDialog, */
  EmployeeSkillUpdatePage,
} from './employee-skill.page-object';

const expect = chai.expect;

describe('EmployeeSkill e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeSkillComponentsPage: EmployeeSkillComponentsPage;
  let employeeSkillUpdatePage: EmployeeSkillUpdatePage;
  /* let employeeSkillDeleteDialog: EmployeeSkillDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EmployeeSkills', async () => {
    await navBarPage.goToEntity('employee-skill');
    employeeSkillComponentsPage = new EmployeeSkillComponentsPage();
    await browser.wait(ec.visibilityOf(employeeSkillComponentsPage.title), 5000);
    expect(await employeeSkillComponentsPage.getTitle()).to.eq('compositekeyApp.employeeSkill.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(employeeSkillComponentsPage.entities), ec.visibilityOf(employeeSkillComponentsPage.noResult)),
      1000
    );
  });

  it('should load create EmployeeSkill page', async () => {
    await employeeSkillComponentsPage.clickOnCreateButton();
    employeeSkillUpdatePage = new EmployeeSkillUpdatePage();
    expect(await employeeSkillUpdatePage.getPageTitle()).to.eq('compositekeyApp.employeeSkill.home.createOrEditLabel');
    await employeeSkillUpdatePage.cancel();
  });

  /* it('should create and save EmployeeSkills', async () => {
        const nbButtonsBeforeCreate = await employeeSkillComponentsPage.countDeleteButtons();

        await employeeSkillComponentsPage.clickOnCreateButton();

        await promise.all([
            employeeSkillUpdatePage.setLevelInput('5'),
            // employeeSkillUpdatePage.taskSelectLastOption(),
            employeeSkillUpdatePage.employeeSelectLastOption(),
            employeeSkillUpdatePage.teacherSelectLastOption(),
        ]);

        expect(await employeeSkillUpdatePage.getLevelInput()).to.eq('5', 'Expected level value to be equals to 5');

        await employeeSkillUpdatePage.save();
        expect(await employeeSkillUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await employeeSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last EmployeeSkill', async () => {
        const nbButtonsBeforeDelete = await employeeSkillComponentsPage.countDeleteButtons();
        await employeeSkillComponentsPage.clickOnLastDeleteButton();

        employeeSkillDeleteDialog = new EmployeeSkillDeleteDialog();
        expect(await employeeSkillDeleteDialog.getDialogTitle())
            .to.eq('compositekeyApp.employeeSkill.delete.question');
        await employeeSkillDeleteDialog.clickOnConfirmButton();

        expect(await employeeSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
