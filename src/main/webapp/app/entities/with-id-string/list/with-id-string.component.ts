import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FilterMetadata, MessageService } from 'primeng/api';
import { IWithIdString } from '../with-id-string.model';
import { WithIdStringService } from '../service/with-id-string.service';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'jhi-with-id-string',
  templateUrl: './with-id-string.component.html',
})
export class WithIdStringComponent implements OnInit {
  withIdStrings?: IWithIdString[];
  eventSubscriber?: Subscription;

  @ViewChild('withIdStringTable', { static: true })
  withIdStringTable!: Table;

  private filtersDetails: { [_: string]: { type: string } } = {
    id: { type: 'string' },
    name: { type: 'string' },
  };

  constructor(
    protected withIdStringService: WithIdStringService,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  get filters(): { [s: string]: FilterMetadata } {
    return this.withIdStringTable.filters as { [s: string]: FilterMetadata };
  }

  loadAll(): void {
    this.withIdStringService
      .query()
      .pipe(
        filter((res: HttpResponse<IWithIdString[]>) => res.ok),
        map((res: HttpResponse<IWithIdString[]>) => res.body!)
      )
      .subscribe(
        (withIdStrings: IWithIdString[]) => {
          this.withIdStrings = withIdStrings;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  delete(id: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('entity.delete.title'),
      message: this.translateService.instant('compositekeyApp.withIdString.delete.question', { id }),
      accept: () => {
        this.withIdStringService.delete(id).subscribe(() => {
          this.loadAll();
        });
      },
    });
  }

  trackId(index: number, item: IWithIdString): string {
    return item.id!;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}
