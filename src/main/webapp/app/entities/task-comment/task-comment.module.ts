import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { TaskCommentComponent } from './task-comment.component';
import { TaskCommentDetailComponent } from './task-comment-detail.component';
import { TaskCommentUpdateComponent } from './task-comment-update.component';
import { TaskCommentDeleteDialogComponent } from './task-comment-delete-dialog.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [TaskCommentComponent, TaskCommentDetailComponent, TaskCommentUpdateComponent, TaskCommentDeleteDialogComponent],
  exports: [TaskCommentDetailComponent, TaskCommentUpdateComponent, TaskCommentDeleteDialogComponent],
  entryComponents: [TaskCommentDeleteDialogComponent],
})
export class TaskCommentModule {}
