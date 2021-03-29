import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { filter, takeUntil } from 'rxjs/operators';
import { lazyLoadEventToServerQueryParams } from 'app/core/request/request-util';
import { LazyLoadEvent } from 'primeng/api';

import { IEmployeeSkillCertificate } from '../employee-skill-certificate.model';
import { EmployeeSkillCertificateService } from '../service/employee-skill-certificate.service';
import { MessageService } from 'primeng/api';
import { ICertificateType } from 'app/entities/certificate-type/certificate-type.model';
import { CertificateTypeService } from 'app/entities/certificate-type/service/certificate-type.service';
import { IEmployeeSkill } from 'app/entities/employee-skill/employee-skill.model';
import { EmployeeSkillService } from 'app/entities/employee-skill/service/employee-skill.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

@Component({
  selector: 'jhi-employee-skill-certificate-update',
  templateUrl: './employee-skill-certificate-update.component.html',
})
export class EmployeeSkillCertificateUpdateComponent implements OnInit, OnDestroy {
  edit = false;
  isSaving = false;
  typeOptions: ICertificateType[] | null = null;
  typeFilterValue?: any;
  skillEmployeeOptions: IEmployee[] | null = null;
  skillEmployeeFilterValue?: any;
  skillOptions: IEmployeeSkill[] | null = null;
  skillFilterValue?: any;

  editForm = this.fb.group({
    grade: [null, [Validators.required]],
    date: [null, [Validators.required]],
    type: [null, [Validators.required]],
    skill: this.fb.group({
      name: [null, [Validators.required]],
      employee: [null, [Validators.required]],
    }),
  });

  onDestroySubject = new Subject<void>();

  constructor(
    protected messageService: MessageService,
    protected employeeSkillCertificateService: EmployeeSkillCertificateService,
    protected certificateTypeService: CertificateTypeService,
    protected employeeService: EmployeeService,
    protected employeeSkillService: EmployeeSkillService,
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
        this.onSkillLazyLoadEvent({});
        this.skillForm.get('name')!.reset();
      });

    this.activatedRoute.data.subscribe(({ employeeSkillCertificate }) => {
      this.updateForm(employeeSkillCertificate);
    });
    this.loadAllTypes();
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next(undefined);
    this.onDestroySubject.complete();
  }

  get skillForm(): FormGroup {
    return this.editForm.get('skill')! as FormGroup;
  }

  get employeeForm(): FormGroup {
    return this.skillForm.get('employee')! as FormGroup;
  }

  loadAllTypes(): void {
    this.certificateTypeService.query().subscribe(
      (res: HttpResponse<ICertificateType[]>) => (this.typeOptions = res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  onSkillEmployeeLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeService.query(lazyLoadEventToServerQueryParams(event, 'fullname.contains')).subscribe(
      (res: HttpResponse<IEmployee[]>) => (this.skillEmployeeOptions = res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }
  onSkillLazyLoadEvent(event: LazyLoadEvent): void {
    if (this.skillForm.get('employee')!.value) {
      this.employeeSkillService
        .query({
          ...lazyLoadEventToServerQueryParams(event, 'name.contains'),
          'employee.username.equals': this.skillForm.get('employee')!.value.username,
        })
        .subscribe(
          (res: HttpResponse<IEmployeeSkill[]>) => (this.skillOptions = res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    } else {
      this.skillOptions = null;
    }
  }

  updateForm(employeeSkillCertificate: IEmployeeSkillCertificate | null): void {
    if (employeeSkillCertificate) {
      this.edit = true;
      this.editForm.reset({ ...employeeSkillCertificate }, { emitEvent: false, onlySelf: true });
      this.typeFilterValue = employeeSkillCertificate.type?.name;
      if (employeeSkillCertificate.skill?.employee) {
        this.skillEmployeeOptions = [employeeSkillCertificate.skill.employee];
        this.skillEmployeeFilterValue = employeeSkillCertificate.skill.employee.fullname;
      }
      if (employeeSkillCertificate.skill) {
        this.skillOptions = [employeeSkillCertificate.skill];
        this.skillFilterValue = employeeSkillCertificate.skill.name;
      }
    } else {
      this.edit = false;
      this.editForm.reset({
        date: new Date(),
      });
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employeeSkillCertificate = this.editForm.value;
    if (this.edit) {
      this.subscribeToSaveResponse(this.employeeSkillCertificateService.update(employeeSkillCertificate));
    } else {
      this.subscribeToSaveResponse(this.employeeSkillCertificateService.create(employeeSkillCertificate));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeSkillCertificate>>): void {
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
