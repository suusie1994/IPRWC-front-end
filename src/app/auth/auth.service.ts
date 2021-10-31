import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: null|string = null;
  tokenSubscription = new Subscription();
  private tokenExpirationTime = 2000 * 1000;

  constructor(private router: Router) {}

  hasAuthorization(): boolean {
    return this.token !== null;
  }

  setAuthorization(username: string, password: string): void {
    this.token = 'Basic ' + btoa(username + ':' + password);
  }

  storeAuthorization(): void {
    if (this.token) {
      localStorage.setItem('token', this.token);
      this.expirationCounter(this.tokenExpirationTime);
    }
  }
  expirationCounter(timeToExpire: number): void {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeToExpire)).subscribe(() => {
      console.log('EXPIRED!!');

      this.deleteAuthorization();
      this.router.navigate(['/login']);
    });
  }

  restoreAuthorization(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    }
  }

  deleteAuthorization(): void {
    this.tokenSubscription.unsubscribe();
    localStorage.removeItem('token');
    this.token = null;
  }

  createAuthorizationString(): string {
    if (this.token) {
      return this.token;
    }
    return '';
  }
}
