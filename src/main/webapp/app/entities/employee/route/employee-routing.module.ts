import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmployeeComponent } from '../list/employee.component';
import { EmployeeDetailComponent } from '../detail/employee-detail.component';
import { EmployeeUpdateComponent } from '../update/employee-update.component';
import { EmployeeRoutingResolveService } from './employee-routing-resolve.service';

const employeeRoute: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'username,asc',
      pageTitle: 'compositekeyApp.employee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':username/view',
    component: EmployeeDetailComponent,
    resolve: {
      employee: EmployeeRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeeUpdateComponent,
    resolve: {
      employee: EmployeeRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':username/edit',
    component: EmployeeUpdateComponent,
    resolve: {
      employee: EmployeeRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.employee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeeRoute)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
