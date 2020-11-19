import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithIdStringDetails } from 'app/shared/model/with-id-string-details.model';
import { WithIdStringDetailsService } from './with-id-string-details.service';

@Component({
  templateUrl: './with-id-string-details-delete-dialog.component.html',
})
export class WithIdStringDetailsDeleteDialogComponent {
  withIdStringDetails?: IWithIdStringDetails;

  constructor(protected withIdStringDetailsService: WithIdStringDetailsService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(withIdStringId: string): void {
    this.withIdStringDetailsService.delete(withIdStringId).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
