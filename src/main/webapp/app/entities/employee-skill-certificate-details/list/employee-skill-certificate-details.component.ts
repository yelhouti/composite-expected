import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FilterMetadata, MessageService } from 'primeng/api';
import { IEmployeeSkillCertificateDetails } from '../employee-skill-certificate-details.model';
import { EmployeeSkillCertificateDetailsService } from '../service/employee-skill-certificate-details.service';
import { lazyLoadEventToServerQueryParams } from 'app/core/request/request-util';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ICertificateType } from 'app/entities/certificate-type/certificate-type.model';
import { CertificateTypeService } from 'app/entities/certificate-type/service/certificate-type.service';
import { IEmployeeSkill } from 'app/entities/employee-skill/employee-skill.model';
import { EmployeeSkillService } from 'app/entities/employee-skill/service/employee-skill.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'jhi-employee-skill-certificate-details',
  templateUrl: './employee-skill-certificate-details.component.html',
})
export class EmployeeSkillCertificateDetailsComponent implements OnInit {
  employeeSkillCertificateDetails?: IEmployeeSkillCertificateDetails[];
  eventSubscriber?: Subscription;
  employeeSkillCertificateSkillEmployeeOptions: IEmployee[] | null = null;
  employeeSkillCertificateSkillEmployeeSelectedOptions: IEmployee[] | null = null;
  employeeSkillCertificateSkillOptions: IEmployeeSkill[] | null = null;
  employeeSkillCertificateSkillSelectedOptions: IEmployeeSkill[] | null = null;
  employeeSkillCertificateTypeOptions: ICertificateType[] | null = null;
  employeeSkillCertificateTypeSelectedOptions: ICertificateType[] | null = null;

  @ViewChild('employeeSkillCertificateDetailsTable', { static: true })
  employeeSkillCertificateDetailsTable!: Table;

  private filtersDetails: { [_: string]: { type: string } } = {
    detail: { type: 'string' },
    ['employeeSkillCertificate.skill.employee.username']: { type: 'string' },
    ['employeeSkillCertificate.skill.name']: { type: 'string' },
    ['employeeSkillCertificate.type.id']: { type: 'number' },
  };

  constructor(
    protected employeeSkillCertificateDetailsService: EmployeeSkillCertificateDetailsService,
    protected employeeService: EmployeeService,
    protected employeeSkillService: EmployeeSkillService,
    protected certificateTypeService: CertificateTypeService,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  get filters(): { [s: string]: FilterMetadata } {
    return this.employeeSkillCertificateDetailsTable.filters as { [s: string]: FilterMetadata };
  }

  loadAll(): void {
    this.employeeSkillCertificateDetailsService
      .query()
      .pipe(
        filter((res: HttpResponse<IEmployeeSkillCertificateDetails[]>) => res.ok),
        map((res: HttpResponse<IEmployeeSkillCertificateDetails[]>) => res.body!)
      )
      .subscribe(
        (employeeSkillCertificateDetails: IEmployeeSkillCertificateDetails[]) => {
          this.employeeSkillCertificateDetails = employeeSkillCertificateDetails;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  delete(typeId: number, skillName: string, skillEmployeeUsername: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('entity.delete.title'),
      message: this.translateService.instant('compositekeyApp.employeeSkillCertificateDetails.delete.question', {
        id: `${typeId} , ${skillName} , ${skillEmployeeUsername}`,
      }),
      accept: () => {
        this.employeeSkillCertificateDetailsService.delete(typeId, skillName, skillEmployeeUsername).subscribe(() => {
          this.loadAll();
        });
      },
    });
  }

  onEmployeeSkillCertificateSkillEmployeeLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeService
      .query(lazyLoadEventToServerQueryParams(event, 'skill.employee.fullname.contains'))
      .subscribe(res => (this.employeeSkillCertificateSkillEmployeeOptions = res.body));
  }
  onEmployeeSkillCertificateSkillLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeSkillService
      .query(lazyLoadEventToServerQueryParams(event, 'skill.name.contains'))
      .subscribe(res => (this.employeeSkillCertificateSkillOptions = res.body));
  }
  onEmployeeSkillCertificateTypeLazyLoadEvent(event: LazyLoadEvent): void {
    this.certificateTypeService
      .query(lazyLoadEventToServerQueryParams(event, 'type.name.contains'))
      .subscribe(res => (this.employeeSkillCertificateTypeOptions = res.body));
  }

  trackId(index: number, item: IEmployeeSkillCertificateDetails): string {
    return `${item.employeeSkillCertificate!.type!.id!},${item.employeeSkillCertificate!.skill!.name!},${item.employeeSkillCertificate!
      .skill!.employee!.username!}`;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
