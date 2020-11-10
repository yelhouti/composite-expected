import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPriceFormula } from 'app/shared/model/price-formula.model';
import { PriceFormulaService } from './price-formula.service';
import { PriceFormulaDeleteDialogComponent } from './price-formula-delete-dialog.component';

@Component({
  selector: 'jhi-price-formula',
  templateUrl: './price-formula.component.html',
})
export class PriceFormulaComponent implements OnInit, OnDestroy {
  priceFormulas?: IPriceFormula[];
  eventSubscriber?: Subscription;
  isLoading = false;

  constructor(
    protected priceFormulaService: PriceFormulaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.priceFormulaService.query().subscribe(
      (res: HttpResponse<IPriceFormula[]>) => {
        this.isLoading = false;
        this.priceFormulas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  handleSyncList(): void {
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPriceFormulas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPriceFormula): number {
    return item.id!;
  }

  registerChangeInPriceFormulas(): void {
    this.eventSubscriber = this.eventManager.subscribe('priceFormulaListModification', () => this.loadAll());
  }

  delete(priceFormula: IPriceFormula): void {
    const modalRef = this.modalService.open(PriceFormulaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.priceFormula = priceFormula;
  }
}
