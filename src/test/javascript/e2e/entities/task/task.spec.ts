import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  TaskComponentsPage,
  /* TaskDeleteDialog, */
  TaskUpdatePage,
} from './task.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Task e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taskComponentsPage: TaskComponentsPage;
  let taskUpdatePage: TaskUpdatePage;
  /* let taskDeleteDialog: TaskDeleteDialog; */
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tasks', async () => {
    await navBarPage.goToEntity('task');
    taskComponentsPage = new TaskComponentsPage();
    await browser.wait(ec.visibilityOf(taskComponentsPage.title), 5000);
    expect(await taskComponentsPage.getTitle()).to.eq('compositekeyApp.task.home.title');
    await browser.wait(ec.or(ec.visibilityOf(taskComponentsPage.entities), ec.visibilityOf(taskComponentsPage.noResult)), 1000);
  });

  it('should load create Task page', async () => {
    await taskComponentsPage.clickOnCreateButton();
    taskUpdatePage = new TaskUpdatePage();
    expect(await taskUpdatePage.getPageTitle()).to.eq('compositekeyApp.task.home.createOrEditLabel');
    await taskUpdatePage.cancel();
  });

  /* it('should create and save Tasks', async () => {
        const nbButtonsBeforeCreate = await taskComponentsPage.countDeleteButtons();

        await taskComponentsPage.clickOnCreateButton();

        await promise.all([
            taskUpdatePage.setNameInput('name'),
            taskUpdatePage.typeSelectLastOption(),
            taskUpdatePage.setEndDateInput('2000-12-31'),
            taskUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            taskUpdatePage.setModifiedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            taskUpdatePage.setDescriptionInput('description'),
            taskUpdatePage.setAttachmentInput(absolutePath),
            taskUpdatePage.setPictureInput(absolutePath),
            taskUpdatePage.userSelectLastOption(),
        ]);

        expect(await taskUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        expect(await taskUpdatePage.getEndDateInput()).to.eq('2000-12-31', 'Expected endDate value to be equals to 2000-12-31');
        expect(await taskUpdatePage.getCreatedAtInput()).to.contain('2001-01-01T02:30', 'Expected createdAt value to be equals to 2000-12-31');
        expect(await taskUpdatePage.getModifiedAtInput()).to.contain('2001-01-01T02:30', 'Expected modifiedAt value to be equals to 2000-12-31');
        const selectedDone = taskUpdatePage.getDoneInput();
        if (await selectedDone.isSelected()) {
            await taskUpdatePage.getDoneInput().click();
            expect(await taskUpdatePage.getDoneInput().isSelected(), 'Expected done not to be selected').to.be.false;
        } else {
            await taskUpdatePage.getDoneInput().click();
            expect(await taskUpdatePage.getDoneInput().isSelected(), 'Expected done to be selected').to.be.true;
        }
        expect(await taskUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        expect(await taskUpdatePage.getAttachmentInput()).to.endsWith(fileNameToUpload, 'Expected Attachment value to be end with ' + fileNameToUpload);
        expect(await taskUpdatePage.getPictureInput()).to.endsWith(fileNameToUpload, 'Expected Picture value to be end with ' + fileNameToUpload);

        await taskUpdatePage.save();
        expect(await taskUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await taskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Task', async () => {
        const nbButtonsBeforeDelete = await taskComponentsPage.countDeleteButtons();
        await taskComponentsPage.clickOnLastDeleteButton();

        taskDeleteDialog = new TaskDeleteDialog();
        expect(await taskDeleteDialog.getDialogTitle())
            .to.eq('compositekeyApp.task.delete.question');
        await taskDeleteDialog.clickOnConfirmButton();

        expect(await taskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
