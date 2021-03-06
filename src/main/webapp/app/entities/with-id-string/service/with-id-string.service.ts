import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWithIdString, getWithIdStringIdentifier } from '../with-id-string.model';

export type EntityResponseType = HttpResponse<IWithIdString>;
export type EntityArrayResponseType = HttpResponse<IWithIdString[]>;

@Injectable({ providedIn: 'root' })
export class WithIdStringService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/with-id-strings');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(withIdString: IWithIdString): Observable<EntityResponseType> {
    return this.http.post<IWithIdString>(this.resourceUrl, withIdString, { observe: 'response' });
  }

  update(withIdString: IWithIdString): Observable<EntityResponseType> {
    return this.http.put<IWithIdString>(`${this.resourceUrl}/${getWithIdStringIdentifier(withIdString)!}`, withIdString, {
      observe: 'response',
    });
  }

  partialUpdate(withIdString: IWithIdString): Observable<EntityResponseType> {
    return this.http.patch<IWithIdString>(`${this.resourceUrl}/${getWithIdStringIdentifier(withIdString)!}`, withIdString, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IWithIdString>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWithIdString[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
