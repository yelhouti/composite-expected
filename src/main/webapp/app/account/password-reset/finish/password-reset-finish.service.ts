import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from 'app/core/config/config.service';

@Injectable({ providedIn: 'root' })
export class PasswordResetFinishService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  save(key: string, newPassword: string): Observable<{}> {
    return this.http.post(this.configService.getEndpointFor('api/account/reset-password/finish'), { key, newPassword });
  }
}
