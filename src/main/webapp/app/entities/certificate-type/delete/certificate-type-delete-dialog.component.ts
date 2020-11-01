import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICertificateType } from '../certificate-type.model';
import { CertificateTypeService } from '../service/certificate-type.service';

@Component({
  templateUrl: './certificate-type-delete-dialog.component.html'
})
export class CertificateTypeDeleteDialogComponent {
  certificateType?: ICertificateType;

  constructor(protected certificateTypeService: CertificateTypeService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.certificateTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
