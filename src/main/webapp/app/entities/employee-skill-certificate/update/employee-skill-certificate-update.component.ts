import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEmployeeSkillCertificate, EmployeeSkillCertificate } from '../employee-skill-certificate.model';
import { EmployeeSkillCertificateService } from '../service/employee-skill-certificate.service';
import { ICertificateType } from 'app/entities/certificate-type/certificate-type.model';
import { CertificateTypeService } from 'app/entities/certificate-type/service/certificate-type.service';
import { IEmployeeSkill } from 'app/entities/employee-skill/employee-skill.model';
import { EmployeeSkillService } from 'app/entities/employee-skill/service/employee-skill.service';

@Component({
  selector: 'jhi-employee-skill-certificate-update',
  templateUrl: './employee-skill-certificate-update.component.html'
})
export class EmployeeSkillCertificateUpdateComponent implements OnInit {
  isSaving = false;

  certificateTypesSharedCollection: ICertificateType[] = [];
  employeeSkillsSharedCollection: IEmployeeSkill[] = [];

  editForm = this.fb.group({
    id: [],
    grade: [null, [Validators.required]],
    date: [null, [Validators.required]],
    type: [null, Validators.required],
    skill: [null, Validators.required]
  });

  constructor(
    protected employeeSkillCertificateService: EmployeeSkillCertificateService,
    protected certificateTypeService: CertificateTypeService,
    protected employeeSkillService: EmployeeSkillService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employeeSkillCertificate }) => {
      this.updateForm(employeeSkillCertificate);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employeeSkillCertificate = this.createFromForm();
    if (employeeSkillCertificate.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeSkillCertificateService.update(employeeSkillCertificate));
    } else {
      this.subscribeToSaveResponse(this.employeeSkillCertificateService.create(employeeSkillCertificate));
    }
  }

  trackCertificateTypeById(index: number, item: ICertificateType): number {
    return item.id!;
  }

  trackEmployeeSkillByName(index: number, item: IEmployeeSkill): string {
    return item.name!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeSkillCertificate>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(employeeSkillCertificate: IEmployeeSkillCertificate): void {
    this.editForm.patchValue({
      id: employeeSkillCertificate.id,
      grade: employeeSkillCertificate.grade,
      date: employeeSkillCertificate.date,
      type: employeeSkillCertificate.type,
      skill: employeeSkillCertificate.skill
    });

    this.certificateTypesSharedCollection = this.certificateTypeService.addCertificateTypeToCollectionIfMissing(
      this.certificateTypesSharedCollection,
      employeeSkillCertificate.type
    );
    this.employeeSkillsSharedCollection = this.employeeSkillService.addEmployeeSkillToCollectionIfMissing(
      this.employeeSkillsSharedCollection,
      employeeSkillCertificate.skill
    );
  }

  protected loadRelationshipsOptions(): void {
    this.certificateTypeService
      .query()
      .pipe(map((res: HttpResponse<ICertificateType[]>) => res.body ?? []))
      .pipe(
        map((certificateTypes: ICertificateType[]) =>
          this.certificateTypeService.addCertificateTypeToCollectionIfMissing(certificateTypes, this.editForm.get('type')!.value)
        )
      )
      .subscribe((certificateTypes: ICertificateType[]) => (this.certificateTypesSharedCollection = certificateTypes));

    this.employeeSkillService
      .query()
      .pipe(map((res: HttpResponse<IEmployeeSkill[]>) => res.body ?? []))
      .pipe(
        map((employeeSkills: IEmployeeSkill[]) =>
          this.employeeSkillService.addEmployeeSkillToCollectionIfMissing(employeeSkills, this.editForm.get('skill')!.value)
        )
      )
      .subscribe((employeeSkills: IEmployeeSkill[]) => (this.employeeSkillsSharedCollection = employeeSkills));
  }

  protected createFromForm(): IEmployeeSkillCertificate {
    return {
      ...new EmployeeSkillCertificate(),
      id: this.editForm.get(['id'])!.value,
      grade: this.editForm.get(['grade'])!.value,
      date: this.editForm.get(['date'])!.value,
      type: this.editForm.get(['type'])!.value,
      skill: this.editForm.get(['skill'])!.value
    };
  }
}
