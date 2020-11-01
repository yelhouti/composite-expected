import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WithUUIDDetailsComponent } from '../list/with-uuid-details.component';
import { WithUUIDDetailsDetailComponent } from '../detail/with-uuid-details-detail.component';
import { WithUUIDDetailsUpdateComponent } from '../update/with-uuid-details-update.component';
import { WithUUIDDetailsRoutingResolveService } from './with-uuid-details-routing-resolve.service';

const withUUIDDetailsRoute: Routes = [
  {
    path: '',
    component: WithUUIDDetailsComponent,
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':uuid/view',
    component: WithUUIDDetailsDetailComponent,
    resolve: {
      withUUIDDetails: WithUUIDDetailsRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WithUUIDDetailsUpdateComponent,
    resolve: {
      withUUIDDetails: WithUUIDDetailsRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':uuid/edit',
    component: WithUUIDDetailsUpdateComponent,
    resolve: {
      withUUIDDetails: WithUUIDDetailsRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(withUUIDDetailsRoute)],
  exports: [RouterModule]
})
export class WithUUIDDetailsRoutingModule {}
