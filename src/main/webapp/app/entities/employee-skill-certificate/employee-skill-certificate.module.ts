import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { EmployeeSkillCertificateComponent } from './employee-skill-certificate.component';
import { EmployeeSkillCertificateDetailComponent } from './employee-skill-certificate-detail.component';
import { EmployeeSkillCertificateUpdateComponent } from './employee-skill-certificate-update.component';
import { EmployeeSkillCertificateDeleteDialogComponent } from './employee-skill-certificate-delete-dialog.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [
    EmployeeSkillCertificateComponent,
    EmployeeSkillCertificateDetailComponent,
    EmployeeSkillCertificateUpdateComponent,
    EmployeeSkillCertificateDeleteDialogComponent,
  ],
  exports: [
    EmployeeSkillCertificateDetailComponent,
    EmployeeSkillCertificateUpdateComponent,
    EmployeeSkillCertificateDeleteDialogComponent,
  ],
  entryComponents: [EmployeeSkillCertificateDeleteDialogComponent],
})
export class EmployeeSkillCertificateModule {}
