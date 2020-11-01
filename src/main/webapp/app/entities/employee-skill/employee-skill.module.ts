import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { EmployeeSkillComponent } from './employee-skill.component';
import { EmployeeSkillDetailComponent } from './employee-skill-detail.component';
import { EmployeeSkillUpdateComponent } from './employee-skill-update.component';
import { EmployeeSkillDeleteDialogComponent } from './employee-skill-delete-dialog.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [EmployeeSkillComponent, EmployeeSkillDetailComponent, EmployeeSkillUpdateComponent, EmployeeSkillDeleteDialogComponent],
  exports: [EmployeeSkillDetailComponent, EmployeeSkillUpdateComponent, EmployeeSkillDeleteDialogComponent],
  entryComponents: [EmployeeSkillDeleteDialogComponent],
})
export class EmployeeSkillModule {}
