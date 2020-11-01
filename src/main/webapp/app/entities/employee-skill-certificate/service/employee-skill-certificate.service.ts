import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmployeeSkillCertificate, getEmployeeSkillCertificateIdentifier } from '../employee-skill-certificate.model';

export type EntityResponseType = HttpResponse<IEmployeeSkillCertificate>;
export type EntityArrayResponseType = HttpResponse<IEmployeeSkillCertificate[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeSkillCertificateService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/employee-skill-certificates');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(employeeSkillCertificate: IEmployeeSkillCertificate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employeeSkillCertificate);
    return this.http
      .post<IEmployeeSkillCertificate>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(employeeSkillCertificate: IEmployeeSkillCertificate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employeeSkillCertificate);
    return this.http
      .put<IEmployeeSkillCertificate>(
        `${this.resourceUrl}/${getEmployeeSkillCertificateIdentifier(employeeSkillCertificate) as number}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEmployeeSkillCertificate>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEmployeeSkillCertificate[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEmployeeSkillCertificateToCollectionIfMissing(
    employeeSkillCertificateCollection: IEmployeeSkillCertificate[],
    ...employeeSkillCertificatesToCheck: (IEmployeeSkillCertificate | null | undefined)[]
  ): IEmployeeSkillCertificate[] {
    const employeeSkillCertificates: IEmployeeSkillCertificate[] = employeeSkillCertificatesToCheck.filter(isPresent);
    if (employeeSkillCertificates.length > 0) {
      const employeeSkillCertificateCollectionIdentifiers = employeeSkillCertificateCollection.map(
        employeeSkillCertificateItem => getEmployeeSkillCertificateIdentifier(employeeSkillCertificateItem)!
      );
      const employeeSkillCertificatesToAdd = employeeSkillCertificates.filter(employeeSkillCertificateItem => {
        const employeeSkillCertificateIdentifier = getEmployeeSkillCertificateIdentifier(employeeSkillCertificateItem);
        if (
          employeeSkillCertificateIdentifier == null ||
          employeeSkillCertificateCollectionIdentifiers.includes(employeeSkillCertificateIdentifier)
        ) {
          return false;
        }
        employeeSkillCertificateCollectionIdentifiers.push(employeeSkillCertificateIdentifier);
        return true;
      });
      return [...employeeSkillCertificatesToAdd, ...employeeSkillCertificateCollection];
    }
    return employeeSkillCertificateCollection;
  }

  protected convertDateFromClient(employeeSkillCertificate: IEmployeeSkillCertificate): IEmployeeSkillCertificate {
    const copy: IEmployeeSkillCertificate = Object.assign({}, employeeSkillCertificate, {
      date: employeeSkillCertificate.date?.isValid() ? employeeSkillCertificate.date.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? dayjs(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((employeeSkillCertificate: IEmployeeSkillCertificate) => {
        employeeSkillCertificate.date = employeeSkillCertificate.date ? dayjs(employeeSkillCertificate.date) : undefined;
      });
    }
    return res;
  }
}
