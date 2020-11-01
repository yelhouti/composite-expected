import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWithIdStringDetails } from 'app/shared/model/with-id-string-details.model';
import { WithIdStringDetailsService } from './with-id-string-details.service';

@Component({
  templateUrl: './with-id-string-details-delete-dialog.component.html',
})
export class WithIdStringDetailsDeleteDialogComponent {
  withIdStringDetails?: IWithIdStringDetails;

  constructor(
    protected withIdStringDetailsService: WithIdStringDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.withIdStringDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('withIdStringDetailsListModification');
      this.activeModal.close();
    });
  }
}
