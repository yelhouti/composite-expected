import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IWithIdStringDetails, WithIdStringDetails } from '../with-id-string-details.model';
import { WithIdStringDetailsService } from '../service/with-id-string-details.service';
import { IWithIdString } from 'app/entities/with-id-string/with-id-string.model';
import { WithIdStringService } from 'app/entities/with-id-string/service/with-id-string.service';

@Component({
  selector: 'jhi-with-id-string-details-update',
  templateUrl: './with-id-string-details-update.component.html'
})
export class WithIdStringDetailsUpdateComponent implements OnInit {
  isSaving = false;

  withIdStringsCollection: IWithIdString[] = [];

  editForm = this.fb.group({
    id: [],
    details: [],
    withIdString: []
  });

  constructor(
    protected withIdStringDetailsService: WithIdStringDetailsService,
    protected withIdStringService: WithIdStringService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ withIdStringDetails }) => {
      this.updateForm(withIdStringDetails);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const withIdStringDetails = this.createFromForm();
    if (withIdStringDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.withIdStringDetailsService.update(withIdStringDetails));
    } else {
      this.subscribeToSaveResponse(this.withIdStringDetailsService.create(withIdStringDetails));
    }
  }

  trackWithIdStringById(index: number, item: IWithIdString): string {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWithIdStringDetails>>): void {
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

  protected updateForm(withIdStringDetails: IWithIdStringDetails): void {
    this.editForm.patchValue({
      id: withIdStringDetails.id,
      details: withIdStringDetails.details,
      withIdString: withIdStringDetails.withIdString
    });

    this.withIdStringsCollection = this.withIdStringService.addWithIdStringToCollectionIfMissing(
      this.withIdStringsCollection,
      withIdStringDetails.withIdString
    );
  }

  protected loadRelationshipsOptions(): void {
    this.withIdStringService
      .query({ 'withIdStringDetailsId.specified': 'false' })
      .pipe(map((res: HttpResponse<IWithIdString[]>) => res.body ?? []))
      .pipe(
        map((withIdStrings: IWithIdString[]) =>
          this.withIdStringService.addWithIdStringToCollectionIfMissing(withIdStrings, this.editForm.get('withIdString')!.value)
        )
      )
      .subscribe((withIdStrings: IWithIdString[]) => (this.withIdStringsCollection = withIdStrings));
  }

  protected createFromForm(): IWithIdStringDetails {
    return {
      ...new WithIdStringDetails(),
      id: this.editForm.get(['id'])!.value,
      details: this.editForm.get(['details'])!.value,
      withIdString: this.editForm.get(['withIdString'])!.value
    };
  }
}
