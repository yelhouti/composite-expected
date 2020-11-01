import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployeeSkill, EmployeeSkill } from 'app/shared/model/employee-skill.model';
import { EmployeeSkillService } from './employee-skill.service';

@Injectable({ providedIn: 'root' })
export class EmployeeSkillRoutingResolveService implements Resolve<IEmployeeSkill> {
  constructor(private service: EmployeeSkillService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeSkill> | Observable<never> {
    const id = route.params['id'];
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
