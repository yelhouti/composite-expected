import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWithIdString } from '../with-id-string.model';
import { WithIdStringService } from '../service/with-id-string.service';

@Component({
  templateUrl: './with-id-string-delete-dialog.component.html'
})
export class WithIdStringDeleteDialogComponent {
  withIdString?: IWithIdString;

  constructor(protected withIdStringService: WithIdStringService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.withIdStringService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
