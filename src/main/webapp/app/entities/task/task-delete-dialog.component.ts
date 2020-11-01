import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITask } from 'app/shared/model/task.model';
import { TaskService } from './task.service';
import { EventManager } from 'app/core/event-manager/event-manager.service';

@Component({
  templateUrl: './task-delete-dialog.component.html',
})
export class TaskDeleteDialogComponent {
  task?: ITask;

  constructor(protected taskService: TaskService, public activeModal: NgbActiveModal, protected eventManager: EventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taskService.delete(id).subscribe(() => {
      this.eventManager.broadcast('taskListModification');
      this.activeModal.close();
    });
  }
}
