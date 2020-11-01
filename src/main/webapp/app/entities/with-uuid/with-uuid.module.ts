import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { WithUUIDComponent } from './list/with-uuid.component';
import { WithUUIDDetailComponent } from './detail/with-uuid-detail.component';
import { WithUUIDUpdateComponent } from './update/with-uuid-update.component';
import { WithUUIDDeleteDialogComponent } from './delete/with-uuid-delete-dialog.component';
import { WithUUIDRoutingModule } from './route/with-uuid-routing.module';

@NgModule({
  imports: [SharedModule, WithUUIDRoutingModule],
  declarations: [WithUUIDComponent, WithUUIDDetailComponent, WithUUIDUpdateComponent, WithUUIDDeleteDialogComponent],
  entryComponents: [WithUUIDDeleteDialogComponent],
})
export class WithUUIDModule {}
