import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private authService: AuthService) {}

    // private createQueryString(queryParameters: Object): string
    // {
    //   let queryString = '';

    //   if (typeof queryParameters === 'object')
    //   {
    //     // tslint:disable-next-line: forin
    //     for (const key in queryParameters)
    //     {
    //       console.log(queryParameters, typeof queryParameters);
    //       const value = queryParameters[key];
    //       const prefix = queryString.length === 0 ? '?' : '&';

    //       queryString += `${prefix}${key}=${value}`;
    //     }
    //   }

    //     return queryString;
    // }

    // private createURI(path: string, queryParameters: Object): string
    // {
    //     const queryString = this.createQueryString(queryParameters);

    //     return `http://localhost:8080/api/${path}${queryString}`;
    // }

    public createRequestHeaders(): HttpHeaders
    {
      let headers = new HttpHeaders();

      if (this.authService.hasAuthorization())
      {
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Authorization', this.authService.createAuthorizationString());
      }
      return headers;
    }

    // public get<T>(path: string, queryParameters?: Object): Observable<T>|any
    // {
    //   let uri = '';
    //   if (typeof queryParameters === 'object') {
    //     uri = this.createURI(path, queryParameters);
    //   }
    //   const headers = this.createRequestHeaders();

    //   return this.http.get<T>(uri, { headers });
    // }

    // public post<T>(path: string, data: Object, queryParameters?: Object): Observable<T>
    // {
    //   let uri = '';
    //   if (typeof queryParameters === 'object') {
    //     uri = this.createURI(path, queryParameters);
    //   }
    //   const headers = this.createRequestHeaders();

    //   return this.http.post<T>(uri, data, { headers });
    // }

    // public put<T>(path: string, data: any, queryParameters?: Object): Observable<T>
    // {
    //   let uri = '';
    //   if (typeof queryParameters === 'object') {
    //     uri = this.createURI(path, queryParameters);
    //   }
    //   const headers = this.createRequestHeaders();

    //   return this.http.put<T>(uri, data, { headers });
    // }

    // public delete<T>(path: string, queryParameters?: Object): Observable<T>
    // {
    //   let uri = '';
    //   if (typeof queryParameters === 'object') {
    //     uri = this.createURI(path, queryParameters);
    //   }
    //   const headers = this.createRequestHeaders();

    //   return this.http.delete<T>(uri, { headers });
    // }
}
