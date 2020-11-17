import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmployeeSkill } from 'app/shared/model/employee-skill.model';

type EntityResponseType = HttpResponse<IEmployeeSkill>;
type EntityArrayResponseType = HttpResponse<IEmployeeSkill[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeSkillService {
  public resourceUrl = SERVER_API_URL + 'api/employee-skills';

  constructor(protected http: HttpClient) {}

  create(employeeSkill: IEmployeeSkill): Observable<EntityResponseType> {
    return this.http.post<IEmployeeSkill>(this.resourceUrl, employeeSkill, { observe: 'response' });
  }

  update(employeeSkill: IEmployeeSkill): Observable<EntityResponseType> {
    return this.http.put<IEmployeeSkill>(this.resourceUrl, employeeSkill, { observe: 'response' });
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
