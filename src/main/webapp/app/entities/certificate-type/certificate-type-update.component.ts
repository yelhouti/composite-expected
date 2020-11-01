import { Component, OnInit, Optional } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICertificateType, CertificateType } from 'app/shared/model/certificate-type.model';
import { CertificateTypeService } from './certificate-type.service';

@Component({
  selector: 'jhi-certificate-type-update',
  templateUrl: './certificate-type-update.component.html',
})
export class CertificateTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(
    protected certificateTypeService: CertificateTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    @Optional() public activeModal?: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.activeModal) {
      return;
    }
    this.activatedRoute.data.subscribe(({ certificateType }) => {
      this.updateForm(certificateType);
    });
  }

  updateForm(certificateType: ICertificateType): void {
    this.editForm.patchValue({
      id: certificateType.id,
      name: certificateType.name,
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
    const certificateType = this.createFromForm();
    if (certificateType.id !== undefined) {
      this.subscribeToSaveResponse(this.certificateTypeService.update(certificateType));
    } else {
      this.subscribeToSaveResponse(this.certificateTypeService.create(certificateType));
    }
  }

  private createFromForm(): ICertificateType {
    return {
      ...new CertificateType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICertificateType>>): void {
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
}
