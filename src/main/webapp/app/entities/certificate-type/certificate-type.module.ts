import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { CertificateTypeComponent } from './certificate-type.component';
import { CertificateTypeDetailComponent } from './certificate-type-detail.component';
import { CertificateTypeUpdateComponent } from './certificate-type-update.component';
import { CertificateTypeDeleteDialogComponent } from './certificate-type-delete-dialog.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [
    CertificateTypeComponent,
    CertificateTypeDetailComponent,
    CertificateTypeUpdateComponent,
    CertificateTypeDeleteDialogComponent,
  ],
  exports: [CertificateTypeDetailComponent, CertificateTypeUpdateComponent, CertificateTypeDeleteDialogComponent],
  entryComponents: [CertificateTypeDeleteDialogComponent],
})
export class CertificateTypeModule {}
