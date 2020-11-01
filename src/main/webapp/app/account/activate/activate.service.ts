import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from 'app/core/config/config.service';

@Injectable({ providedIn: 'root' })
export class ActivateService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  get(key: string): Observable<{}> {
    return this.http.get(this.configService.getEndpointFor('api/activate'), {
      params: new HttpParams().set('key', key),
    });
  }
}
