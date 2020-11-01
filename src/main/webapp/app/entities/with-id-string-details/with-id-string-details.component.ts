import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithIdStringDetails } from 'app/shared/model/with-id-string-details.model';
import { WithIdStringDetailsService } from './with-id-string-details.service';
import { WithIdStringDetailsDeleteDialogComponent } from './with-id-string-details-delete-dialog.component';

@Component({
  selector: 'jhi-with-id-string-details',
  templateUrl: './with-id-string-details.component.html',
})
export class WithIdStringDetailsComponent implements OnInit, OnDestroy {
  withIdStringDetails?: IWithIdStringDetails[];
  eventSubscriber?: Subscription;
  isLoading = false;

  constructor(
    protected withIdStringDetailsService: WithIdStringDetailsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.withIdStringDetailsService.query().subscribe(
      (res: HttpResponse<IWithIdStringDetails[]>) => {
        this.isLoading = false;
        this.withIdStringDetails = res.body ?? [];
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
    this.registerChangeInWithIdStringDetails();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWithIdStringDetails): number {
    return item.id!;
  }

  registerChangeInWithIdStringDetails(): void {
    this.eventSubscriber = this.eventManager.subscribe('withIdStringDetailsListModification', () => this.loadAll());
  }

  delete(withIdStringDetails: IWithIdStringDetails): void {
    const modalRef = this.modalService.open(WithIdStringDetailsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.withIdStringDetails = withIdStringDetails;
  }
}
