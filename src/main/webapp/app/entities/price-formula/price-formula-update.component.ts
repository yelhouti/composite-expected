import { Component, OnInit, Optional } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPriceFormula, PriceFormula } from 'app/shared/model/price-formula.model';
import { PriceFormulaService } from './price-formula.service';

@Component({
  selector: 'jhi-price-formula-update',
  templateUrl: './price-formula-update.component.html',
})
export class PriceFormulaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    formula: [null, [Validators.required]],
  });

  constructor(
    protected priceFormulaService: PriceFormulaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    @Optional() public activeModal?: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.activeModal) {
      return;
    }
    this.activatedRoute.data.subscribe(({ priceFormula }) => {
      this.updateForm(priceFormula);
    });
  }

  updateForm(priceFormula: IPriceFormula): void {
    this.editForm.patchValue({
      id: priceFormula.id,
      formula: priceFormula.formula,
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
    const priceFormula = this.createFromForm();
    if (priceFormula.id !== undefined) {
      this.subscribeToSaveResponse(this.priceFormulaService.update(priceFormula));
    } else {
      this.subscribeToSaveResponse(this.priceFormulaService.create(priceFormula));
    }
  }

  private createFromForm(): IPriceFormula {
    return {
      ...new PriceFormula(),
      id: this.editForm.get(['id'])!.value,
      formula: this.editForm.get(['formula'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPriceFormula>>): void {
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
