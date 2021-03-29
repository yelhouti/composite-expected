import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmployeeSkillCertificateDetailsComponent } from '../list/employee-skill-certificate-details.component';
import { EmployeeSkillCertificateDetailsDetailComponent } from '../detail/employee-skill-certificate-details-detail.component';
import { EmployeeSkillCertificateDetailsUpdateComponent } from '../update/employee-skill-certificate-details-update.component';
import { EmployeeSkillCertificateDetailsRoutingResolveService } from './employee-skill-certificate-details-routing-resolve.service';

const employeeSkillCertificateDetailsRoute: Routes = [
  {
    path: '',
    component: EmployeeSkillCertificateDetailsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employeeSkillCertificateDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'view',
    component: EmployeeSkillCertificateDetailsDetailComponent,
    resolve: {
      employeeSkillCertificateDetails: EmployeeSkillCertificateDetailsRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employeeSkillCertificateDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeeSkillCertificateDetailsUpdateComponent,
    resolve: {
      employeeSkillCertificateDetails: EmployeeSkillCertificateDetailsRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employeeSkillCertificateDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'edit',
    component: EmployeeSkillCertificateDetailsUpdateComponent,
    resolve: {
      employeeSkillCertificateDetails: EmployeeSkillCertificateDetailsRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employeeSkillCertificateDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeeSkillCertificateDetailsRoute)],
  exports: [RouterModule],
})
export class EmployeeSkillCertificateDetailsRoutingModule {}
