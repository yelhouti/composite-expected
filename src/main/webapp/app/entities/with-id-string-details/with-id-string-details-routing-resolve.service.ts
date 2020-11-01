import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWithIdStringDetails, WithIdStringDetails } from 'app/shared/model/with-id-string-details.model';
import { WithIdStringDetailsService } from './with-id-string-details.service';

@Injectable({ providedIn: 'root' })
export class WithIdStringDetailsRoutingResolveService implements Resolve<IWithIdStringDetails> {
  constructor(private service: WithIdStringDetailsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWithIdStringDetails> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((withIdStringDetails: HttpResponse<WithIdStringDetails>) => {
          if (withIdStringDetails.body) {
            return of(withIdStringDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WithIdStringDetails());
  }
}
