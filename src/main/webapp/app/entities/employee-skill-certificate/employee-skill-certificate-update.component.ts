import { Component, OnInit, Optional } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployeeSkillCertificate, EmployeeSkillCertificate } from 'app/shared/model/employee-skill-certificate.model';
import { EmployeeSkillCertificateService } from './employee-skill-certificate.service';
import { ICertificateType } from 'app/shared/model/certificate-type.model';
import { CertificateTypeService } from 'app/entities/certificate-type/certificate-type.service';
import { IEmployeeSkill } from 'app/shared/model/employee-skill.model';
import { EmployeeSkillService } from 'app/entities/employee-skill/employee-skill.service';

type SelectableEntity = ICertificateType | IEmployeeSkill;

@Component({
  selector: 'jhi-employee-skill-certificate-update',
  templateUrl: './employee-skill-certificate-update.component.html',
})
export class EmployeeSkillCertificateUpdateComponent implements OnInit {
  isSaving = false;
  certificatetypes: ICertificateType[] = [];
  employeeskills: IEmployeeSkill[] = [];

  editForm = this.fb.group({
    id: [],
    grade: [null, [Validators.required]],
    date: [null, [Validators.required]],
    type: [null, Validators.required],
    skill: [null, Validators.required],
  });

  constructor(
    protected employeeSkillCertificateService: EmployeeSkillCertificateService,
    protected certificateTypeService: CertificateTypeService,
    protected employeeSkillService: EmployeeSkillService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    @Optional() public activeModal?: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.activeModal) {
      return;
    }
    this.activatedRoute.data.subscribe(({ employeeSkillCertificate }) => {
      this.updateForm(employeeSkillCertificate);

      this.certificateTypeService.query().subscribe((res: HttpResponse<ICertificateType[]>) => (this.certificatetypes = res.body ?? []));

      this.employeeSkillService.query().subscribe((res: HttpResponse<IEmployeeSkill[]>) => (this.employeeskills = res.body ?? []));
    });
  }

  updateForm(employeeSkillCertificate: IEmployeeSkillCertificate): void {
    this.editForm.patchValue({
      id: employeeSkillCertificate.id,
      grade: employeeSkillCertificate.grade,
      date: employeeSkillCertificate.date,
      type: employeeSkillCertificate.type,
      skill: employeeSkillCertificate.skill,
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
    const employeeSkillCertificate = this.createFromForm();
    if (employeeSkillCertificate.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeSkillCertificateService.update(employeeSkillCertificate));
    } else {
      this.subscribeToSaveResponse(this.employeeSkillCertificateService.create(employeeSkillCertificate));
    }
  }

  private createFromForm(): IEmployeeSkillCertificate {
    return {
      ...new EmployeeSkillCertificate(),
      id: this.editForm.get(['id'])!.value,
      grade: this.editForm.get(['grade'])!.value,
      date: this.editForm.get(['date'])!.value,
      type: this.editForm.get(['type'])!.value,
      skill: this.editForm.get(['skill'])!.value,
    };
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

  trackById(index: number, item: SelectableEntity): number {
    return item.id!;
  }
}
