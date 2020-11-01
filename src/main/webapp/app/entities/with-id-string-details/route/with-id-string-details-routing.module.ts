import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WithIdStringDetailsComponent } from '../list/with-id-string-details.component';
import { WithIdStringDetailsDetailComponent } from '../detail/with-id-string-details-detail.component';
import { WithIdStringDetailsUpdateComponent } from '../update/with-id-string-details-update.component';
import { WithIdStringDetailsRoutingResolveService } from './with-id-string-details-routing-resolve.service';

const withIdStringDetailsRoute: Routes = [
  {
    path: '',
    component: WithIdStringDetailsComponent,
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WithIdStringDetailsDetailComponent,
    resolve: {
      withIdStringDetails: WithIdStringDetailsRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WithIdStringDetailsUpdateComponent,
    resolve: {
      withIdStringDetails: WithIdStringDetailsRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WithIdStringDetailsUpdateComponent,
    resolve: {
      withIdStringDetails: WithIdStringDetailsRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(withIdStringDetailsRoute)],
  exports: [RouterModule]
})
export class WithIdStringDetailsRoutingModule {}
