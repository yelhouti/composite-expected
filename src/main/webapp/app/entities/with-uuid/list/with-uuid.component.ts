import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FilterMetadata, MessageService } from 'primeng/api';
import { IWithUUID } from '../with-uuid.model';
import { WithUUIDService } from '../service/with-uuid.service';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'jhi-with-uuid',
  templateUrl: './with-uuid.component.html',
})
export class WithUUIDComponent implements OnInit {
  withUUIDS?: IWithUUID[];
  eventSubscriber?: Subscription;

  @ViewChild('withUUIDTable', { static: true })
  withUUIDTable!: Table;

  private filtersDetails: { [_: string]: { type: string } } = {
    name: { type: 'string' },
  };

  constructor(
    protected withUUIDService: WithUUIDService,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  get filters(): { [s: string]: FilterMetadata } {
    return this.withUUIDTable.filters as { [s: string]: FilterMetadata };
  }

  loadAll(): void {
    this.withUUIDService
      .query()
      .pipe(
        filter((res: HttpResponse<IWithUUID[]>) => res.ok),
        map((res: HttpResponse<IWithUUID[]>) => res.body!)
      )
      .subscribe(
        (withUUIDS: IWithUUID[]) => {
          this.withUUIDS = withUUIDS;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  delete(uuid: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('entity.delete.title'),
      message: this.translateService.instant('compositekeyApp.withUUID.delete.question', { id: `${uuid}` }),
      accept: () => {
        this.withUUIDService.delete(uuid).subscribe(() => {
          this.loadAll();
        });
      },
    });
  }

  trackId(index: number, item: IWithUUID): string {
    return item.uuid!;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
