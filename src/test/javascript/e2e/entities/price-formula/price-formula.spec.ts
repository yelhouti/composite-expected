import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PriceFormulaComponentsPage, PriceFormulaDeleteDialog, PriceFormulaUpdatePage } from './price-formula.page-object';

const expect = chai.expect;

describe('PriceFormula e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let priceFormulaComponentsPage: PriceFormulaComponentsPage;
  let priceFormulaUpdatePage: PriceFormulaUpdatePage;
  let priceFormulaDeleteDialog: PriceFormulaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PriceFormulas', async () => {
    await navBarPage.goToEntity('price-formula');
    priceFormulaComponentsPage = new PriceFormulaComponentsPage();
    await browser.wait(ec.visibilityOf(priceFormulaComponentsPage.title), 5000);
    expect(await priceFormulaComponentsPage.getTitle()).to.eq('compositekeyApp.priceFormula.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(priceFormulaComponentsPage.entities), ec.visibilityOf(priceFormulaComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PriceFormula page', async () => {
    await priceFormulaComponentsPage.clickOnCreateButton();
    priceFormulaUpdatePage = new PriceFormulaUpdatePage();
    expect(await priceFormulaUpdatePage.getPageTitle()).to.eq('compositekeyApp.priceFormula.home.createOrEditLabel');
    await priceFormulaUpdatePage.cancel();
  });

  it('should create and save PriceFormulas', async () => {
    const nbButtonsBeforeCreate = await priceFormulaComponentsPage.countDeleteButtons();

    await priceFormulaComponentsPage.clickOnCreateButton();

    await promise.all([priceFormulaUpdatePage.setFormulaInput('formula')]);

    expect(await priceFormulaUpdatePage.getFormulaInput()).to.eq('formula', 'Expected Formula value to be equals to formula');

    await priceFormulaUpdatePage.save();
    expect(await priceFormulaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await priceFormulaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PriceFormula', async () => {
    const nbButtonsBeforeDelete = await priceFormulaComponentsPage.countDeleteButtons();
    await priceFormulaComponentsPage.clickOnLastDeleteButton();

    priceFormulaDeleteDialog = new PriceFormulaDeleteDialog();
    expect(await priceFormulaDeleteDialog.getDialogTitle()).to.eq('compositekeyApp.priceFormula.delete.question');
    await priceFormulaDeleteDialog.clickOnConfirmButton();

    expect(await priceFormulaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
