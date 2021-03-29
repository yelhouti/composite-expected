import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IWithUUID } from '../with-uuid.model';
import { WithUUIDService } from '../service/with-uuid.service';

@Component({
  selector: 'jhi-with-uuid-update',
  templateUrl: './with-uuid-update.component.html',
})
export class WithUUIDUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    uuid: [],
    name: [null, [Validators.required]],
  });

  constructor(protected withUUIDService: WithUUIDService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isSaving = false;

    this.activatedRoute.data.subscribe(({ withUUID }) => {
      this.updateForm(withUUID);
    });
  }

  updateForm(withUUID: IWithUUID | null): void {
    if (withUUID) {
      this.editForm.reset({ ...withUUID }, { emitEvent: false, onlySelf: true });
    } else {
      this.editForm.reset({});
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const withUUID = this.editForm.value;
    if (withUUID.uuid !== null) {
      this.subscribeToSaveResponse(this.withUUIDService.update(withUUID));
    } else {
      this.subscribeToSaveResponse(this.withUUIDService.create(withUUID));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWithUUID>>): void {
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
