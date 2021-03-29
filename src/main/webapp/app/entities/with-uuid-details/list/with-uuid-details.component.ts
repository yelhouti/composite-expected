import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FilterMetadata, MessageService } from 'primeng/api';
import { IWithUUIDDetails } from '../with-uuid-details.model';
import { WithUUIDDetailsService } from '../service/with-uuid-details.service';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { IWithUUID } from 'app/entities/with-uuid/with-uuid.model';
import { WithUUIDService } from 'app/entities/with-uuid/service/with-uuid.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'jhi-with-uuid-details',
  templateUrl: './with-uuid-details.component.html',
})
export class WithUUIDDetailsComponent implements OnInit {
  withUUIDDetails?: IWithUUIDDetails[];
  eventSubscriber?: Subscription;
  withUUIDOptions: IWithUUID[] | null = null;
  withUUIDSelectedOptions: IWithUUID[] | null = null;

  @ViewChild('withUUIDDetailsTable', { static: true })
  withUUIDDetailsTable!: Table;

  private filtersDetails: { [_: string]: { type: string } } = {
    details: { type: 'string' },
    ['withUUID.uuid']: { type: 'string' },
  };

  constructor(
    protected withUUIDDetailsService: WithUUIDDetailsService,
    protected withUUIDService: WithUUIDService,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.loadAllWithUUIDS();
  }

  get filters(): { [s: string]: FilterMetadata } {
    return this.withUUIDDetailsTable.filters as { [s: string]: FilterMetadata };
  }

  loadAll(): void {
    this.withUUIDDetailsService
      .query()
      .pipe(
        filter((res: HttpResponse<IWithUUIDDetails[]>) => res.ok),
        map((res: HttpResponse<IWithUUIDDetails[]>) => res.body!)
      )
      .subscribe(
        (withUUIDDetails: IWithUUIDDetails[]) => {
          this.withUUIDDetails = withUUIDDetails;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  delete(uuid: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('entity.delete.title'),
      message: this.translateService.instant('compositekeyApp.withUUIDDetails.delete.question', { id: `${uuid}` }),
      accept: () => {
        this.withUUIDDetailsService.delete(uuid).subscribe(() => {
          this.loadAll();
        });
      },
    });
  }

  loadAllWithUUIDS(): void {
    this.withUUIDService.query().subscribe((res: HttpResponse<IWithUUID[]>) => (this.withUUIDOptions = res.body));
  }

  trackId(index: number, item: IWithUUIDDetails): string {
    return item.uuid!;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
