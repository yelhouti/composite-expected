import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/core/request/request-util';
import { IPriceFormula } from 'app/shared/model/price-formula.model';

type EntityResponseType = HttpResponse<IPriceFormula>;
type EntityArrayResponseType = HttpResponse<IPriceFormula[]>;

@Injectable({ providedIn: 'root' })
export class PriceFormulaService {
  public resourceUrl = SERVER_API_URL + 'api/price-formulas';

  constructor(protected http: HttpClient) {}

  create(priceFormula: IPriceFormula): Observable<EntityResponseType> {
    return this.http.post<IPriceFormula>(this.resourceUrl, priceFormula, { observe: 'response' });
  }

  update(priceFormula: IPriceFormula): Observable<EntityResponseType> {
    return this.http.put<IPriceFormula>(this.resourceUrl, priceFormula, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPriceFormula>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPriceFormula[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
