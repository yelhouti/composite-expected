import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithUUID } from '../with-uuid.model';
import { WithUUIDService } from '../service/with-uuid.service';

@Component({
  templateUrl: './with-uuid-delete-dialog.component.html'
})
export class WithUUIDDeleteDialogComponent {
  withUUID?: IWithUUID;

  constructor(protected withUUIDService: WithUUIDService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.withUUIDService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
