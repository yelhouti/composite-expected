import { element, by, ElementFinder } from 'protractor';

export class WithIdStringDetailsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-with-id-string-details div table .btn-danger'));
  title = element.all(by.css('jhi-with-id-string-details div h2#page-heading span')).first();
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

export class WithIdStringDetailsUpdatePage {
  pageTitle = element(by.id('jhi-with-id-string-details-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  detailsInput = element(by.id('field_details'));

  withIdStringSelect = element(by.id('field_withIdString'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setDetailsInput(details: string): Promise<void> {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput(): Promise<string> {
    return await this.detailsInput.getAttribute('value');
  }

  async withIdStringSelectLastOption(): Promise<void> {
    await this.withIdStringSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async withIdStringSelectOption(option: string): Promise<void> {
    await this.withIdStringSelect.sendKeys(option);
  }

  getWithIdStringSelect(): ElementFinder {
    return this.withIdStringSelect;
  }

  async getWithIdStringSelectedOption(): Promise<string> {
    return await this.withIdStringSelect.element(by.css('option:checked')).getText();
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

export class WithIdStringDetailsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-withIdStringDetails-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-withIdStringDetails'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
