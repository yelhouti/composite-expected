import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WithUUIDComponentsPage, WithUUIDDeleteDialog, WithUUIDUpdatePage } from './with-uuid.page-object';

const expect = chai.expect;

describe('WithUUID e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let withUUIDComponentsPage: WithUUIDComponentsPage;
  let withUUIDUpdatePage: WithUUIDUpdatePage;
  let withUUIDDeleteDialog: WithUUIDDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load WithUUIDS', async () => {
    await navBarPage.goToEntity('with-uuid');
    withUUIDComponentsPage = new WithUUIDComponentsPage();
    await browser.wait(ec.visibilityOf(withUUIDComponentsPage.title), 5000);
    expect(await withUUIDComponentsPage.getTitle()).to.eq('compositekeyApp.withUUID.home.title');
    await browser.wait(ec.or(ec.visibilityOf(withUUIDComponentsPage.entities), ec.visibilityOf(withUUIDComponentsPage.noResult)), 1000);
  });

  it('should load create WithUUID page', async () => {
    await withUUIDComponentsPage.clickOnCreateButton();
    withUUIDUpdatePage = new WithUUIDUpdatePage();
    expect(await withUUIDUpdatePage.getPageTitle()).to.eq('compositekeyApp.withUUID.home.createOrEditLabel');
    await withUUIDUpdatePage.cancel();
  });

  it('should create and save WithUUIDS', async () => {
    const nbButtonsBeforeCreate = await withUUIDComponentsPage.countDeleteButtons();

    await withUUIDComponentsPage.clickOnCreateButton();

    await promise.all([withUUIDUpdatePage.setNameInput('name')]);

    expect(await withUUIDUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await withUUIDUpdatePage.save();
    expect(await withUUIDUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await withUUIDComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last WithUUID', async () => {
    const nbButtonsBeforeDelete = await withUUIDComponentsPage.countDeleteButtons();
    await withUUIDComponentsPage.clickOnLastDeleteButton();

    withUUIDDeleteDialog = new WithUUIDDeleteDialog();
    expect(await withUUIDDeleteDialog.getDialogTitle()).to.eq('compositekeyApp.withUUID.delete.question');
    await withUUIDDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(withUUIDComponentsPage.title), 5000);

    expect(await withUUIDComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
