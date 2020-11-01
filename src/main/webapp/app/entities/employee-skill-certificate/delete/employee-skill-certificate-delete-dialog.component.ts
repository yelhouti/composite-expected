import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployeeSkillCertificate } from '../employee-skill-certificate.model';
import { EmployeeSkillCertificateService } from '../service/employee-skill-certificate.service';

@Component({
  templateUrl: './employee-skill-certificate-delete-dialog.component.html'
})
export class EmployeeSkillCertificateDeleteDialogComponent {
  employeeSkillCertificate?: IEmployeeSkillCertificate;

  constructor(protected employeeSkillCertificateService: EmployeeSkillCertificateService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeeSkillCertificateService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
