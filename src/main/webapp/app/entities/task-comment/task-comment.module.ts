import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TaskCommentComponent } from './list/task-comment.component';
import { TaskCommentDetailComponent } from './detail/task-comment-detail.component';
import { TaskCommentUpdateComponent } from './update/task-comment-update.component';
import { TaskCommentRoutingModule } from './route/task-comment-routing.module';

@NgModule({
  imports: [SharedModule, TaskCommentRoutingModule],
  declarations: [TaskCommentComponent, TaskCommentDetailComponent, TaskCommentUpdateComponent],
})
export class TaskCommentModule {}
