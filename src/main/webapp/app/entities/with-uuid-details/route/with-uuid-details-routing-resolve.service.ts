import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWithUUIDDetails } from '../with-uuid-details.model';
import { WithUUIDDetailsService } from '../service/with-uuid-details.service';

@Injectable({ providedIn: 'root' })
export class WithUUIDDetailsRoutingResolveService implements Resolve<IWithUUIDDetails | null> {
  constructor(private service: WithUUIDDetailsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWithUUIDDetails | null> | Observable<never> {
    const uuid = route.params['uuid'] ? route.params['uuid'] : null;
    if (uuid) {
      return this.service.find(uuid).pipe(
        mergeMap((withUUIDDetails: HttpResponse<IWithUUIDDetails>) => {
          if (withUUIDDetails.body) {
            return of(withUUIDDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
