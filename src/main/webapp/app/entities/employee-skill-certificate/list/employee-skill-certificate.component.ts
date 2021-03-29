import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';
import { FilterMetadata, MessageService } from 'primeng/api';
import { IEmployeeSkillCertificate } from '../employee-skill-certificate.model';
import { EmployeeSkillCertificateService } from '../service/employee-skill-certificate.service';

import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import {
  lazyLoadEventToServerQueryParams,
  lazyLoadEventToRouterQueryParams,
  fillTableFromQueryParams,
} from 'app/core/request/request-util';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ICertificateType } from 'app/entities/certificate-type/certificate-type.model';
import { CertificateTypeService } from 'app/entities/certificate-type/service/certificate-type.service';
import { IEmployeeSkill } from 'app/entities/employee-skill/employee-skill.model';
import { EmployeeSkillService } from 'app/entities/employee-skill/service/employee-skill.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'jhi-employee-skill-certificate',
  templateUrl: './employee-skill-certificate.component.html',
})
export class EmployeeSkillCertificateComponent implements OnInit {
  employeeSkillCertificates?: IEmployeeSkillCertificate[];
  eventSubscriber?: Subscription;
  typeOptions: ICertificateType[] | null = null;
  typeSelectedOptions: ICertificateType[] | null = null;
  skillEmployeeOptions: IEmployee[] | null = null;
  skillEmployeeSelectedOptions: IEmployee[] | null = null;
  skillOptions: IEmployeeSkill[] | null = null;
  skillSelectedOptions: IEmployeeSkill[] | null = null;

  totalItems?: number;
  itemsPerPage!: number;
  loading!: boolean;

  @ViewChild('employeeSkillCertificateTable', { static: true })
  employeeSkillCertificateTable!: Table;

  private filtersDetails: { [_: string]: { type: string } } = {
    grade: { type: 'number' },
    date: { type: 'date' },
    ['type.id']: { type: 'number' },
    ['skill.employee.username']: { type: 'string' },
    ['skill.name']: { type: 'string' },
  };

  constructor(
    protected employeeSkillCertificateService: EmployeeSkillCertificateService,
    protected certificateTypeService: CertificateTypeService,
    protected employeeService: EmployeeService,
    protected employeeSkillService: EmployeeSkillService,
    protected messageService: MessageService,
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
    this.loadAllTypes();
    this.activatedRoute.queryParams
      .pipe(
        tap(queryParams => fillTableFromQueryParams(this.employeeSkillCertificateTable, queryParams, this.filtersDetails)),
        tap(() => (this.loading = true)),
        switchMap(() =>
          this.employeeSkillCertificateService.query(
            lazyLoadEventToServerQueryParams(this.employeeSkillCertificateTable.createLazyLoadMetadata(), undefined, this.filtersDetails)
          )
        ),
        // TODO add catchError inside switchMap in blueprint
        filter((res: HttpResponse<IEmployeeSkillCertificate[]>) => res.ok)
      )
      .subscribe(
        (res: HttpResponse<IEmployeeSkillCertificate[]>) => {
          this.paginateEmployeeSkillCertificates(res.body!, res.headers);
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
    return this.employeeSkillCertificateTable.filters as { [s: string]: FilterMetadata };
  }

  onLazyLoadEvent(event: LazyLoadEvent): void {
    const queryParams = lazyLoadEventToRouterQueryParams(event, this.filtersDetails);
    this.router.navigate(['/employee-skill-certificate'], { queryParams });
  }

  delete(typeId: number, skillName: string, skillEmployeeUsername: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('entity.delete.title'),
      message: this.translateService.instant('compositekeyApp.employeeSkillCertificate.delete.question', {
        id: `${typeId} , ${skillName} , ${skillEmployeeUsername}`,
      }),
      accept: () => {
        this.employeeSkillCertificateService.delete(typeId, skillName, skillEmployeeUsername).subscribe(() => {
          this.router.navigate(['/employee-skill-certificate'], { queryParams: { r: Date.now() }, queryParamsHandling: 'merge' });
        });
      },
    });
  }

  loadAllTypes(): void {
    this.certificateTypeService.query().subscribe((res: HttpResponse<ICertificateType[]>) => (this.typeOptions = res.body));
  }

  onSkillEmployeeLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeService
      .query(lazyLoadEventToServerQueryParams(event, 'employee.fullname.contains'))
      .subscribe(res => (this.skillEmployeeOptions = res.body));
  }
  onSkillLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeSkillService
      .query(lazyLoadEventToServerQueryParams(event, 'name.contains'))
      .subscribe(res => (this.skillOptions = res.body));
  }

  trackId(index: number, item: IEmployeeSkillCertificate): string {
    return `${item.type!.id!},${item.skill!.name!},${item.skill!.employee!.username!}`;
  }

  protected paginateEmployeeSkillCertificates(data: IEmployeeSkillCertificate[], headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.employeeSkillCertificates = data;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
