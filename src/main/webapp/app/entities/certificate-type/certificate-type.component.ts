import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICertificateType } from 'app/shared/model/certificate-type.model';
import { CertificateTypeService } from './certificate-type.service';
import { CertificateTypeDeleteDialogComponent } from './certificate-type-delete-dialog.component';

@Component({
  selector: 'jhi-certificate-type',
  templateUrl: './certificate-type.component.html',
})
export class CertificateTypeComponent implements OnInit {
  certificateTypes?: ICertificateType[];
  isLoading = false;

  constructor(protected certificateTypeService: CertificateTypeService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.certificateTypeService.query().subscribe(
      (res: HttpResponse<ICertificateType[]>) => {
        this.isLoading = false;
        this.certificateTypes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  handleSyncList(): void {
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICertificateType): number {
    return item.id!;
  }

  delete(certificateType: ICertificateType): void {
    const modalRef = this.modalService.open(CertificateTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.certificateType = certificateType;
    modalRef.result.then(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
