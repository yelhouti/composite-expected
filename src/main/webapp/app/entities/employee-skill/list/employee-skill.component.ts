import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';
import { FilterMetadata, MessageService } from 'primeng/api';
import { IEmployeeSkill } from '../employee-skill.model';
import { EmployeeSkillService } from '../service/employee-skill.service';

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
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'jhi-employee-skill',
  templateUrl: './employee-skill.component.html',
})
export class EmployeeSkillComponent implements OnInit {
  employeeSkills?: IEmployeeSkill[];
  eventSubscriber?: Subscription;
  taskOptions: ITask[] | null = null;
  employeeOptions: IEmployee[] | null = null;
  employeeSelectedOptions: IEmployee[] | null = null;
  teacherOptions: IEmployee[] | null = null;
  teacherSelectedOptions: IEmployee[] | null = null;

  totalItems?: number;
  itemsPerPage!: number;
  loading!: boolean;

  @ViewChild('employeeSkillTable', { static: true })
  employeeSkillTable!: Table;

  private filtersDetails: { [_: string]: { type: string } } = {
    name: { type: 'string' },
    level: { type: 'number' },
    ['task.id']: { type: 'number' },
    ['employee.username']: { type: 'string' },
    ['teacher.username']: { type: 'string' },
  };

  constructor(
    protected employeeSkillService: EmployeeSkillService,
    protected taskService: TaskService,
    protected employeeService: EmployeeService,
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
        tap(queryParams => fillTableFromQueryParams(this.employeeSkillTable, queryParams, this.filtersDetails)),
        tap(() => (this.loading = true)),
        switchMap(() =>
          this.employeeSkillService.query(
            lazyLoadEventToServerQueryParams(this.employeeSkillTable.createLazyLoadMetadata(), undefined, this.filtersDetails)
          )
        ),
        // TODO add catchError inside switchMap in blueprint
        filter((res: HttpResponse<IEmployeeSkill[]>) => res.ok)
      )
      .subscribe(
        (res: HttpResponse<IEmployeeSkill[]>) => {
          this.paginateEmployeeSkills(res.body!, res.headers);
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
    return this.employeeSkillTable.filters as { [s: string]: FilterMetadata };
  }

  onLazyLoadEvent(event: LazyLoadEvent): void {
    const queryParams = lazyLoadEventToRouterQueryParams(event, this.filtersDetails);
    this.router.navigate(['/employee-skill'], { queryParams });
  }

  delete(name: string, employeeUsername: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('entity.delete.title'),
      message: this.translateService.instant('compositekeyApp.employeeSkill.delete.question', { id: `${name} , ${employeeUsername}` }),
      accept: () => {
        this.employeeSkillService.delete(name, employeeUsername).subscribe(() => {
          this.router.navigate(['/employee-skill'], { queryParams: { r: Date.now() }, queryParamsHandling: 'merge' });
        });
      },
    });
  }

  onTaskLazyLoadEvent(event: LazyLoadEvent): void {
    this.taskService.query(lazyLoadEventToServerQueryParams(event, 'name.contains')).subscribe(res => (this.taskOptions = res.body));
  }

  onEmployeeLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeService
      .query(lazyLoadEventToServerQueryParams(event, 'fullname.contains'))
      .subscribe(res => (this.employeeOptions = res.body));
  }

  onTeacherLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeService
      .query(lazyLoadEventToServerQueryParams(event, 'fullname.contains'))
      .subscribe(res => (this.teacherOptions = res.body));
  }

  trackId(index: number, item: IEmployeeSkill): string {
    return `${item.name!},${item.employee!.username!}`;
  }

  protected paginateEmployeeSkills(data: IEmployeeSkill[], headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.employeeSkills = data;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
