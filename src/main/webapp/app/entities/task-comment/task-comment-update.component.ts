import { Component, OnInit, Optional } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskComment, TaskComment } from 'app/shared/model/task-comment.model';
import { TaskCommentService } from './task-comment.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task/task.service';

@Component({
  selector: 'jhi-task-comment-update',
  templateUrl: './task-comment-update.component.html',
})
export class TaskCommentUpdateComponent implements OnInit {
  isSaving = false;
  tasks: ITask[] = [];

  editForm = this.fb.group({
    id: [],
    value: [null, [Validators.required]],
    task: [null, Validators.required],
  });

  constructor(
    protected taskCommentService: TaskCommentService,
    protected taskService: TaskService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    @Optional() public activeModal?: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.activeModal) {
      return;
    }
    this.activatedRoute.data.subscribe(({ taskComment }) => {
      this.updateForm(taskComment);

      this.taskService.query().subscribe((res: HttpResponse<ITask[]>) => (this.tasks = res.body ?? []));
    });
  }

  updateForm(taskComment: ITaskComment): void {
    this.editForm.patchValue({
      id: taskComment.id,
      value: taskComment.value,
      task: taskComment.task,
    });
  }

  previousState(): void {
    if (this.activeModal) {
      this.activeModal.close();
    } else {
      window.history.back();
    }
  }

  save(): void {
    this.isSaving = true;
    const taskComment = this.createFromForm();
    if (taskComment.id !== undefined) {
      this.subscribeToSaveResponse(this.taskCommentService.update(taskComment));
    } else {
      this.subscribeToSaveResponse(this.taskCommentService.create(taskComment));
    }
  }

  private createFromForm(): ITaskComment {
    return {
      ...new TaskComment(),
      id: this.editForm.get(['id'])!.value,
      value: this.editForm.get(['value'])!.value,
      task: this.editForm.get(['task'])!.value,
    };
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

  trackById(index: number, item: ITask): number {
    return item.id!;
  }
}
