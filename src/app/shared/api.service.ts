import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    url = 'http://localhost:8080/api';
    // url = 'http://suzanneblom.nl:8080/api';

    constructor(private authService: AuthService) {}

    public createRequestHeaders(): HttpHeaders
    {
      let headers = new HttpHeaders();

      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Accept', 'application/json');
      headers = headers.set('Access-Control-Allow-Origin', '*');

      if (this.authService.hasAuthorization())
      {
        headers = headers.set('Authorization', this.authService.createAuthorizationString());
      }
      return headers;
    }
}
