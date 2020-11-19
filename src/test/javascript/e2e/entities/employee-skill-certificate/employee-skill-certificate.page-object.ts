import { element, by, ElementFinder } from 'protractor';

export class EmployeeSkillCertificateComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-employee-skill-certificate div table .btn-danger'));
  title = element.all(by.css('jhi-employee-skill-certificate div h2#page-heading span')).first();
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

export class EmployeeSkillCertificateUpdatePage {
  pageTitle = element(by.id('jhi-employee-skill-certificate-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  gradeInput = element(by.id('field_grade'));
  dateInput = element(by.id('field_date'));

  typeSelect = element(by.id('field_type'));
  skillSelect = element(by.id('field_skill'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setGradeInput(grade: string): Promise<void> {
    await this.gradeInput.sendKeys(grade);
  }

  async getGradeInput(): Promise<string> {
    return await this.gradeInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async typeSelectLastOption(): Promise<void> {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }

  async typeSelectOption(option: string): Promise<void> {
    await this.typeSelect.sendKeys(option);
  }

  getTypeSelect(): ElementFinder {
    return this.typeSelect;
  }

  async getTypeSelectedOption(): Promise<string> {
    return await this.typeSelect.element(by.css('option:checked')).getText();
  }

  async skillSelectLastOption(): Promise<void> {
    await this.skillSelect.all(by.tagName('option')).last().click();
  }

  async skillSelectOption(option: string): Promise<void> {
    await this.skillSelect.sendKeys(option);
  }

  getSkillSelect(): ElementFinder {
    return this.skillSelect;
  }

  async getSkillSelectedOption(): Promise<string> {
    return await this.skillSelect.element(by.css('option:checked')).getText();
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

export class EmployeeSkillCertificateDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-employeeSkillCertificate-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeSkillCertificate'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
