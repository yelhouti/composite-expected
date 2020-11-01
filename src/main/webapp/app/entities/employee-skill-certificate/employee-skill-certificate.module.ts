import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { EmployeeSkillCertificateComponent } from './list/employee-skill-certificate.component';
import { EmployeeSkillCertificateDetailComponent } from './detail/employee-skill-certificate-detail.component';
import { EmployeeSkillCertificateUpdateComponent } from './update/employee-skill-certificate-update.component';
import { EmployeeSkillCertificateDeleteDialogComponent } from './delete/employee-skill-certificate-delete-dialog.component';
import { EmployeeSkillCertificateRoutingModule } from './route/employee-skill-certificate-routing.module';

@NgModule({
  imports: [SharedModule, EmployeeSkillCertificateRoutingModule],
  declarations: [
    EmployeeSkillCertificateComponent,
    EmployeeSkillCertificateDetailComponent,
    EmployeeSkillCertificateUpdateComponent,
    EmployeeSkillCertificateDeleteDialogComponent,
  ],
  entryComponents: [EmployeeSkillCertificateDeleteDialogComponent],
})
export class EmployeeSkillCertificateModule {}
