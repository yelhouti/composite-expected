import { Component, OnInit, Optional } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithIdStringDetails } from 'app/shared/model/with-id-string-details.model';
import { WithIdStringDetailsService } from './with-id-string-details.service';
import { IWithIdString } from 'app/shared/model/with-id-string.model';
import { WithIdStringService } from 'app/entities/with-id-string/with-id-string.service';

@Component({
  selector: 'jhi-with-id-string-details-update',
  templateUrl: './with-id-string-details-update.component.html',
})
export class WithIdStringDetailsUpdateComponent implements OnInit {
  isSaving = false;
  withidstrings: IWithIdString[] = [];

  editForm = this.fb.group({
    withIdStringId: [],
    name: [],
    withIdString: [],
  });

  constructor(
    protected withIdStringDetailsService: WithIdStringDetailsService,
    protected withIdStringService: WithIdStringService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    @Optional() public activeModal?: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.activeModal) {
      return;
    }
    this.activatedRoute.data.subscribe(({ withIdStringDetails }) => {
      this.updateForm(withIdStringDetails);

      this.withIdStringService
        .query({ 'withIdStringDetailsId.specified': 'false' })
        .pipe(map((res: HttpResponse<IWithIdString[]>) => res.body ?? []))
        .subscribe((resBody: IWithIdString[]) => {
          if (!withIdStringDetails.withIdString || !withIdStringDetails.withIdString.id) {
            this.withidstrings = resBody;
          } else {
            this.withIdStringService
              .find(withIdStringDetails.withIdString.id)
              .pipe(map((subRes: HttpResponse<IWithIdString>) => (subRes.body ? [subRes.body].concat(resBody) : resBody)))
              .subscribe((concatRes: IWithIdString[]) => (this.withidstrings = concatRes));
          }
        });
    });
  }

  updateForm(withIdStringDetails: IWithIdStringDetails | null): void {
    if (withIdStringDetails) {
      this.editForm.reset({
        ...withIdStringDetails,
      });
    } else {
      this.editForm.reset({});
    }
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
    const withIdStringDetails = this.editForm.value;
    if (withIdStringDetails.withIdStringId !== null) {
      this.subscribeToSaveResponse(this.withIdStringDetailsService.update(withIdStringDetails));
    } else {
      this.subscribeToSaveResponse(this.withIdStringDetailsService.create(withIdStringDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWithIdStringDetails>>): void {
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

  trackById(index: number, item: IWithIdString): string {
    return item.id!;
  }
}
