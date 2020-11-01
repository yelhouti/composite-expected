import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeeSkillCertificate } from 'app/shared/model/employee-skill-certificate.model';
import { EmployeeSkillCertificateService } from './employee-skill-certificate.service';

@Component({
  templateUrl: './employee-skill-certificate-delete-dialog.component.html',
})
export class EmployeeSkillCertificateDeleteDialogComponent {
  employeeSkillCertificate?: IEmployeeSkillCertificate;

  constructor(
    protected employeeSkillCertificateService: EmployeeSkillCertificateService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeeSkillCertificateService.delete(id).subscribe(() => {
      this.eventManager.broadcast('employeeSkillCertificateListModification');
      this.activeModal.close();
    });
  }
}
