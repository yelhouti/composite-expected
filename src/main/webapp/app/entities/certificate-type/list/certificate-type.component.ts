import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FilterMetadata, MessageService } from 'primeng/api';
import { ICertificateType } from '../certificate-type.model';
import { CertificateTypeService } from '../service/certificate-type.service';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'jhi-certificate-type',
  templateUrl: './certificate-type.component.html',
})
export class CertificateTypeComponent implements OnInit {
  certificateTypes?: ICertificateType[];
  eventSubscriber?: Subscription;

  @ViewChild('certificateTypeTable', { static: true })
  certificateTypeTable!: Table;

  private filtersDetails: { [_: string]: { type: string } } = {
    id: { type: 'number' },
    name: { type: 'string' },
  };

  constructor(
    protected certificateTypeService: CertificateTypeService,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  get filters(): { [s: string]: FilterMetadata } {
    return this.certificateTypeTable.filters as { [s: string]: FilterMetadata };
  }

  loadAll(): void {
    this.certificateTypeService
      .query()
      .pipe(
        filter((res: HttpResponse<ICertificateType[]>) => res.ok),
        map((res: HttpResponse<ICertificateType[]>) => res.body!)
      )
      .subscribe(
        (certificateTypes: ICertificateType[]) => {
          this.certificateTypes = certificateTypes;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('entity.delete.title'),
      message: this.translateService.instant('compositekeyApp.certificateType.delete.question', { id }),
      accept: () => {
        this.certificateTypeService.delete(id).subscribe(() => {
          this.loadAll();
        });
      },
    });
  }

  trackId(index: number, item: ICertificateType): number {
    return item.id!;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
