import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WithUUIDDetailsComponent } from '../list/with-uuid-details.component';
import { WithUUIDDetailsDetailComponent } from '../detail/with-uuid-details-detail.component';
import { WithUUIDDetailsUpdateComponent } from '../update/with-uuid-details-update.component';
import { WithUUIDDetailsRoutingResolveService } from './with-uuid-details-routing-resolve.service';

const withUUIDDetailsRoute: Routes = [
  {
    path: '',
    component: WithUUIDDetailsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.withUUIDDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':uuid/view',
    component: WithUUIDDetailsDetailComponent,
    resolve: {
      withUUIDDetails: WithUUIDDetailsRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.withUUIDDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WithUUIDDetailsUpdateComponent,
    resolve: {
      withUUIDDetails: WithUUIDDetailsRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.withUUIDDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':uuid/edit',
    component: WithUUIDDetailsUpdateComponent,
    resolve: {
      withUUIDDetails: WithUUIDDetailsRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.withUUIDDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(withUUIDDetailsRoute)],
  exports: [RouterModule],
})
export class WithUUIDDetailsRoutingModule {}
