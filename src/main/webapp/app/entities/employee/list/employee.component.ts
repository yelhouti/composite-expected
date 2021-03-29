import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';
import { FilterMetadata, MessageService } from 'primeng/api';
import { IEmployee } from '../employee.model';
import { EmployeeService } from '../service/employee.service';

import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import {
  lazyLoadEventToServerQueryParams,
  lazyLoadEventToRouterQueryParams,
  fillTableFromQueryParams,
} from 'app/core/request/request-util';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'jhi-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  employees?: IEmployee[];
  eventSubscriber?: Subscription;
  managerOptions: IEmployee[] | null = null;
  managerSelectedOptions: IEmployee[] | null = null;

  totalItems?: number;
  itemsPerPage!: number;
  loading!: boolean;

  @ViewChild('employeeTable', { static: true })
  employeeTable!: Table;

  private filtersDetails: { [_: string]: { type: string } } = {
    username: { type: 'string' },
    fullname: { type: 'string' },
    ['manager.username']: { type: 'string' },
  };

  constructor(
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
        tap(queryParams => fillTableFromQueryParams(this.employeeTable, queryParams, this.filtersDetails)),
        tap(() => (this.loading = true)),
        switchMap(() =>
          this.employeeService.query(
            lazyLoadEventToServerQueryParams(this.employeeTable.createLazyLoadMetadata(), undefined, this.filtersDetails)
          )
        ),
        // TODO add catchError inside switchMap in blueprint
        filter((res: HttpResponse<IEmployee[]>) => res.ok)
      )
      .subscribe(
        (res: HttpResponse<IEmployee[]>) => {
          this.paginateEmployees(res.body!, res.headers);
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
    return this.employeeTable.filters as { [s: string]: FilterMetadata };
  }

  onLazyLoadEvent(event: LazyLoadEvent): void {
    const queryParams = lazyLoadEventToRouterQueryParams(event, this.filtersDetails);
    this.router.navigate(['/employee'], { queryParams });
  }

  delete(username: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('entity.delete.title'),
      message: this.translateService.instant('compositekeyApp.employee.delete.question', { id: `${username}` }),
      accept: () => {
        this.employeeService.delete(username).subscribe(() => {
          this.router.navigate(['/employee'], { queryParams: { r: Date.now() }, queryParamsHandling: 'merge' });
        });
      },
    });
  }

  onManagerLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeService
      .query(lazyLoadEventToServerQueryParams(event, 'fullname.contains'))
      .subscribe(res => (this.managerOptions = res.body));
  }

  trackId(index: number, item: IEmployee): string {
    return item.username!;
  }

  protected paginateEmployees(data: IEmployee[], headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.employees = data;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
