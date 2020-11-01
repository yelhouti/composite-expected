import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IWithUUIDDetails, WithUUIDDetails } from '../with-uuid-details.model';
import { WithUUIDDetailsService } from '../service/with-uuid-details.service';
import { IWithUUID } from 'app/entities/with-uuid/with-uuid.model';
import { WithUUIDService } from 'app/entities/with-uuid/service/with-uuid.service';

@Component({
  selector: 'jhi-with-uuid-details-update',
  templateUrl: './with-uuid-details-update.component.html'
})
export class WithUUIDDetailsUpdateComponent implements OnInit {
  isSaving = false;

  withUUIDSCollection: IWithUUID[] = [];

  editForm = this.fb.group({
    uuid: [],
    details: [],
    withUUID: []
  });

  constructor(
    protected withUUIDDetailsService: WithUUIDDetailsService,
    protected withUUIDService: WithUUIDService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ withUUIDDetails }) => {
      this.updateForm(withUUIDDetails);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const withUUIDDetails = this.createFromForm();
    if (withUUIDDetails.uuid !== undefined) {
      this.subscribeToSaveResponse(this.withUUIDDetailsService.update(withUUIDDetails));
    } else {
      this.subscribeToSaveResponse(this.withUUIDDetailsService.create(withUUIDDetails));
    }
  }

  trackWithUUIDByUuid(index: number, item: IWithUUID): string {
    return item.uuid!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWithUUIDDetails>>): void {
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

  protected updateForm(withUUIDDetails: IWithUUIDDetails): void {
    this.editForm.patchValue({
      uuid: withUUIDDetails.uuid,
      details: withUUIDDetails.details,
      withUUID: withUUIDDetails.withUUID
    });

    this.withUUIDSCollection = this.withUUIDService.addWithUUIDToCollectionIfMissing(this.withUUIDSCollection, withUUIDDetails.withUUID);
  }

  protected loadRelationshipsOptions(): void {
    this.withUUIDService
      .query({ 'withUUIDDetailsId.specified': 'false' })
      .pipe(map((res: HttpResponse<IWithUUID[]>) => res.body ?? []))
      .pipe(
        map((withUUIDS: IWithUUID[]) =>
          this.withUUIDService.addWithUUIDToCollectionIfMissing(withUUIDS, this.editForm.get('withUUID')!.value)
        )
      )
      .subscribe((withUUIDS: IWithUUID[]) => (this.withUUIDSCollection = withUUIDS));
  }

  protected createFromForm(): IWithUUIDDetails {
    return {
      ...new WithUUIDDetails(),
      uuid: this.editForm.get(['uuid'])!.value,
      details: this.editForm.get(['details'])!.value,
      withUUID: this.editForm.get(['withUUID'])!.value
    };
  }
}
