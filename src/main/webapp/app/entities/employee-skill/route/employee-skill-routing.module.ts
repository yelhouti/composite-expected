import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmployeeSkillComponent } from '../list/employee-skill.component';
import { EmployeeSkillDetailComponent } from '../detail/employee-skill-detail.component';
import { EmployeeSkillUpdateComponent } from '../update/employee-skill-update.component';
import { EmployeeSkillRoutingResolveService } from './employee-skill-routing-resolve.service';

const employeeSkillRoute: Routes = [
  {
    path: '',
    component: EmployeeSkillComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: '',
      pageTitle: 'compositekeyApp.employeeSkill.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'view',
    component: EmployeeSkillDetailComponent,
    resolve: {
      employeeSkill: EmployeeSkillRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employeeSkill.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeeSkillUpdateComponent,
    resolve: {
      employeeSkill: EmployeeSkillRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employeeSkill.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'edit',
    component: EmployeeSkillUpdateComponent,
    resolve: {
      employeeSkill: EmployeeSkillRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employeeSkill.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeeSkillRoute)],
  exports: [RouterModule],
})
export class EmployeeSkillRoutingModule {}
