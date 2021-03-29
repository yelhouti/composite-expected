import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmployeeSkill, getEmployeeSkillIdentifier } from '../employee-skill.model';

export type EntityResponseType = HttpResponse<IEmployeeSkill>;
export type EntityArrayResponseType = HttpResponse<IEmployeeSkill[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeSkillService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/employee-skills');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(employeeSkill: IEmployeeSkill): Observable<EntityResponseType> {
    return this.http.post<IEmployeeSkill>(this.resourceUrl, employeeSkill, { observe: 'response' });
  }

  update(employeeSkill: IEmployeeSkill): Observable<EntityResponseType> {
    return this.http.put<IEmployeeSkill>(`${this.resourceUrl}/${getEmployeeSkillIdentifier(employeeSkill)!}`, employeeSkill, {
      observe: 'response',
    });
  }

  partialUpdate(employeeSkill: IEmployeeSkill): Observable<EntityResponseType> {
    return this.http.patch<IEmployeeSkill>(`${this.resourceUrl}/${getEmployeeSkillIdentifier(employeeSkill)!}`, employeeSkill, {
      observe: 'response',
    });
  }

  find(name: string, employeeUsername: string): Observable<EntityResponseType> {
    return this.http.get<IEmployeeSkill>(`${this.resourceUrl}/name=${name};employeeUsername=${employeeUsername}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployeeSkill[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(name: string, employeeUsername: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/name=${name};employeeUsername=${employeeUsername}`, { observe: 'response' });
  }
}
