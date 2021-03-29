import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TaskCommentComponent } from '../list/task-comment.component';
import { TaskCommentDetailComponent } from '../detail/task-comment-detail.component';
import { TaskCommentUpdateComponent } from '../update/task-comment-update.component';
import { TaskCommentRoutingResolveService } from './task-comment-routing-resolve.service';

const taskCommentRoute: Routes = [
  {
    path: '',
    component: TaskCommentComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'compositekeyApp.taskComment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaskCommentDetailComponent,
    resolve: {
      taskComment: TaskCommentRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.taskComment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaskCommentUpdateComponent,
    resolve: {
      taskComment: TaskCommentRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.taskComment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaskCommentUpdateComponent,
    resolve: {
      taskComment: TaskCommentRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.taskComment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(taskCommentRoute)],
  exports: [RouterModule],
})
export class TaskCommentRoutingModule {}
