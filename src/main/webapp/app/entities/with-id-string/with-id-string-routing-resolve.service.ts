import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWithIdString, WithIdString } from 'app/shared/model/with-id-string.model';
import { WithIdStringService } from './with-id-string.service';

@Injectable({ providedIn: 'root' })
export class WithIdStringRoutingResolveService implements Resolve<IWithIdString> {
  constructor(private service: WithIdStringService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWithIdString> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((withIdString: HttpResponse<WithIdString>) => {
          if (withIdString.body) {
            return of(withIdString.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WithIdString());
  }
}
