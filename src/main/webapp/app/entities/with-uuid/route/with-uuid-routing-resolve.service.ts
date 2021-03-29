import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWithUUID } from '../with-uuid.model';
import { WithUUIDService } from '../service/with-uuid.service';

@Injectable({ providedIn: 'root' })
export class WithUUIDRoutingResolveService implements Resolve<IWithUUID | null> {
  constructor(private service: WithUUIDService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWithUUID | null> | Observable<never> {
    const uuid = route.params['uuid'] ? route.params['uuid'] : null;
    if (uuid) {
      return this.service.find(uuid).pipe(
        mergeMap((withUUID: HttpResponse<IWithUUID>) => {
          if (withUUID.body) {
            return of(withUUID.body);
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
