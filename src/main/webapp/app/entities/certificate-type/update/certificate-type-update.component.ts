import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICertificateType, CertificateType } from '../certificate-type.model';
import { CertificateTypeService } from '../service/certificate-type.service';

@Component({
  selector: 'jhi-certificate-type-update',
  templateUrl: './certificate-type-update.component.html'
})
export class CertificateTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]]
  });

  constructor(
    protected certificateTypeService: CertificateTypeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ certificateType }) => {
      this.updateForm(certificateType);
    });
  }

  previousState(): void {
    window.history.back();
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICertificateType>>): void {
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

  protected updateForm(certificateType: ICertificateType): void {
    this.editForm.patchValue({
      id: certificateType.id,
      name: certificateType.name
    });
  }

  protected createFromForm(): ICertificateType {
    return {
      ...new CertificateType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }
}
