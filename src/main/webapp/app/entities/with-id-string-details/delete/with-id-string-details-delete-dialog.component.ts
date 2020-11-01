import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithIdStringDetails } from '../with-id-string-details.model';
import { WithIdStringDetailsService } from '../service/with-id-string-details.service';

@Component({
  templateUrl: './with-id-string-details-delete-dialog.component.html',
})
export class WithIdStringDetailsDeleteDialogComponent {
  withIdStringDetails?: IWithIdStringDetails;

  constructor(protected withIdStringDetailsService: WithIdStringDetailsService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.withIdStringDetailsService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
