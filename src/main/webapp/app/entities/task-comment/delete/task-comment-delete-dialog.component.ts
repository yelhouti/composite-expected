import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskComment } from '../task-comment.model';
import { TaskCommentService } from '../service/task-comment.service';

@Component({
  templateUrl: './task-comment-delete-dialog.component.html'
})
export class TaskCommentDeleteDialogComponent {
  taskComment?: ITaskComment;

  constructor(protected taskCommentService: TaskCommentService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taskCommentService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
