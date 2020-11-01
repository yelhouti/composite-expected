import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { WithIdStringDetailsComponent } from './list/with-id-string-details.component';
import { WithIdStringDetailsDetailComponent } from './detail/with-id-string-details-detail.component';
import { WithIdStringDetailsUpdateComponent } from './update/with-id-string-details-update.component';
import { WithIdStringDetailsDeleteDialogComponent } from './delete/with-id-string-details-delete-dialog.component';
import { WithIdStringDetailsRoutingModule } from './route/with-id-string-details-routing.module';

@NgModule({
  imports: [SharedModule, WithIdStringDetailsRoutingModule],
  declarations: [
    WithIdStringDetailsComponent,
    WithIdStringDetailsDetailComponent,
    WithIdStringDetailsUpdateComponent,
    WithIdStringDetailsDeleteDialogComponent,
  ],
  entryComponents: [WithIdStringDetailsDeleteDialogComponent],
})
export class WithIdStringDetailsModule {}
