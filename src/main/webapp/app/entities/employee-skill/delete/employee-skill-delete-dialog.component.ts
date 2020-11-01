import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployeeSkill } from '../employee-skill.model';
import { EmployeeSkillService } from '../service/employee-skill.service';

@Component({
  templateUrl: './employee-skill-delete-dialog.component.html'
})
export class EmployeeSkillDeleteDialogComponent {
  employeeSkill?: IEmployeeSkill;

  constructor(protected employeeSkillService: EmployeeSkillService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.employeeSkillService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
