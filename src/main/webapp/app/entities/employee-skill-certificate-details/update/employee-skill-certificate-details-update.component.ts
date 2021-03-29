import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { filter, takeUntil } from 'rxjs/operators';
import { lazyLoadEventToServerQueryParams } from 'app/core/request/request-util';
import { LazyLoadEvent } from 'primeng/api';

import { IEmployeeSkillCertificateDetails } from '../employee-skill-certificate-details.model';
import { EmployeeSkillCertificateDetailsService } from '../service/employee-skill-certificate-details.service';
import { MessageService } from 'primeng/api';
import { ICertificateType } from 'app/entities/certificate-type/certificate-type.model';
import { CertificateTypeService } from 'app/entities/certificate-type/service/certificate-type.service';
import { IEmployeeSkill } from 'app/entities/employee-skill/employee-skill.model';
import { EmployeeSkillService } from 'app/entities/employee-skill/service/employee-skill.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

@Component({
  selector: 'jhi-employee-skill-certificate-details-update',
  templateUrl: './employee-skill-certificate-details-update.component.html',
})
export class EmployeeSkillCertificateDetailsUpdateComponent implements OnInit, OnDestroy {
  edit = false;
  isSaving = false;
  employeeSkillCertificateSkillEmployeeOptions: IEmployee[] | null = null;
  employeeSkillCertificateSkillEmployeeFilterValue?: any;
  employeeSkillCertificateSkillOptions: IEmployeeSkill[] | null = null;
  employeeSkillCertificateSkillFilterValue?: any;
  employeeSkillCertificateTypeOptions: ICertificateType[] | null = null;
  employeeSkillCertificateTypeFilterValue?: any;

  editForm = this.fb.group({
    detail: [null, [Validators.required]],
    employeeSkillCertificate: this.fb.group({
      type: [null, [Validators.required]],
      skill: this.fb.group({
        name: [null, [Validators.required]],
        employee: [null, [Validators.required]],
      }),
    }),
  });

  onDestroySubject = new Subject<void>();

  constructor(
    protected messageService: MessageService,
    protected employeeSkillCertificateDetailsService: EmployeeSkillCertificateDetailsService,
    protected employeeService: EmployeeService,
    protected employeeSkillService: EmployeeSkillService,
    protected certificateTypeService: CertificateTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isSaving = false;

    this.skillForm
      .get('employee')!
      .valueChanges.pipe(
        takeUntil(this.onDestroySubject),
        filter(() => !this.edit)
      )
      .subscribe(() => {
        this.onEmployeeSkillCertificateSkillLazyLoadEvent({});
        this.skillForm.get('name')!.reset();
      });

    this.employeeSkillCertificateForm
      .get('skill')!
      .valueChanges.pipe(
        takeUntil(this.onDestroySubject),
        filter(() => !this.edit)
      )
      .subscribe(() => {
        this.onEmployeeSkillCertificateTypeLazyLoadEvent({});
        this.typeForm.reset();
      });

    this.activatedRoute.data.subscribe(({ employeeSkillCertificateDetails }) => {
      this.updateForm(employeeSkillCertificateDetails);
    });
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next(undefined);
    this.onDestroySubject.complete();
  }

  get employeeSkillCertificateForm(): FormGroup {
    return this.editForm.get('employeeSkillCertificate')! as FormGroup;
  }

  get typeForm(): FormGroup {
    return this.employeeSkillCertificateForm.get('type')! as FormGroup;
  }

  get skillForm(): FormGroup {
    return this.employeeSkillCertificateForm.get('skill')! as FormGroup;
  }

  get employeeForm(): FormGroup {
    return this.skillForm.get('employee')! as FormGroup;
  }

  onEmployeeSkillCertificateSkillEmployeeLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeService.query(lazyLoadEventToServerQueryParams(event, 'fullname.contains')).subscribe(
      (res: HttpResponse<IEmployee[]>) => (this.employeeSkillCertificateSkillEmployeeOptions = res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }
  onEmployeeSkillCertificateSkillLazyLoadEvent(event: LazyLoadEvent): void {
    if (this.skillForm.get('employee')!.value) {
      this.employeeSkillService
        .query({
          ...lazyLoadEventToServerQueryParams(event, 'name.contains'),
          'employee.username.equals': this.skillForm.get('employee')!.value.username,
        })
        .subscribe(
          (res: HttpResponse<IEmployeeSkill[]>) => (this.employeeSkillCertificateSkillOptions = res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    } else {
      this.employeeSkillCertificateSkillOptions = null;
    }
  }
  onEmployeeSkillCertificateTypeLazyLoadEvent(event: LazyLoadEvent): void {
    if (this.skillForm.get('employee')!.value && this.skillForm.get('name')!.value) {
      this.certificateTypeService
        .query({
          ...lazyLoadEventToServerQueryParams(event, 'name.contains'),
          'employeeSkillCertificate.skill.employee.username.equals': this.skillForm.get('employee')!.value.username,
          'employeeSkillCertificate.skill.name.equals': this.skillForm.get('name')!.value,
        })
        .subscribe(
          (res: HttpResponse<ICertificateType[]>) => (this.employeeSkillCertificateTypeOptions = res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    } else {
      this.employeeSkillCertificateTypeOptions = null;
    }
  }

  updateForm(employeeSkillCertificateDetails: IEmployeeSkillCertificateDetails | null): void {
    if (employeeSkillCertificateDetails) {
      this.edit = true;
      this.editForm.reset({ ...employeeSkillCertificateDetails }, { emitEvent: false, onlySelf: true });
      if (employeeSkillCertificateDetails.employeeSkillCertificate?.skill?.employee) {
        this.employeeSkillCertificateSkillEmployeeOptions = [employeeSkillCertificateDetails.employeeSkillCertificate.skill.employee];
        this.employeeSkillCertificateSkillEmployeeFilterValue =
          employeeSkillCertificateDetails.employeeSkillCertificate.skill.employee.fullname;
      }
      if (employeeSkillCertificateDetails.employeeSkillCertificate?.skill) {
        this.employeeSkillCertificateSkillOptions = [employeeSkillCertificateDetails.employeeSkillCertificate.skill];
        this.employeeSkillCertificateSkillFilterValue = employeeSkillCertificateDetails.employeeSkillCertificate.skill.name;
      }
      this.employeeSkillCertificateTypeFilterValue = employeeSkillCertificateDetails.employeeSkillCertificate?.type?.name;
    } else {
      this.edit = false;
      this.editForm.reset({});
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employeeSkillCertificateDetails = this.editForm.value;
    if (this.edit) {
      this.subscribeToSaveResponse(this.employeeSkillCertificateDetailsService.update(employeeSkillCertificateDetails));
    } else {
      this.subscribeToSaveResponse(this.employeeSkillCertificateDetailsService.create(employeeSkillCertificateDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeSkillCertificateDetails>>): void {
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
