import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from 'app/core/config/config.service';
import { Registration } from './register.model';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  save(registration: Registration): Observable<{}> {
    return this.http.post(this.configService.getEndpointFor('api/register'), registration);
  }
}
