import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployeeSkillCertificate, EmployeeSkillCertificate } from '../employee-skill-certificate.model';
import { EmployeeSkillCertificateService } from '../service/employee-skill-certificate.service';

@Injectable({ providedIn: 'root' })
export class EmployeeSkillCertificateRoutingResolveService implements Resolve<IEmployeeSkillCertificate> {
  constructor(protected service: EmployeeSkillCertificateService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeSkillCertificate> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((employeeSkillCertificate: HttpResponse<EmployeeSkillCertificate>) => {
          if (employeeSkillCertificate.body) {
            return of(employeeSkillCertificate.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmployeeSkillCertificate());
  }
}
