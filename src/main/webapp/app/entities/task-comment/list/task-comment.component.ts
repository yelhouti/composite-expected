import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';
import { FilterMetadata, MessageService } from 'primeng/api';
import { ITaskComment } from '../task-comment.model';
import { TaskCommentService } from '../service/task-comment.service';

import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import {
  lazyLoadEventToServerQueryParams,
  lazyLoadEventToRouterQueryParams,
  fillTableFromQueryParams,
} from 'app/core/request/request-util';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'jhi-task-comment',
  templateUrl: './task-comment.component.html',
})
export class TaskCommentComponent implements OnInit {
  taskComments?: ITaskComment[];
  eventSubscriber?: Subscription;
  taskOptions: ITask[] | null = null;
  taskSelectedOptions: ITask[] | null = null;

  totalItems?: number;
  itemsPerPage!: number;
  loading!: boolean;

  @ViewChild('taskCommentTable', { static: true })
  taskCommentTable!: Table;

  private filtersDetails: { [_: string]: { type: string } } = {
    id: { type: 'number' },
    value: { type: 'string' },
    ['task.id']: { type: 'number' },
  };

  constructor(
    protected taskCommentService: TaskCommentService,
    protected taskService: TaskService,
    protected messageService: MessageService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected confirmationService: ConfirmationService,
    protected translateService: TranslateService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.loading = true;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        tap(queryParams => fillTableFromQueryParams(this.taskCommentTable, queryParams, this.filtersDetails)),
        tap(() => (this.loading = true)),
        switchMap(() =>
          this.taskCommentService.query(
            lazyLoadEventToServerQueryParams(this.taskCommentTable.createLazyLoadMetadata(), undefined, this.filtersDetails)
          )
        ),
        // TODO add catchError inside switchMap in blueprint
        filter((res: HttpResponse<ITaskComment[]>) => res.ok)
      )
      .subscribe(
        (res: HttpResponse<ITaskComment[]>) => {
          this.paginateTaskComments(res.body!, res.headers);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.onError(err.message);
          console.error(err);
          this.loading = false;
        }
      );
  }

  get filters(): { [s: string]: FilterMetadata } {
    return this.taskCommentTable.filters as { [s: string]: FilterMetadata };
  }

  onLazyLoadEvent(event: LazyLoadEvent): void {
    const queryParams = lazyLoadEventToRouterQueryParams(event, this.filtersDetails);
    this.router.navigate(['/task-comment'], { queryParams });
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('entity.delete.title'),
      message: this.translateService.instant('compositekeyApp.taskComment.delete.question', { id }),
      accept: () => {
        this.taskCommentService.delete(id).subscribe(() => {
          this.router.navigate(['/task-comment'], { queryParams: { r: Date.now() }, queryParamsHandling: 'merge' });
        });
      },
    });
  }

  onTaskLazyLoadEvent(event: LazyLoadEvent): void {
    this.taskService.query(lazyLoadEventToServerQueryParams(event, 'name.contains')).subscribe(res => (this.taskOptions = res.body));
  }

  trackId(index: number, item: ITaskComment): number {
    return item.id!;
  }

  protected paginateTaskComments(data: ITaskComment[], headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.taskComments = data;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
