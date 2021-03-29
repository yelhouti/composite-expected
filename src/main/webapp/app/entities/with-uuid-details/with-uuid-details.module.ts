import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { WithUUIDDetailsComponent } from './list/with-uuid-details.component';
import { WithUUIDDetailsDetailComponent } from './detail/with-uuid-details-detail.component';
import { WithUUIDDetailsUpdateComponent } from './update/with-uuid-details-update.component';
import { WithUUIDDetailsRoutingModule } from './route/with-uuid-details-routing.module';

@NgModule({
  imports: [SharedModule, WithUUIDDetailsRoutingModule],
  declarations: [WithUUIDDetailsComponent, WithUUIDDetailsDetailComponent, WithUUIDDetailsUpdateComponent],
})
export class WithUUIDDetailsModule {}
