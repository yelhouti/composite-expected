import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IWithUUIDDetails } from '../with-uuid-details.model';
import { WithUUIDDetailsService } from '../service/with-uuid-details.service';
import { MessageService } from 'primeng/api';
import { IWithUUID } from 'app/entities/with-uuid/with-uuid.model';
import { WithUUIDService } from 'app/entities/with-uuid/service/with-uuid.service';

@Component({
  selector: 'jhi-with-uuid-details-update',
  templateUrl: './with-uuid-details-update.component.html',
})
export class WithUUIDDetailsUpdateComponent implements OnInit {
  edit = false;
  isSaving = false;
  withUUIDOptions: IWithUUID[] | null = null;
  withUUIDFilterValue?: any;

  editForm = this.fb.group({
    uuid: [],
    details: [],
    withUUID: [null, [Validators.required]],
  });

  constructor(
    protected messageService: MessageService,
    protected withUUIDDetailsService: WithUUIDDetailsService,
    protected withUUIDService: WithUUIDService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isSaving = false;

    this.activatedRoute.data.subscribe(({ withUUIDDetails }) => {
      this.updateForm(withUUIDDetails);
    });
    this.loadAllWithUUIDS();
  }

  loadAllWithUUIDS(): void {
    // TODO change this to load only unspecified + add selected to options if on edit (not create)
    this.withUUIDService.query().subscribe(
      (res: HttpResponse<IWithUUID[]>) => (this.withUUIDOptions = res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(withUUIDDetails: IWithUUIDDetails | null): void {
    if (withUUIDDetails) {
      this.edit = true;
      this.editForm.reset({ ...withUUIDDetails }, { emitEvent: false, onlySelf: true });
      this.withUUIDFilterValue = withUUIDDetails.withUUID?.uuid;
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
    const withUUIDDetails = this.editForm.value;
    if (this.edit) {
      this.subscribeToSaveResponse(this.withUUIDDetailsService.update(withUUIDDetails));
    } else {
      this.subscribeToSaveResponse(this.withUUIDDetailsService.create(withUUIDDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWithUUIDDetails>>): void {
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
