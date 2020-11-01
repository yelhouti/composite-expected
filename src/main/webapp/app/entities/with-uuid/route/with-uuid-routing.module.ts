import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WithUUIDComponent } from '../list/with-uuid.component';
import { WithUUIDDetailComponent } from '../detail/with-uuid-detail.component';
import { WithUUIDUpdateComponent } from '../update/with-uuid-update.component';
import { WithUUIDRoutingResolveService } from './with-uuid-routing-resolve.service';

const withUUIDRoute: Routes = [
  {
    path: '',
    component: WithUUIDComponent,
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':uuid/view',
    component: WithUUIDDetailComponent,
    resolve: {
      withUUID: WithUUIDRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WithUUIDUpdateComponent,
    resolve: {
      withUUID: WithUUIDRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':uuid/edit',
    component: WithUUIDUpdateComponent,
    resolve: {
      withUUID: WithUUIDRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(withUUIDRoute)],
  exports: [RouterModule]
})
export class WithUUIDRoutingModule {}
