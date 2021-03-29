import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { WithIdStringComponent } from './list/with-id-string.component';
import { WithIdStringDetailComponent } from './detail/with-id-string-detail.component';
import { WithIdStringUpdateComponent } from './update/with-id-string-update.component';
import { WithIdStringRoutingModule } from './route/with-id-string-routing.module';

@NgModule({
  imports: [SharedModule, WithIdStringRoutingModule],
  declarations: [WithIdStringComponent, WithIdStringDetailComponent, WithIdStringUpdateComponent],
})
export class WithIdStringModule {}
