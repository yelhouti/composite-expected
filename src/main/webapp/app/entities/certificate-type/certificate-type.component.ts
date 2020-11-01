import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICertificateType } from 'app/shared/model/certificate-type.model';
import { CertificateTypeService } from './certificate-type.service';
import { CertificateTypeDeleteDialogComponent } from './certificate-type-delete-dialog.component';

@Component({
  selector: 'jhi-certificate-type',
  templateUrl: './certificate-type.component.html',
})
export class CertificateTypeComponent implements OnInit, OnDestroy {
  certificateTypes?: ICertificateType[];
  eventSubscriber?: Subscription;
  isLoading = false;

  constructor(
    protected certificateTypeService: CertificateTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

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
    this.registerChangeInCertificateTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICertificateType): number {
    return item.id!;
  }

  registerChangeInCertificateTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('certificateTypeListModification', () => this.loadAll());
  }

  delete(certificateType: ICertificateType): void {
    const modalRef = this.modalService.open(CertificateTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.certificateType = certificateType;
  }
}
