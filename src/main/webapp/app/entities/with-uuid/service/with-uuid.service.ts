import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
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
    return this.http.put<IWithUUID>(`${this.resourceUrl}/${getWithUUIDIdentifier(withUUID) as string}`, withUUID, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IWithUUID>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWithUUID[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addWithUUIDToCollectionIfMissing(withUUIDCollection: IWithUUID[], ...withUUIDSToCheck: (IWithUUID | null | undefined)[]): IWithUUID[] {
    const withUUIDS: IWithUUID[] = withUUIDSToCheck.filter(isPresent);
    if (withUUIDS.length > 0) {
      const withUUIDCollectionIdentifiers = withUUIDCollection.map(withUUIDItem => getWithUUIDIdentifier(withUUIDItem)!);
      const withUUIDSToAdd = withUUIDS.filter(withUUIDItem => {
        const withUUIDIdentifier = getWithUUIDIdentifier(withUUIDItem);
        if (withUUIDIdentifier == null || withUUIDCollectionIdentifiers.includes(withUUIDIdentifier)) {
          return false;
        }
        withUUIDCollectionIdentifiers.push(withUUIDIdentifier);
        return true;
      });
      return [...withUUIDSToAdd, ...withUUIDCollection];
    }
    return withUUIDCollection;
  }
}
