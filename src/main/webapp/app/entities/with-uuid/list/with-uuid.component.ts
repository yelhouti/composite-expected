import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithUUID } from '../with-uuid.model';
import { WithUUIDService } from '../service/with-uuid.service';
import { WithUUIDDeleteDialogComponent } from '../delete/with-uuid-delete-dialog.component';

@Component({
  selector: 'jhi-with-uuid',
  templateUrl: './with-uuid.component.html',
})
export class WithUUIDComponent implements OnInit {
  withUUIDS?: IWithUUID[];
  isLoading = false;

  constructor(protected withUUIDService: WithUUIDService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.withUUIDService.query().subscribe(
      (res: HttpResponse<IWithUUID[]>) => {
        this.isLoading = false;
        this.withUUIDS = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackUuid(index: number, item: IWithUUID): string {
    return item.uuid!;
  }

  delete(withUUID: IWithUUID): void {
    const modalRef = this.modalService.open(WithUUIDDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.withUUID = withUUID;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
