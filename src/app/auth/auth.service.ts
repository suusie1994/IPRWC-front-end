import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: null|string = null;

  constructor() {}

  hasAuthorization(): boolean {
    return this.token !== null;
  }

  setAuthorization(username: string, password: string): void {
    this.token = 'Basic ' + btoa(username + ':' + password);
  }

  storeAuthorization(): void {
    if (this.token) {
      localStorage.setItem('token', this.token);
    }
  }

  restoreAuthorization(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    }
  }

  deleteAuthorization(): void {
    localStorage.removeItem('token');
    this.token = '';
  }

  createAuthorizationString(): string {
    if (this.token) {
      return this.token;
    }
    return '';
  }
}
