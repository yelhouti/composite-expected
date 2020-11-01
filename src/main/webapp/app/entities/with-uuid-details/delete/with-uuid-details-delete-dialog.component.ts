import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithUUIDDetails } from '../with-uuid-details.model';
import { WithUUIDDetailsService } from '../service/with-uuid-details.service';

@Component({
  templateUrl: './with-uuid-details-delete-dialog.component.html',
})
export class WithUUIDDetailsDeleteDialogComponent {
  withUUIDDetails?: IWithUUIDDetails;

  constructor(protected withUUIDDetailsService: WithUUIDDetailsService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.withUUIDDetailsService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
