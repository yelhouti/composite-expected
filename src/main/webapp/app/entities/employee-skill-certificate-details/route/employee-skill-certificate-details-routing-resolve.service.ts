import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployeeSkillCertificateDetails } from '../employee-skill-certificate-details.model';
import { EmployeeSkillCertificateDetailsService } from '../service/employee-skill-certificate-details.service';

@Injectable({ providedIn: 'root' })
export class EmployeeSkillCertificateDetailsRoutingResolveService implements Resolve<IEmployeeSkillCertificateDetails | null> {
  constructor(private service: EmployeeSkillCertificateDetailsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeSkillCertificateDetails | null> | Observable<never> {
    const typeId = route.params['typeId'] ? route.params['typeId'] : null;
    const skillName = route.params['skillName'] ? route.params['skillName'] : null;
    const skillEmployeeUsername = route.params['skillEmployeeUsername'] ? route.params['skillEmployeeUsername'] : null;
    if (typeId && skillName && skillEmployeeUsername) {
      return this.service.find(typeId, skillName, skillEmployeeUsername).pipe(
        mergeMap((employeeSkillCertificateDetails: HttpResponse<IEmployeeSkillCertificateDetails>) => {
          if (employeeSkillCertificateDetails.body) {
            return of(employeeSkillCertificateDetails.body);
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
