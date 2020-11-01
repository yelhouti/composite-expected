import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWithIdString } from 'app/shared/model/with-id-string.model';
import { WithIdStringService } from './with-id-string.service';

@Component({
  templateUrl: './with-id-string-delete-dialog.component.html',
})
export class WithIdStringDeleteDialogComponent {
  withIdString?: IWithIdString;

  constructor(
    protected withIdStringService: WithIdStringService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.withIdStringService.delete(id).subscribe(() => {
      this.eventManager.broadcast('withIdStringListModification');
      this.activeModal.close();
    });
  }
}
