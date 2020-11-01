import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  WithUUIDDetailsComponentsPage,
  /* WithUUIDDetailsDeleteDialog, */
  WithUUIDDetailsUpdatePage,
} from './with-uuid-details.page-object';

const expect = chai.expect;

describe('WithUUIDDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let withUUIDDetailsComponentsPage: WithUUIDDetailsComponentsPage;
  let withUUIDDetailsUpdatePage: WithUUIDDetailsUpdatePage;
  /* let withUUIDDetailsDeleteDialog: WithUUIDDetailsDeleteDialog; */
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load WithUUIDDetails', async () => {
    await navBarPage.goToEntity('with-uuid-details');
    withUUIDDetailsComponentsPage = new WithUUIDDetailsComponentsPage();
    await browser.wait(ec.visibilityOf(withUUIDDetailsComponentsPage.title), 5000);
    expect(await withUUIDDetailsComponentsPage.getTitle()).to.eq('compositekeyApp.withUUIDDetails.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(withUUIDDetailsComponentsPage.entities), ec.visibilityOf(withUUIDDetailsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create WithUUIDDetails page', async () => {
    await withUUIDDetailsComponentsPage.clickOnCreateButton();
    withUUIDDetailsUpdatePage = new WithUUIDDetailsUpdatePage();
    expect(await withUUIDDetailsUpdatePage.getPageTitle()).to.eq('compositekeyApp.withUUIDDetails.home.createOrEditLabel');
    await withUUIDDetailsUpdatePage.cancel();
  });

  /* it('should create and save WithUUIDDetails', async () => {
        const nbButtonsBeforeCreate = await withUUIDDetailsComponentsPage.countDeleteButtons();

        await withUUIDDetailsComponentsPage.clickOnCreateButton();

        await promise.all([
            withUUIDDetailsUpdatePage.setDetailsInput('details'),
            withUUIDDetailsUpdatePage.withUUIDSelectLastOption(),
        ]);

        expect(await withUUIDDetailsUpdatePage.getDetailsInput()).to.eq('details', 'Expected Details value to be equals to details');

        await withUUIDDetailsUpdatePage.save();
        expect(await withUUIDDetailsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await withUUIDDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last WithUUIDDetails', async () => {
        const nbButtonsBeforeDelete = await withUUIDDetailsComponentsPage.countDeleteButtons();
        await withUUIDDetailsComponentsPage.clickOnLastDeleteButton();

        withUUIDDetailsDeleteDialog = new WithUUIDDetailsDeleteDialog();
        expect(await withUUIDDetailsDeleteDialog.getDialogTitle())
            .to.eq('compositekeyApp.withUUIDDetails.delete.question');
        await withUUIDDetailsDeleteDialog.clickOnConfirmButton();
        await browser.wait(ec.visibilityOf(withUUIDDetailsComponentsPage.title), 5000);

        expect(await withUUIDDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
