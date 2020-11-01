import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeUpdateComponent } from './employee-update.component';
import { EmployeeDeleteDialogComponent } from './employee-delete-dialog.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [EmployeeComponent, EmployeeDetailComponent, EmployeeUpdateComponent, EmployeeDeleteDialogComponent],
  exports: [EmployeeDetailComponent, EmployeeUpdateComponent, EmployeeDeleteDialogComponent],
  entryComponents: [EmployeeDeleteDialogComponent],
})
export class EmployeeModule {}
