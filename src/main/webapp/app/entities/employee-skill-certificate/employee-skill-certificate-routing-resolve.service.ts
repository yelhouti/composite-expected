import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployeeSkillCertificate, EmployeeSkillCertificate } from 'app/shared/model/employee-skill-certificate.model';
import { EmployeeSkillCertificateService } from './employee-skill-certificate.service';

@Injectable({ providedIn: 'root' })
export class EmployeeSkillCertificateRoutingResolveService implements Resolve<IEmployeeSkillCertificate> {
  constructor(private service: EmployeeSkillCertificateService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeSkillCertificate> | Observable<never> {
    const typeId = route.params['typeId'] ? route.params['typeId'] : null;
    const skillName = route.params['skillName'] ? route.params['skillName'] : null;
    const skillEmployeeUsername = route.params['skillEmployeeUsername'] ? route.params['skillEmployeeUsername'] : null;
    if (typeId && skillName && skillEmployeeUsername) {
      return this.service.find(typeId, skillName, skillEmployeeUsername).pipe(
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
