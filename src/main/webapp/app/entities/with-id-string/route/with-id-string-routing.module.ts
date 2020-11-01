import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WithIdStringComponent } from '../list/with-id-string.component';
import { WithIdStringDetailComponent } from '../detail/with-id-string-detail.component';
import { WithIdStringUpdateComponent } from '../update/with-id-string-update.component';
import { WithIdStringRoutingResolveService } from './with-id-string-routing-resolve.service';

const withIdStringRoute: Routes = [
  {
    path: '',
    component: WithIdStringComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WithIdStringDetailComponent,
    resolve: {
      withIdString: WithIdStringRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WithIdStringUpdateComponent,
    resolve: {
      withIdString: WithIdStringRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WithIdStringUpdateComponent,
    resolve: {
      withIdString: WithIdStringRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(withIdStringRoute)],
  exports: [RouterModule],
})
export class WithIdStringRoutingModule {}
