import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { EmployeeSkillCertificateDetailsComponent } from './list/employee-skill-certificate-details.component';
import { EmployeeSkillCertificateDetailsDetailComponent } from './detail/employee-skill-certificate-details-detail.component';
import { EmployeeSkillCertificateDetailsUpdateComponent } from './update/employee-skill-certificate-details-update.component';
import { EmployeeSkillCertificateDetailsRoutingModule } from './route/employee-skill-certificate-details-routing.module';

@NgModule({
  imports: [SharedModule, EmployeeSkillCertificateDetailsRoutingModule],
  declarations: [
    EmployeeSkillCertificateDetailsComponent,
    EmployeeSkillCertificateDetailsDetailComponent,
    EmployeeSkillCertificateDetailsUpdateComponent,
  ],
})
export class EmployeeSkillCertificateDetailsModule {}
