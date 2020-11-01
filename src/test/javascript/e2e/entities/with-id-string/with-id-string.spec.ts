import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WithIdStringComponentsPage, WithIdStringDeleteDialog, WithIdStringUpdatePage } from './with-id-string.page-object';

const expect = chai.expect;

describe('WithIdString e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let withIdStringComponentsPage: WithIdStringComponentsPage;
  let withIdStringUpdatePage: WithIdStringUpdatePage;
  let withIdStringDeleteDialog: WithIdStringDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load WithIdStrings', async () => {
    await navBarPage.goToEntity('with-id-string');
    withIdStringComponentsPage = new WithIdStringComponentsPage();
    await browser.wait(ec.visibilityOf(withIdStringComponentsPage.title), 5000);
    expect(await withIdStringComponentsPage.getTitle()).to.eq('compositekeyApp.withIdString.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(withIdStringComponentsPage.entities), ec.visibilityOf(withIdStringComponentsPage.noResult)),
      1000
    );
  });

  it('should load create WithIdString page', async () => {
    await withIdStringComponentsPage.clickOnCreateButton();
    withIdStringUpdatePage = new WithIdStringUpdatePage();
    expect(await withIdStringUpdatePage.getPageTitle()).to.eq('compositekeyApp.withIdString.home.createOrEditLabel');
    await withIdStringUpdatePage.cancel();
  });

  it('should create and save WithIdStrings', async () => {
    const nbButtonsBeforeCreate = await withIdStringComponentsPage.countDeleteButtons();

    await withIdStringComponentsPage.clickOnCreateButton();

    await promise.all([]);

    await withIdStringUpdatePage.save();
    expect(await withIdStringUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await withIdStringComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last WithIdString', async () => {
    const nbButtonsBeforeDelete = await withIdStringComponentsPage.countDeleteButtons();
    await withIdStringComponentsPage.clickOnLastDeleteButton();

    withIdStringDeleteDialog = new WithIdStringDeleteDialog();
    expect(await withIdStringDeleteDialog.getDialogTitle()).to.eq('compositekeyApp.withIdString.delete.question');
    await withIdStringDeleteDialog.clickOnConfirmButton();

    expect(await withIdStringComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
