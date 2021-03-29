import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';
import { FilterMetadata, MessageService } from 'primeng/api';
import { ITask } from '../task.model';
import { TaskType, TASK_TYPE_ARRAY } from 'app/entities/enumerations/task-type.model';
import { TaskService } from '../service/task.service';

import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import {
  lazyLoadEventToServerQueryParams,
  lazyLoadEventToRouterQueryParams,
  fillTableFromQueryParams,
} from 'app/core/request/request-util';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { Table } from 'primeng/table';
import { DataUtils } from 'app/core/util/data-util.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'jhi-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  tasks?: ITask[];
  eventSubscriber?: Subscription;
  typeOptions = TASK_TYPE_ARRAY.map((s: TaskType) => ({ label: s.toString(), value: s }));
  userOptions: IUser[] | null = null;
  userSelectedOptions: IUser[] | null = null;

  totalItems?: number;
  itemsPerPage!: number;
  loading!: boolean;

  @ViewChild('taskTable', { static: true })
  taskTable!: Table;

  private filtersDetails: { [_: string]: { type: string } } = {
    id: { type: 'number' },
    name: { type: 'string' },
    type: { type: 'string' },
    endDate: { type: 'date' },
    createdAt: { type: 'dateTime' },
    modifiedAt: { type: 'dateTime' },
    done: { type: 'boolean' },
    ['user.id']: { type: 'number' },
  };

  constructor(
    protected taskService: TaskService,
    protected userService: UserService,
    protected messageService: MessageService,
    protected dataUtils: DataUtils,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected confirmationService: ConfirmationService,
    protected translateService: TranslateService,
    protected datePipe: DatePipe
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.loading = true;
  }

  ngOnInit(): void {
    this.loadAllUsers();
    this.activatedRoute.queryParams
      .pipe(
        tap(queryParams => fillTableFromQueryParams(this.taskTable, queryParams, this.filtersDetails)),
        tap(() => (this.loading = true)),
        switchMap(() =>
          this.taskService.query(lazyLoadEventToServerQueryParams(this.taskTable.createLazyLoadMetadata(), undefined, this.filtersDetails))
        ),
        // TODO add catchError inside switchMap in blueprint
        filter((res: HttpResponse<ITask[]>) => res.ok)
      )
      .subscribe(
        (res: HttpResponse<ITask[]>) => {
          this.paginateTasks(res.body!, res.headers);
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
    return this.taskTable.filters as { [s: string]: FilterMetadata };
  }

  onLazyLoadEvent(event: LazyLoadEvent): void {
    const queryParams = lazyLoadEventToRouterQueryParams(event, this.filtersDetails);
    this.router.navigate(['/task'], { queryParams });
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('entity.delete.title'),
      message: this.translateService.instant('compositekeyApp.task.delete.question', { id }),
      accept: () => {
        this.taskService.delete(id).subscribe(() => {
          this.router.navigate(['/task'], { queryParams: { r: Date.now() }, queryParamsHandling: 'merge' });
        });
      },
    });
  }

  loadAllUsers(): void {
    this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.userOptions = res.body));
  }

  trackId(index: number, item: ITask): number {
    return item.id!;
  }

  byteSize(field: string): string {
    return this.dataUtils.byteSize(field);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  protected paginateTasks(data: ITask[], headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.tasks = data;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
