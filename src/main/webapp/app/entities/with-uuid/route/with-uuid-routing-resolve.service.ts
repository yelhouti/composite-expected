import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWithUUID, WithUUID } from '../with-uuid.model';
import { WithUUIDService } from '../service/with-uuid.service';

@Injectable({ providedIn: 'root' })
export class WithUUIDRoutingResolveService implements Resolve<IWithUUID> {
  constructor(protected service: WithUUIDService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWithUUID> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((withUUID: HttpResponse<WithUUID>) => {
          if (withUUID.body) {
            return of(withUUID.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WithUUID());
  }
}
