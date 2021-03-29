import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { lazyLoadEventToServerQueryParams } from 'app/core/request/request-util';
import { LazyLoadEvent } from 'primeng/api';

import { ITaskComment } from '../task-comment.model';
import { TaskCommentService } from '../service/task-comment.service';
import { MessageService } from 'primeng/api';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';

@Component({
  selector: 'jhi-task-comment-update',
  templateUrl: './task-comment-update.component.html',
})
export class TaskCommentUpdateComponent implements OnInit {
  isSaving = false;
  taskOptions: ITask[] | null = null;
  taskFilterValue?: any;

  editForm = this.fb.group({
    id: [],
    value: [null, [Validators.required]],
    task: [null, [Validators.required]],
  });

  constructor(
    protected messageService: MessageService,
    protected taskCommentService: TaskCommentService,
    protected taskService: TaskService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isSaving = false;

    this.activatedRoute.data.subscribe(({ taskComment }) => {
      this.updateForm(taskComment);
    });
  }

  onTaskLazyLoadEvent(event: LazyLoadEvent): void {
    this.taskService.query(lazyLoadEventToServerQueryParams(event, 'name.contains')).subscribe(
      (res: HttpResponse<ITask[]>) => (this.taskOptions = res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(taskComment: ITaskComment | null): void {
    if (taskComment) {
      this.editForm.reset({ ...taskComment }, { emitEvent: false, onlySelf: true });
      if (taskComment.task) {
        this.taskOptions = [taskComment.task];
        this.taskFilterValue = taskComment.task.name;
      }
    } else {
      this.editForm.reset({});
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taskComment = this.editForm.value;
    if (taskComment.id !== null) {
      this.subscribeToSaveResponse(this.taskCommentService.update(taskComment));
    } else {
      this.subscribeToSaveResponse(this.taskCommentService.create(taskComment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaskComment>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
