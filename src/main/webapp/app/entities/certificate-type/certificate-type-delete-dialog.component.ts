import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICertificateType } from 'app/shared/model/certificate-type.model';
import { CertificateTypeService } from './certificate-type.service';

@Component({
  templateUrl: './certificate-type-delete-dialog.component.html',
})
export class CertificateTypeDeleteDialogComponent {
  certificateType?: ICertificateType;

  constructor(
    protected certificateTypeService: CertificateTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.certificateTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('certificateTypeListModification');
      this.activeModal.close();
    });
  }
}
