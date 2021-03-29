import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWithUUID, getWithUUIDIdentifier } from '../with-uuid.model';

export type EntityResponseType = HttpResponse<IWithUUID>;
export type EntityArrayResponseType = HttpResponse<IWithUUID[]>;

@Injectable({ providedIn: 'root' })
export class WithUUIDService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/with-uuids');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(withUUID: IWithUUID): Observable<EntityResponseType> {
    return this.http.post<IWithUUID>(this.resourceUrl, withUUID, { observe: 'response' });
  }

  update(withUUID: IWithUUID): Observable<EntityResponseType> {
    return this.http.put<IWithUUID>(`${this.resourceUrl}/${getWithUUIDIdentifier(withUUID)!}`, withUUID, { observe: 'response' });
  }

  partialUpdate(withUUID: IWithUUID): Observable<EntityResponseType> {
    return this.http.patch<IWithUUID>(`${this.resourceUrl}/${getWithUUIDIdentifier(withUUID)!}`, withUUID, { observe: 'response' });
  }

  find(uuid: string): Observable<EntityResponseType> {
    return this.http.get<IWithUUID>(`${this.resourceUrl}/${uuid}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWithUUID[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(uuid: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${uuid}`, { observe: 'response' });
  }
}
