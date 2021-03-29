import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IWithIdStringDetails } from '../with-id-string-details.model';
import { WithIdStringDetailsService } from '../service/with-id-string-details.service';
import { MessageService } from 'primeng/api';
import { IWithIdString } from 'app/entities/with-id-string/with-id-string.model';
import { WithIdStringService } from 'app/entities/with-id-string/service/with-id-string.service';

@Component({
  selector: 'jhi-with-id-string-details-update',
  templateUrl: './with-id-string-details-update.component.html',
})
export class WithIdStringDetailsUpdateComponent implements OnInit {
  edit = false;
  isSaving = false;
  withIdStringOptions: IWithIdString[] | null = null;
  withIdStringFilterValue?: any;

  editForm = this.fb.group({
    id: [],
    details: [],
    withIdString: [null, [Validators.required]],
  });

  constructor(
    protected messageService: MessageService,
    protected withIdStringDetailsService: WithIdStringDetailsService,
    protected withIdStringService: WithIdStringService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isSaving = false;

    this.activatedRoute.data.subscribe(({ withIdStringDetails }) => {
      this.updateForm(withIdStringDetails);
    });
    this.loadAllWithIdStrings();
  }

  loadAllWithIdStrings(): void {
    // TODO change this to load only unspecified + add selected to options if on edit (not create)
    this.withIdStringService.query().subscribe(
      (res: HttpResponse<IWithIdString[]>) => (this.withIdStringOptions = res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(withIdStringDetails: IWithIdStringDetails | null): void {
    if (withIdStringDetails) {
      this.edit = true;
      this.editForm.reset({ ...withIdStringDetails }, { emitEvent: false, onlySelf: true });
      this.withIdStringFilterValue = withIdStringDetails.withIdString?.id;
    } else {
      this.edit = false;
      this.editForm.reset({});
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const withIdStringDetails = this.editForm.value;
    if (this.edit) {
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

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
