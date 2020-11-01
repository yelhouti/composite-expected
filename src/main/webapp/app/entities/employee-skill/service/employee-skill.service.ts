import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
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
    return this.http.put<IEmployeeSkill>(`${this.resourceUrl}/${getEmployeeSkillIdentifier(employeeSkill) as string}`, employeeSkill, {
      observe: 'response'
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEmployeeSkill>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployeeSkill[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEmployeeSkillToCollectionIfMissing(
    employeeSkillCollection: IEmployeeSkill[],
    ...employeeSkillsToCheck: (IEmployeeSkill | null | undefined)[]
  ): IEmployeeSkill[] {
    const employeeSkills: IEmployeeSkill[] = employeeSkillsToCheck.filter(isPresent);
    if (employeeSkills.length > 0) {
      const employeeSkillCollectionIdentifiers = employeeSkillCollection.map(
        employeeSkillItem => getEmployeeSkillIdentifier(employeeSkillItem)!
      );
      const employeeSkillsToAdd = employeeSkills.filter(employeeSkillItem => {
        const employeeSkillIdentifier = getEmployeeSkillIdentifier(employeeSkillItem);
        if (employeeSkillIdentifier == null || employeeSkillCollectionIdentifiers.includes(employeeSkillIdentifier)) {
          return false;
        }
        employeeSkillCollectionIdentifiers.push(employeeSkillIdentifier);
        return true;
      });
      return [...employeeSkillsToAdd, ...employeeSkillCollection];
    }
    return employeeSkillCollection;
  }
}
