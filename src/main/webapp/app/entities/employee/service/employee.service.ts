import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ConfigService } from 'app/core/config/config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmployee, getEmployeeIdentifier } from '../employee.model';

export type EntityResponseType = HttpResponse<IEmployee>;
export type EntityArrayResponseType = HttpResponse<IEmployee[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  public resourceUrl = this.configService.getEndpointFor('api/employees');

  constructor(protected http: HttpClient, private configService: ConfigService) {}

  create(employee: IEmployee): Observable<EntityResponseType> {
    return this.http.post<IEmployee>(this.resourceUrl, employee, { observe: 'response' });
  }

  update(employee: IEmployee): Observable<EntityResponseType> {
    return this.http.put<IEmployee>(this.resourceUrl, employee, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEmployee>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployee[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEmployeeToCollectionIfMissing(employeeCollection: IEmployee[], ...employeesToCheck: (IEmployee | null | undefined)[]): IEmployee[] {
    const employees: IEmployee[] = employeesToCheck.filter(isPresent);
    if (employees.length > 0) {
      const employeeCollectionIdentifiers = employeeCollection.map(employeeItem => getEmployeeIdentifier(employeeItem)!);
      const employeesToAdd = employees.filter(employeeItem => {
        const employeeIdentifier = getEmployeeIdentifier(employeeItem);
        if (employeeIdentifier == null || employeeCollectionIdentifiers.includes(employeeIdentifier)) {
          return false;
        }
        employeeCollectionIdentifiers.push(employeeIdentifier);
        return true;
      });
      return [...employeesToAdd, ...employeeCollection];
    }
    return employeeCollection;
  }
}
