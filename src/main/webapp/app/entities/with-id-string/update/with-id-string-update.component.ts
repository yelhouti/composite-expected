import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IWithIdString, WithIdString } from '../with-id-string.model';
import { WithIdStringService } from '../service/with-id-string.service';

@Component({
  selector: 'jhi-with-id-string-update',
  templateUrl: './with-id-string-update.component.html',
})
export class WithIdStringUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [null, [Validators.required]],
    name: [],
  });

  constructor(protected withIdStringService: WithIdStringService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ withIdString }) => {
      this.updateForm(withIdString);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const withIdString = this.createFromForm();
    if (withIdString.id !== undefined) {
      this.subscribeToSaveResponse(this.withIdStringService.update(withIdString));
    } else {
      this.subscribeToSaveResponse(this.withIdStringService.create(withIdString));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWithIdString>>): void {
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

  protected updateForm(withIdString: IWithIdString): void {
    this.editForm.patchValue({
      id: withIdString.id,
      name: withIdString.name,
    });
  }

  protected createFromForm(): IWithIdString {
    return {
      ...new WithIdString(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
