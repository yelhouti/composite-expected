import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  WithIdStringDetailsComponentsPage,
  /* WithIdStringDetailsDeleteDialog, */
  WithIdStringDetailsUpdatePage,
} from './with-id-string-details.page-object';

const expect = chai.expect;

describe('WithIdStringDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let withIdStringDetailsComponentsPage: WithIdStringDetailsComponentsPage;
  let withIdStringDetailsUpdatePage: WithIdStringDetailsUpdatePage;
  /* let withIdStringDetailsDeleteDialog: WithIdStringDetailsDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load WithIdStringDetails', async () => {
    await navBarPage.goToEntity('with-id-string-details');
    withIdStringDetailsComponentsPage = new WithIdStringDetailsComponentsPage();
    await browser.wait(ec.visibilityOf(withIdStringDetailsComponentsPage.title), 5000);
    expect(await withIdStringDetailsComponentsPage.getTitle()).to.eq('compositekeyApp.withIdStringDetails.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(withIdStringDetailsComponentsPage.entities), ec.visibilityOf(withIdStringDetailsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create WithIdStringDetails page', async () => {
    await withIdStringDetailsComponentsPage.clickOnCreateButton();
    withIdStringDetailsUpdatePage = new WithIdStringDetailsUpdatePage();
    expect(await withIdStringDetailsUpdatePage.getPageTitle()).to.eq('compositekeyApp.withIdStringDetails.home.createOrEditLabel');
    await withIdStringDetailsUpdatePage.cancel();
  });

  /* it('should create and save WithIdStringDetails', async () => {
        const nbButtonsBeforeCreate = await withIdStringDetailsComponentsPage.countDeleteButtons();

        await withIdStringDetailsComponentsPage.clickOnCreateButton();

        await promise.all([
            withIdStringDetailsUpdatePage.setNameInput('name'),
            withIdStringDetailsUpdatePage.withIdStringSelectLastOption(),
        ]);

        expect(await withIdStringDetailsUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

        await withIdStringDetailsUpdatePage.save();
        expect(await withIdStringDetailsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await withIdStringDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last WithIdStringDetails', async () => {
        const nbButtonsBeforeDelete = await withIdStringDetailsComponentsPage.countDeleteButtons();
        await withIdStringDetailsComponentsPage.clickOnLastDeleteButton();

        withIdStringDetailsDeleteDialog = new WithIdStringDetailsDeleteDialog();
        expect(await withIdStringDetailsDeleteDialog.getDialogTitle())
            .to.eq('compositekeyApp.withIdStringDetails.delete.question');
        await withIdStringDetailsDeleteDialog.clickOnConfirmButton();

        expect(await withIdStringDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
