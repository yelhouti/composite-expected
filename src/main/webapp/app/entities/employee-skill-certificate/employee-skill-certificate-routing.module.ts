import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Authority } from 'app/core/user/authority.model';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmployeeSkillCertificateComponent } from './employee-skill-certificate.component';
import { EmployeeSkillCertificateDetailComponent } from './employee-skill-certificate-detail.component';
import { EmployeeSkillCertificateUpdateComponent } from './employee-skill-certificate-update.component';
import { EmployeeSkillCertificateRoutingResolveService } from './employee-skill-certificate-routing-resolve.service';
import { EmployeeSkillCertificateModule } from './employee-skill-certificate.module';

const employeeSkillCertificateRoute: Routes = [
  {
    path: '',
    component: EmployeeSkillCertificateComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'compositekeyApp.employeeSkillCertificate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
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
    path: ':id/edit',
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
  imports: [RouterModule.forChild(employeeSkillCertificateRoute), EmployeeSkillCertificateModule],
  exports: [EmployeeSkillCertificateModule],
})
export class EmployeeSkillCertificateRoutingModule {}
