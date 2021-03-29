import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICertificateType, getCertificateTypeIdentifier } from '../certificate-type.model';

export type EntityResponseType = HttpResponse<ICertificateType>;
export type EntityArrayResponseType = HttpResponse<ICertificateType[]>;

@Injectable({ providedIn: 'root' })
export class CertificateTypeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/certificate-types');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(certificateType: ICertificateType): Observable<EntityResponseType> {
    return this.http.post<ICertificateType>(this.resourceUrl, certificateType, { observe: 'response' });
  }

  update(certificateType: ICertificateType): Observable<EntityResponseType> {
    return this.http.put<ICertificateType>(`${this.resourceUrl}/${getCertificateTypeIdentifier(certificateType)!}`, certificateType, {
      observe: 'response',
    });
  }

  partialUpdate(certificateType: ICertificateType): Observable<EntityResponseType> {
    return this.http.patch<ICertificateType>(`${this.resourceUrl}/${getCertificateTypeIdentifier(certificateType)!}`, certificateType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICertificateType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICertificateType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
