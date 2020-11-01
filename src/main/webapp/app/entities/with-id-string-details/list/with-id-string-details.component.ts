import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithIdStringDetails } from '../with-id-string-details.model';
import { WithIdStringDetailsService } from '../service/with-id-string-details.service';
import { WithIdStringDetailsDeleteDialogComponent } from '../delete/with-id-string-details-delete-dialog.component';

@Component({
  selector: 'jhi-with-id-string-details',
  templateUrl: './with-id-string-details.component.html'
})
export class WithIdStringDetailsComponent implements OnInit {
  withIdStringDetails?: IWithIdStringDetails[];
  isLoading = false;

  constructor(protected withIdStringDetailsService: WithIdStringDetailsService, protected modalService: NgbModal) {}

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

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IWithIdStringDetails): string {
    return item.id!;
  }

  delete(withIdStringDetails: IWithIdStringDetails): void {
    const modalRef = this.modalService.open(WithIdStringDetailsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.withIdStringDetails = withIdStringDetails;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
