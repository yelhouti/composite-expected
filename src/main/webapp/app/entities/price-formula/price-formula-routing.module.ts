import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Authority } from 'app/core/user/authority.model';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PriceFormulaComponent } from './price-formula.component';
import { PriceFormulaDetailComponent } from './price-formula-detail.component';
import { PriceFormulaUpdateComponent } from './price-formula-update.component';
import { PriceFormulaRoutingResolveService } from './price-formula-routing-resolve.service';
import { PriceFormulaModule } from './price-formula.module';

const priceFormulaRoute: Routes = [
  {
    path: '',
    component: PriceFormulaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.priceFormula.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PriceFormulaDetailComponent,
    resolve: {
      priceFormula: PriceFormulaRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.priceFormula.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PriceFormulaUpdateComponent,
    resolve: {
      priceFormula: PriceFormulaRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.priceFormula.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PriceFormulaUpdateComponent,
    resolve: {
      priceFormula: PriceFormulaRoutingResolveService,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'compositekeyApp.priceFormula.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(priceFormulaRoute), PriceFormulaModule],
  exports: [PriceFormulaModule],
})
export class PriceFormulaRoutingModule {}
