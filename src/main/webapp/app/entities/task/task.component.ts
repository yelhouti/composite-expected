import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITask } from 'app/shared/model/task.model';
import { TaskService } from './task.service';
import { TaskDeleteDialogComponent } from './task-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  tasks?: ITask[];
  isLoading = false;

  constructor(protected taskService: TaskService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.taskService.query().subscribe(
      (res: HttpResponse<ITask[]>) => {
        this.isLoading = false;
        this.tasks = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  handleSyncList(): void {
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITask): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType = ''): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(task: ITask): void {
    const modalRef = this.modalService.open(TaskDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.task = task;
    modalRef.result.then(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
