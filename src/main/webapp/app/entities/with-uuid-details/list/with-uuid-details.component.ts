import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithUUIDDetails } from '../with-uuid-details.model';
import { WithUUIDDetailsService } from '../service/with-uuid-details.service';
import { WithUUIDDetailsDeleteDialogComponent } from '../delete/with-uuid-details-delete-dialog.component';

@Component({
  selector: 'jhi-with-uuid-details',
  templateUrl: './with-uuid-details.component.html',
})
export class WithUUIDDetailsComponent implements OnInit {
  withUUIDDetails?: IWithUUIDDetails[];
  isLoading = false;

  constructor(protected withUUIDDetailsService: WithUUIDDetailsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.withUUIDDetailsService.query().subscribe(
      (res: HttpResponse<IWithUUIDDetails[]>) => {
        this.isLoading = false;
        this.withUUIDDetails = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackUuid(index: number, item: IWithUUIDDetails): string {
    return item.uuid!;
  }

  delete(withUUIDDetails: IWithUUIDDetails): void {
    const modalRef = this.modalService.open(WithUUIDDetailsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.withUUIDDetails = withUUIDDetails;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
