import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWithIdStringDetails, getWithIdStringDetailsIdentifier } from '../with-id-string-details.model';

export type EntityResponseType = HttpResponse<IWithIdStringDetails>;
export type EntityArrayResponseType = HttpResponse<IWithIdStringDetails[]>;

@Injectable({ providedIn: 'root' })
export class WithIdStringDetailsService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/with-id-string-details');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(withIdStringDetails: IWithIdStringDetails): Observable<EntityResponseType> {
    return this.http.post<IWithIdStringDetails>(this.resourceUrl, withIdStringDetails, { observe: 'response' });
  }

  update(withIdStringDetails: IWithIdStringDetails): Observable<EntityResponseType> {
    return this.http.put<IWithIdStringDetails>(
      `${this.resourceUrl}/${getWithIdStringDetailsIdentifier(withIdStringDetails)!}`,
      withIdStringDetails,
      { observe: 'response' }
    );
  }

  partialUpdate(withIdStringDetails: IWithIdStringDetails): Observable<EntityResponseType> {
    return this.http.patch<IWithIdStringDetails>(
      `${this.resourceUrl}/${getWithIdStringDetailsIdentifier(withIdStringDetails)!}`,
      withIdStringDetails,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IWithIdStringDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWithIdStringDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
