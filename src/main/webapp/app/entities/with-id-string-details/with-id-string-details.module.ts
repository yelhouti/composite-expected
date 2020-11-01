import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { WithIdStringDetailsComponent } from './with-id-string-details.component';
import { WithIdStringDetailsDetailComponent } from './with-id-string-details-detail.component';
import { WithIdStringDetailsUpdateComponent } from './with-id-string-details-update.component';
import { WithIdStringDetailsDeleteDialogComponent } from './with-id-string-details-delete-dialog.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [
    WithIdStringDetailsComponent,
    WithIdStringDetailsDetailComponent,
    WithIdStringDetailsUpdateComponent,
    WithIdStringDetailsDeleteDialogComponent,
  ],
  exports: [WithIdStringDetailsDetailComponent, WithIdStringDetailsUpdateComponent, WithIdStringDetailsDeleteDialogComponent],
  entryComponents: [WithIdStringDetailsDeleteDialogComponent],
})
export class WithIdStringDetailsModule {}
