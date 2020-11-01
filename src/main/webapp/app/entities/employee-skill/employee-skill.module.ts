import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { EmployeeSkillComponent } from './list/employee-skill.component';
import { EmployeeSkillDetailComponent } from './detail/employee-skill-detail.component';
import { EmployeeSkillUpdateComponent } from './update/employee-skill-update.component';
import { EmployeeSkillDeleteDialogComponent } from './delete/employee-skill-delete-dialog.component';
import { EmployeeSkillRoutingModule } from './route/employee-skill-routing.module';

@NgModule({
  imports: [SharedModule, EmployeeSkillRoutingModule],
  declarations: [EmployeeSkillComponent, EmployeeSkillDetailComponent, EmployeeSkillUpdateComponent, EmployeeSkillDeleteDialogComponent],
  entryComponents: [EmployeeSkillDeleteDialogComponent]
})
export class EmployeeSkillModule {}
