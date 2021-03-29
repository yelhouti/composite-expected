import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmployee, getEmployeeIdentifier } from '../employee.model';

export type EntityResponseType = HttpResponse<IEmployee>;
export type EntityArrayResponseType = HttpResponse<IEmployee[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/employees');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(employee: IEmployee): Observable<EntityResponseType> {
    return this.http.post<IEmployee>(this.resourceUrl, employee, { observe: 'response' });
  }

  update(employee: IEmployee): Observable<EntityResponseType> {
    return this.http.put<IEmployee>(`${this.resourceUrl}/${getEmployeeIdentifier(employee)!}`, employee, { observe: 'response' });
  }

  partialUpdate(employee: IEmployee): Observable<EntityResponseType> {
    return this.http.patch<IEmployee>(`${this.resourceUrl}/${getEmployeeIdentifier(employee)!}`, employee, { observe: 'response' });
  }

  find(username: string): Observable<EntityResponseType> {
    return this.http.get<IEmployee>(`${this.resourceUrl}/${username}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployee[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(username: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${username}`, { observe: 'response' });
  }
}
