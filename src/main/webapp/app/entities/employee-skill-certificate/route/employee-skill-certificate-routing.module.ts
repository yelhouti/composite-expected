import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmployeeSkillCertificateComponent } from '../list/employee-skill-certificate.component';
import { EmployeeSkillCertificateDetailComponent } from '../detail/employee-skill-certificate-detail.component';
import { EmployeeSkillCertificateUpdateComponent } from '../update/employee-skill-certificate-update.component';
import { EmployeeSkillCertificateRoutingResolveService } from './employee-skill-certificate-routing-resolve.service';

const employeeSkillCertificateRoute: Routes = [
  {
    path: '',
    component: EmployeeSkillCertificateComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmployeeSkillCertificateDetailComponent,
    resolve: {
      employeeSkillCertificate: EmployeeSkillCertificateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeeSkillCertificateUpdateComponent,
    resolve: {
      employeeSkillCertificate: EmployeeSkillCertificateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmployeeSkillCertificateUpdateComponent,
    resolve: {
      employeeSkillCertificate: EmployeeSkillCertificateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeeSkillCertificateRoute)],
  exports: [RouterModule],
})
export class EmployeeSkillCertificateRoutingModule {}
