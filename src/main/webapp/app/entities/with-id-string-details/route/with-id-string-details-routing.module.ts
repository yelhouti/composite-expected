import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WithIdStringDetailsComponent } from '../list/with-id-string-details.component';
import { WithIdStringDetailsDetailComponent } from '../detail/with-id-string-details-detail.component';
import { WithIdStringDetailsUpdateComponent } from '../update/with-id-string-details-update.component';
import { WithIdStringDetailsRoutingResolveService } from './with-id-string-details-routing-resolve.service';

const withIdStringDetailsRoute: Routes = [
  {
    path: '',
    component: WithIdStringDetailsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.withIdStringDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WithIdStringDetailsDetailComponent,
    resolve: {
      withIdStringDetails: WithIdStringDetailsRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.withIdStringDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WithIdStringDetailsUpdateComponent,
    resolve: {
      withIdStringDetails: WithIdStringDetailsRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.withIdStringDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WithIdStringDetailsUpdateComponent,
    resolve: {
      withIdStringDetails: WithIdStringDetailsRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.withIdStringDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(withIdStringDetailsRoute)],
  exports: [RouterModule],
})
export class WithIdStringDetailsRoutingModule {}
