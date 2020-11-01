import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { WithIdStringComponent } from './with-id-string.component';
import { WithIdStringDetailComponent } from './with-id-string-detail.component';
import { WithIdStringUpdateComponent } from './with-id-string-update.component';
import { WithIdStringDeleteDialogComponent } from './with-id-string-delete-dialog.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [WithIdStringComponent, WithIdStringDetailComponent, WithIdStringUpdateComponent, WithIdStringDeleteDialogComponent],
  exports: [WithIdStringDetailComponent, WithIdStringUpdateComponent, WithIdStringDeleteDialogComponent],
  entryComponents: [WithIdStringDeleteDialogComponent],
})
export class WithIdStringModule {}
