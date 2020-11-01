import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithIdString } from '../with-id-string.model';
import { WithIdStringService } from '../service/with-id-string.service';
import { WithIdStringDeleteDialogComponent } from '../delete/with-id-string-delete-dialog.component';

@Component({
  selector: 'jhi-with-id-string',
  templateUrl: './with-id-string.component.html'
})
export class WithIdStringComponent implements OnInit {
  withIdStrings?: IWithIdString[];
  isLoading = false;

  constructor(protected withIdStringService: WithIdStringService, protected modalService: NgbModal) {}

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

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IWithIdString): string {
    return item.id!;
  }

  delete(withIdString: IWithIdString): void {
    const modalRef = this.modalService.open(WithIdStringDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.withIdString = withIdString;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
