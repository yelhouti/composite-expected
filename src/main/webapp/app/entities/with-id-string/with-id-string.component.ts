import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithIdString } from 'app/shared/model/with-id-string.model';
import { WithIdStringService } from './with-id-string.service';
import { WithIdStringDeleteDialogComponent } from './with-id-string-delete-dialog.component';

@Component({
  selector: 'jhi-with-id-string',
  templateUrl: './with-id-string.component.html',
})
export class WithIdStringComponent implements OnInit, OnDestroy {
  withIdStrings?: IWithIdString[];
  eventSubscriber?: Subscription;
  isLoading = false;

  constructor(
    protected withIdStringService: WithIdStringService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.withIdStringService.query().subscribe(
      (res: HttpResponse<IWithIdString[]>) => {
        this.isLoading = false;
        this.withIdStrings = res.body ?? [];
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
    this.registerChangeInWithIdStrings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWithIdString): number {
    return item.id!;
  }

  registerChangeInWithIdStrings(): void {
    this.eventSubscriber = this.eventManager.subscribe('withIdStringListModification', () => this.loadAll());
  }

  delete(withIdString: IWithIdString): void {
    const modalRef = this.modalService.open(WithIdStringDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.withIdString = withIdString;
  }
}
