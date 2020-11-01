import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
      defaultSort: 'id,asc'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':name/view',
    component: EmployeeSkillDetailComponent,
    resolve: {
      employeeSkill: EmployeeSkillRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EmployeeSkillUpdateComponent,
    resolve: {
      employeeSkill: EmployeeSkillRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':name/edit',
    component: EmployeeSkillUpdateComponent,
    resolve: {
      employeeSkill: EmployeeSkillRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(employeeSkillRoute)],
  exports: [RouterModule]
})
export class EmployeeSkillRoutingModule {}
