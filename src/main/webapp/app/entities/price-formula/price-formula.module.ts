import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PriceFormulaComponent } from './price-formula.component';
import { PriceFormulaDetailComponent } from './price-formula-detail.component';
import { PriceFormulaUpdateComponent } from './price-formula-update.component';
import { PriceFormulaDeleteDialogComponent } from './price-formula-delete-dialog.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [PriceFormulaComponent, PriceFormulaDetailComponent, PriceFormulaUpdateComponent, PriceFormulaDeleteDialogComponent],
  exports: [PriceFormulaDetailComponent, PriceFormulaUpdateComponent, PriceFormulaDeleteDialogComponent],
  entryComponents: [PriceFormulaDeleteDialogComponent],
})
export class PriceFormulaModule {}
