import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployeeSkill } from 'app/shared/model/employee-skill.model';
import { EmployeeSkillService } from './employee-skill.service';
import { EventManager } from 'app/core/event-manager/event-manager.service';

@Component({
  templateUrl: './employee-skill-delete-dialog.component.html',
})
export class EmployeeSkillDeleteDialogComponent {
  employeeSkill?: IEmployeeSkill;

  constructor(
    protected employeeSkillService: EmployeeSkillService,
    public activeModal: NgbActiveModal,
    protected eventManager: EventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeeSkillService.delete(id).subscribe(() => {
      this.eventManager.broadcast('employeeSkillListModification');
      this.activeModal.close();
    });
  }
}
