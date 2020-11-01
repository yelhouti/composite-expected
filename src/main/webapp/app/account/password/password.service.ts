import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from 'app/core/config/config.service';

@Injectable({ providedIn: 'root' })
export class PasswordService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  save(newPassword: string, currentPassword: string): Observable<{}> {
    return this.http.post(this.configService.getEndpointFor('api/account/change-password'), { currentPassword, newPassword });
  }
}
