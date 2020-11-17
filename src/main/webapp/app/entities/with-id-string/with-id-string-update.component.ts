import { Component, OnInit, Optional } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithIdString, WithIdString } from 'app/shared/model/with-id-string.model';
import { WithIdStringService } from './with-id-string.service';

@Component({
  selector: 'jhi-with-id-string-update',
  templateUrl: './with-id-string-update.component.html',
})
export class WithIdStringUpdateComponent implements OnInit {
  edit = false;
  isSaving = false;

  editForm = this.fb.group({
    id: [null, [Validators.required]],
  });

  constructor(
    protected withIdStringService: WithIdStringService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    @Optional() public activeModal?: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.activeModal) {
      return;
    }
    this.activatedRoute.data.subscribe(({ withIdString }) => {
      this.updateForm(withIdString);
    });
  }

  updateForm(withIdString: IWithIdString): void {
    this.edit = true;
    this.editForm.patchValue({
      id: withIdString.id,
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
    const withIdString = this.createFromForm();
    if (this.edit) {
      this.subscribeToSaveResponse(this.withIdStringService.update(withIdString));
    } else {
      this.subscribeToSaveResponse(this.withIdStringService.create(withIdString));
    }
  }

  private createFromForm(): IWithIdString {
    return {
      ...new WithIdString(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWithIdString>>): void {
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
