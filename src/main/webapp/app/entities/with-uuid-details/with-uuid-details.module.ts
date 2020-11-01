import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { WithUUIDDetailsComponent } from './list/with-uuid-details.component';
import { WithUUIDDetailsDetailComponent } from './detail/with-uuid-details-detail.component';
import { WithUUIDDetailsUpdateComponent } from './update/with-uuid-details-update.component';
import { WithUUIDDetailsDeleteDialogComponent } from './delete/with-uuid-details-delete-dialog.component';
import { WithUUIDDetailsRoutingModule } from './route/with-uuid-details-routing.module';

@NgModule({
  imports: [SharedModule, WithUUIDDetailsRoutingModule],
  declarations: [
    WithUUIDDetailsComponent,
    WithUUIDDetailsDetailComponent,
    WithUUIDDetailsUpdateComponent,
    WithUUIDDetailsDeleteDialogComponent,
  ],
  entryComponents: [WithUUIDDetailsDeleteDialogComponent],
})
export class WithUUIDDetailsModule {}
