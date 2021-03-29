import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import {
  IEmployeeSkillCertificateDetails,
  getEmployeeSkillCertificateDetailsIdentifier,
} from '../employee-skill-certificate-details.model';

export type EntityResponseType = HttpResponse<IEmployeeSkillCertificateDetails>;
export type EntityArrayResponseType = HttpResponse<IEmployeeSkillCertificateDetails[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeSkillCertificateDetailsService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/employee-skill-certificate-details');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(employeeSkillCertificateDetails: IEmployeeSkillCertificateDetails): Observable<EntityResponseType> {
    return this.http.post<IEmployeeSkillCertificateDetails>(this.resourceUrl, employeeSkillCertificateDetails, { observe: 'response' });
  }

  update(employeeSkillCertificateDetails: IEmployeeSkillCertificateDetails): Observable<EntityResponseType> {
    return this.http.put<IEmployeeSkillCertificateDetails>(
      `${this.resourceUrl}/${getEmployeeSkillCertificateDetailsIdentifier(employeeSkillCertificateDetails)!}`,
      employeeSkillCertificateDetails,
      { observe: 'response' }
    );
  }

  partialUpdate(employeeSkillCertificateDetails: IEmployeeSkillCertificateDetails): Observable<EntityResponseType> {
    return this.http.patch<IEmployeeSkillCertificateDetails>(
      `${this.resourceUrl}/${getEmployeeSkillCertificateDetailsIdentifier(employeeSkillCertificateDetails)!}`,
      employeeSkillCertificateDetails,
      { observe: 'response' }
    );
  }

  find(typeId: number, skillName: string, skillEmployeeUsername: string): Observable<EntityResponseType> {
    return this.http.get<IEmployeeSkillCertificateDetails>(
      `${this.resourceUrl}/typeId=${typeId};skillName=${skillName};skillEmployeeUsername=${skillEmployeeUsername}`,
      { observe: 'response' }
    );
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployeeSkillCertificateDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(typeId: number, skillName: string, skillEmployeeUsername: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/typeId=${typeId};skillName=${skillName};skillEmployeeUsername=${skillEmployeeUsername}`, {
      observe: 'response',
    });
  }
}
