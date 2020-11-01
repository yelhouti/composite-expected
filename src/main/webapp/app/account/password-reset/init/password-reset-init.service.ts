import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from 'app/core/config/config.service';

@Injectable({ providedIn: 'root' })
export class PasswordResetInitService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  save(mail: string): Observable<{}> {
    return this.http.post(this.configService.getEndpointFor('api/account/reset-password/init'), mail);
  }
}
