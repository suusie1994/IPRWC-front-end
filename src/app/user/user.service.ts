import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../shared/api.service';
import { Customer } from './customer.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get userSubject(): Subject<User|null> {
    return this._userSubject;
  }
  private loggedInUser: User | null = null;
  // tslint:disable-next-line: variable-name
  private _userSubject: Subject<User|null> = new Subject<User|null>();
  customerChanged = new Subject<Customer>();
  private customer: Customer = {};

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
    const headers = this.api.createRequestHeaders();
    return this.http.get<User[]>('http://localhost:8080/api/users', {headers});
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

  register(user: User, customer: Customer): void {
    const headers = this.api.createRequestHeaders();
    this.http.put<User>('http://localhost:8080/api/users/create', user, { headers }).toPromise()
    .then( () => {
      if (user.username && user.password) {
        this.authService.setAuthorization(
          user.username,
          user.password
        );
      }
      const newheaders = this.api.createRequestHeaders();
      this.http.get<User>('http://localhost:8080/api/users/me', { headers: newheaders }).toPromise()
      .then(response => {
        const respUser: User = {
          id: response.id,
          username: response.username,
          roles: response.roles
        };
        this.loggedInUser = respUser;
        this._userSubject.next(this.loggedInUser);
        this.authService.storeAuthorization();
      }).then( () => {
        this.http.put<Customer>('http://localhost:8080/api/customers/create', {
          id: this.loggedInUser?.id,
          firstname: customer.firstname,
          lastname: customer.lastname,
          emailAddress: customer.emailAddress,
          address: customer.address,
          zipcode: customer.zipcode,
          city: customer.city,
          phoneNumber: customer.phoneNumber
        }, { headers: newheaders })
        .toPromise().then( resdata => {
            this.router.navigate(['../user/' + this.loggedInUser?.id]);
          }, errorcustomer => {
            alert('Het registreren is mislukt');
          });
      });
    }).catch(error => console.log(error));
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
      this.router.navigate(['../user/' + this.loggedInUser?.id]);
    }, error => {
      alert('Het inloggen is mislukt');
    });
  }

  logout(): void {
    this.authService.deleteAuthorization();
    this.loggedInUser = null;
    this._userSubject.next(this.loggedInUser);
    this.router.navigate(['/auth']);
  }

  private returnToPage(): void {
    // tslint:disable-next-line: no-string-literal
    this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
  }

  isUserLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  getLoggedInUser(): User|null {
    return this.loggedInUser;
  }

  getCustomerDataOfUser(): Promise<any> {
    const id = this.getLoggedInUser()?.id;
    const headers = this.api.createRequestHeaders();
    return new Promise<Customer>(resolve => {
      this.http.get<Customer>('http://localhost:8080/api/customers/' + id, {headers})
      .subscribe(data => {
        this.customer = data;
        this.customerChanged.next(this.customer);
        resolve(this.customer);
      });
    });
  }
  updateCustomerDataOfUser(customer: Customer){
    const headers = this.api.createRequestHeaders();
    this.http.post<Customer>('http://localhost:8080/api/customers/update', customer, {headers})
    .subscribe(data => {
      this.customer = data;
      this.customerChanged.next(this.customer);
    });
  }
}
