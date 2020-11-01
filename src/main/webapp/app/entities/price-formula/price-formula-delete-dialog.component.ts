import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPriceFormula } from 'app/shared/model/price-formula.model';
import { PriceFormulaService } from './price-formula.service';

@Component({
  templateUrl: './price-formula-delete-dialog.component.html',
})
export class PriceFormulaDeleteDialogComponent {
  priceFormula?: IPriceFormula;

  constructor(
    protected priceFormulaService: PriceFormulaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.priceFormulaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('priceFormulaListModification');
      this.activeModal.close();
    });
  }
}
