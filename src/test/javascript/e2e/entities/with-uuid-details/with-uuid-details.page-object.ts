import { element, by, ElementFinder } from 'protractor';

export class WithUUIDDetailsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-with-uuid-details div table .btn-danger'));
  title = element.all(by.css('jhi-with-uuid-details div h2#page-heading span')).first();
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

export class WithUUIDDetailsUpdatePage {
  pageTitle = element(by.id('jhi-with-uuid-details-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  uuidInput = element(by.id('field_uuid'));
  detailsInput = element(by.id('field_details'));

  withUUIDSelect = element(by.id('field_withUUID'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUuidInput(uuid: string): Promise<void> {
    await this.uuidInput.sendKeys(uuid);
  }

  async getUuidInput(): Promise<string> {
    return await this.uuidInput.getAttribute('value');
  }

  async setDetailsInput(details: string): Promise<void> {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput(): Promise<string> {
    return await this.detailsInput.getAttribute('value');
  }

  async withUUIDSelectLastOption(): Promise<void> {
    await this.withUUIDSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async withUUIDSelectOption(option: string): Promise<void> {
    await this.withUUIDSelect.sendKeys(option);
  }

  getWithUUIDSelect(): ElementFinder {
    return this.withUUIDSelect;
  }

  async getWithUUIDSelectedOption(): Promise<string> {
    return await this.withUUIDSelect.element(by.css('option:checked')).getText();
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

export class WithUUIDDetailsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-withUUIDDetails-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-withUUIDDetails'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
