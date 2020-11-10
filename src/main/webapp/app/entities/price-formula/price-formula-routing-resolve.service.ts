import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPriceFormula, PriceFormula } from 'app/shared/model/price-formula.model';
import { PriceFormulaService } from './price-formula.service';

@Injectable({ providedIn: 'root' })
export class PriceFormulaRoutingResolveService implements Resolve<IPriceFormula> {
  constructor(private service: PriceFormulaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPriceFormula> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((priceFormula: HttpResponse<PriceFormula>) => {
          if (priceFormula.body) {
            return of(priceFormula.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PriceFormula());
  }
}
