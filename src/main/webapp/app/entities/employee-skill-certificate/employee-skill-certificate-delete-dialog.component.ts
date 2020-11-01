import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployeeSkillCertificate } from 'app/shared/model/employee-skill-certificate.model';
import { EmployeeSkillCertificateService } from './employee-skill-certificate.service';
import { EventManager } from 'app/core/event-manager/event-manager.service';

@Component({
  templateUrl: './employee-skill-certificate-delete-dialog.component.html',
})
export class EmployeeSkillCertificateDeleteDialogComponent {
  employeeSkillCertificate?: IEmployeeSkillCertificate;

  constructor(
    protected employeeSkillCertificateService: EmployeeSkillCertificateService,
    public activeModal: NgbActiveModal,
    protected eventManager: EventManager
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
