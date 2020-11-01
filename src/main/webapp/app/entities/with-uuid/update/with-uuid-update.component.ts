import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IWithUUID, WithUUID } from '../with-uuid.model';
import { WithUUIDService } from '../service/with-uuid.service';

@Component({
  selector: 'jhi-with-uuid-update',
  templateUrl: './with-uuid-update.component.html',
})
export class WithUUIDUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    uuid: [null, [Validators.required]],
    name: [null, [Validators.required]],
  });

  constructor(protected withUUIDService: WithUUIDService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ withUUID }) => {
      this.updateForm(withUUID);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const withUUID = this.createFromForm();
    if (withUUID.uuid !== undefined) {
      this.subscribeToSaveResponse(this.withUUIDService.update(withUUID));
    } else {
      this.subscribeToSaveResponse(this.withUUIDService.create(withUUID));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWithUUID>>): void {
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

  protected updateForm(withUUID: IWithUUID): void {
    this.editForm.patchValue({
      uuid: withUUID.uuid,
      name: withUUID.name,
    });
  }

  protected createFromForm(): IWithUUID {
    return {
      ...new WithUUID(),
      uuid: this.editForm.get(['uuid'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
