import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../shared/api.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get userSubject(): Subject<User> {
    return this._userSubject;
  }
  private loggedInUser: User = {};
  private _userSubject: Subject<User> = new Subject<User>();


  constructor(private http: HttpClient,
              private api: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
    this.authService.restoreAuthorization();
    if (this.authService.hasAuthorization()) {
      this.authUser();
    }
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/api/users');
  }

  login(user: User, remember: boolean): void {
    if (user.username && user.password) {
      this.authService.setAuthorization(
        user.username,
        user.password
      );
    }
    this.authUser(remember);
  }

  register(user: User): void {
    const headers = this.api.createRequestHeaders();
    this.http.put<User>('http://localhost:8080/api/users/create', user, { headers }).subscribe(
      data => {
        this.returnToPage(); //TODO moet worden customer aanmaken pagina
      }, error => {
        alert('Het registreren is mislukt');
      }
    );
  }

  authUser(remember?: boolean): void {
    const headers = this.api.createRequestHeaders();
    this.http.get<User>('http://localhost:8080/api/users/me', {
      headers
    })
    .subscribe( response  => {
      const user: User = {
        id: response.id,
        username: response.username,
        roles: response.roles
      };
      this.loggedInUser = user;
      this._userSubject.next(this.loggedInUser);
      if (remember) {
        this.authService.storeAuthorization();
      }
      this.returnToPage();
    }, error => {
      console.log('error: ', error);
      alert('Het inloggen is mislukt');
    });
  }

  logout(): void {
    this.authService.deleteAuthorization();
    this.loggedInUser = {};
    this._userSubject.next(this.loggedInUser);
    this.router.navigate(['/auth']);
  }

  private returnToPage(): void {
    this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
  }

  isUserLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  getLoggedInUser(): User {
    return this.loggedInUser;
  }
}
