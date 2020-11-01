import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaskComment } from 'app/shared/model/task-comment.model';
import { TaskCommentService } from './task-comment.service';

@Component({
  templateUrl: './task-comment-delete-dialog.component.html',
})
export class TaskCommentDeleteDialogComponent {
  taskComment?: ITaskComment;

  constructor(
    protected taskCommentService: TaskCommentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taskCommentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('taskCommentListModification');
      this.activeModal.close();
    });
  }
}
