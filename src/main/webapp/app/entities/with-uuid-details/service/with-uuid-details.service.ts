import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ConfigService } from 'app/core/config/config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWithUUIDDetails, getWithUUIDDetailsIdentifier } from '../with-uuid-details.model';

export type EntityResponseType = HttpResponse<IWithUUIDDetails>;
export type EntityArrayResponseType = HttpResponse<IWithUUIDDetails[]>;

@Injectable({ providedIn: 'root' })
export class WithUUIDDetailsService {
  public resourceUrl = this.configService.getEndpointFor('api/with-uuid-details');

  constructor(protected http: HttpClient, private configService: ConfigService) {}

  create(withUUIDDetails: IWithUUIDDetails): Observable<EntityResponseType> {
    return this.http.post<IWithUUIDDetails>(this.resourceUrl, withUUIDDetails, { observe: 'response' });
  }

  update(withUUIDDetails: IWithUUIDDetails): Observable<EntityResponseType> {
    return this.http.put<IWithUUIDDetails>(this.resourceUrl, withUUIDDetails, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IWithUUIDDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWithUUIDDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addWithUUIDDetailsToCollectionIfMissing(
    withUUIDDetailsCollection: IWithUUIDDetails[],
    ...withUUIDDetailsToCheck: (IWithUUIDDetails | null | undefined)[]
  ): IWithUUIDDetails[] {
    const withUUIDDetails: IWithUUIDDetails[] = withUUIDDetailsToCheck.filter(isPresent);
    if (withUUIDDetails.length > 0) {
      const withUUIDDetailsCollectionIdentifiers = withUUIDDetailsCollection.map(
        withUUIDDetailsItem => getWithUUIDDetailsIdentifier(withUUIDDetailsItem)!
      );
      const withUUIDDetailsToAdd = withUUIDDetails.filter(withUUIDDetailsItem => {
        const withUUIDDetailsIdentifier = getWithUUIDDetailsIdentifier(withUUIDDetailsItem);
        if (withUUIDDetailsIdentifier == null || withUUIDDetailsCollectionIdentifiers.includes(withUUIDDetailsIdentifier)) {
          return false;
        }
        withUUIDDetailsCollectionIdentifiers.push(withUUIDDetailsIdentifier);
        return true;
      });
      return [...withUUIDDetailsToAdd, ...withUUIDDetailsCollection];
    }
    return withUUIDDetailsCollection;
  }
}
