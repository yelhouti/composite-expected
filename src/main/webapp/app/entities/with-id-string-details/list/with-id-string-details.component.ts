import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FilterMetadata, MessageService } from 'primeng/api';
import { IWithIdStringDetails } from '../with-id-string-details.model';
import { WithIdStringDetailsService } from '../service/with-id-string-details.service';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { IWithIdString } from 'app/entities/with-id-string/with-id-string.model';
import { WithIdStringService } from 'app/entities/with-id-string/service/with-id-string.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'jhi-with-id-string-details',
  templateUrl: './with-id-string-details.component.html',
})
export class WithIdStringDetailsComponent implements OnInit {
  withIdStringDetails?: IWithIdStringDetails[];
  eventSubscriber?: Subscription;
  withIdStringOptions: IWithIdString[] | null = null;
  withIdStringSelectedOptions: IWithIdString[] | null = null;

  @ViewChild('withIdStringDetailsTable', { static: true })
  withIdStringDetailsTable!: Table;

  private filtersDetails: { [_: string]: { type: string } } = {
    id: { type: 'string' },
    details: { type: 'string' },
    ['withIdString.id']: { type: 'string' },
  };

  constructor(
    protected withIdStringDetailsService: WithIdStringDetailsService,
    protected withIdStringService: WithIdStringService,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.loadAllWithIdStrings();
  }

  get filters(): { [s: string]: FilterMetadata } {
    return this.withIdStringDetailsTable.filters as { [s: string]: FilterMetadata };
  }

  loadAll(): void {
    this.withIdStringDetailsService
      .query()
      .pipe(
        filter((res: HttpResponse<IWithIdStringDetails[]>) => res.ok),
        map((res: HttpResponse<IWithIdStringDetails[]>) => res.body!)
      )
      .subscribe(
        (withIdStringDetails: IWithIdStringDetails[]) => {
          this.withIdStringDetails = withIdStringDetails;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  delete(id: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('entity.delete.title'),
      message: this.translateService.instant('compositekeyApp.withIdStringDetails.delete.question', { id }),
      accept: () => {
        this.withIdStringDetailsService.delete(id).subscribe(() => {
          this.loadAll();
        });
      },
    });
  }

  loadAllWithIdStrings(): void {
    this.withIdStringService.query().subscribe((res: HttpResponse<IWithIdString[]>) => (this.withIdStringOptions = res.body));
  }

  trackId(index: number, item: IWithIdStringDetails): string {
    return item.id!;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
