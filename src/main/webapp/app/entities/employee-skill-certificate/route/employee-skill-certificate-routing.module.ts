import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
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
      authorities: [Authority.USER],
      defaultSort: '',
      pageTitle: 'compositekeyApp.employeeSkillCertificate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'view',
    component: EmployeeSkillCertificateDetailComponent,
    resolve: {
      employeeSkillCertificate: EmployeeSkillCertificateRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employeeSkillCertificate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeeSkillCertificateUpdateComponent,
    resolve: {
      employeeSkillCertificate: EmployeeSkillCertificateRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employeeSkillCertificate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'edit',
    component: EmployeeSkillCertificateUpdateComponent,
    resolve: {
      employeeSkillCertificate: EmployeeSkillCertificateRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employeeSkillCertificate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeeSkillCertificateRoute)],
  exports: [RouterModule],
})
export class EmployeeSkillCertificateRoutingModule {}
