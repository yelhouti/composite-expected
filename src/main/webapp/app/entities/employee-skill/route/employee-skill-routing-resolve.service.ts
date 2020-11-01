import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployeeSkill, EmployeeSkill } from '../employee-skill.model';
import { EmployeeSkillService } from '../service/employee-skill.service';

@Injectable({ providedIn: 'root' })
export class EmployeeSkillRoutingResolveService implements Resolve<IEmployeeSkill> {
  constructor(protected service: EmployeeSkillService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeSkill> | Observable<never> {
    const id = route.params['name'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((employeeSkill: HttpResponse<EmployeeSkill>) => {
          if (employeeSkill.body) {
            return of(employeeSkill.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmployeeSkill());
  }
}
