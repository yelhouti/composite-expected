import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWithUUIDDetails, getWithUUIDDetailsIdentifier } from '../with-uuid-details.model';

export type EntityResponseType = HttpResponse<IWithUUIDDetails>;
export type EntityArrayResponseType = HttpResponse<IWithUUIDDetails[]>;

@Injectable({ providedIn: 'root' })
export class WithUUIDDetailsService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/with-uuid-details');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(withUUIDDetails: IWithUUIDDetails): Observable<EntityResponseType> {
    return this.http.post<IWithUUIDDetails>(this.resourceUrl, withUUIDDetails, { observe: 'response' });
  }

  update(withUUIDDetails: IWithUUIDDetails): Observable<EntityResponseType> {
    return this.http.put<IWithUUIDDetails>(`${this.resourceUrl}/${getWithUUIDDetailsIdentifier(withUUIDDetails)!}`, withUUIDDetails, {
      observe: 'response',
    });
  }

  partialUpdate(withUUIDDetails: IWithUUIDDetails): Observable<EntityResponseType> {
    return this.http.patch<IWithUUIDDetails>(`${this.resourceUrl}/${getWithUUIDDetailsIdentifier(withUUIDDetails)!}`, withUUIDDetails, {
      observe: 'response',
    });
  }

  find(uuid: string): Observable<EntityResponseType> {
    return this.http.get<IWithUUIDDetails>(`${this.resourceUrl}/${uuid}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWithUUIDDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(uuid: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${uuid}`, { observe: 'response' });
  }
}
