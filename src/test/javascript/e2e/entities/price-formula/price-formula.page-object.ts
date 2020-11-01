import { element, by, ElementFinder } from 'protractor';

export class PriceFormulaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-price-formula div table .btn-danger'));
  title = element.all(by.css('jhi-price-formula div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PriceFormulaUpdatePage {
  pageTitle = element(by.id('jhi-price-formula-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  formulaInput = element(by.id('field_formula'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFormulaInput(formula: string): Promise<void> {
    await this.formulaInput.sendKeys(formula);
  }

  async getFormulaInput(): Promise<string> {
    return await this.formulaInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PriceFormulaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-priceFormula-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-priceFormula'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
