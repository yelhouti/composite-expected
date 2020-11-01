import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWithUUIDDetails, WithUUIDDetails } from '../with-uuid-details.model';
import { WithUUIDDetailsService } from '../service/with-uuid-details.service';

@Injectable({ providedIn: 'root' })
export class WithUUIDDetailsRoutingResolveService implements Resolve<IWithUUIDDetails> {
  constructor(protected service: WithUUIDDetailsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWithUUIDDetails> | Observable<never> {
    const id = route.params['uuid'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((withUUIDDetails: HttpResponse<WithUUIDDetails>) => {
          if (withUUIDDetails.body) {
            return of(withUUIDDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WithUUIDDetails());
  }
}
