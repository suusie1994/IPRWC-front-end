import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
              private apiService: ApiService,
              private router: Router,
              private authService: AuthService) {
    this.authService.restoreAuthorization();
    if (this.authService.hasAuthorization()) {
      this.authUser();
    }
  }

  public getAll(): Observable<User[]> {
    const headers = this.apiService.createRequestHeaders();
    return this.http.get<User[]>(this.apiService.url + '/users', {headers});
  }

  login(user: User, remember: boolean, toRoute?: boolean, routeTo?: string): Promise<any> {
    if (user.username && user.password) {
      this.authService.setAuthorization(
        user.username,
        user.password
      );
    }
    return new Promise<any>(resolve => {
      this.authUser(remember, toRoute, routeTo).then(() => {
        resolve(this.getLoggedInUser());
      });
    });
  }

  register(user: User, customer: Customer, toRoute?: boolean, routeTo?: string): Promise<any> {
    const headers = this.apiService.createRequestHeaders();
    return new Promise<any>(resolve => {
      this.http.put<User>(this.apiService.url + '/users/create', user, { headers }).toPromise()
      .then( () => {
        if (user.username && user.password) {
          this.authService.setAuthorization(
            user.username,
            user.password
          );
        }
        const newheaders = this.apiService.createRequestHeaders();
        this.http.get<User>(this.apiService.url + '/users/me', { headers: newheaders }).toPromise()
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
          this.http.put<Customer>(this.apiService.url + '/customers/create', {
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
            if (toRoute){
              if (routeTo){
                this.router.navigate([routeTo]);
              } else {
                this.router.navigate(['../user/' + this.loggedInUser?.id]);
              }
            }
            }, errorcustomer => {
              alert('Het registreren is mislukt');
            });
        });
      }).catch(error => console.log(error));
      resolve(this.getLoggedInUser());
    });
  }

  authUser(remember?: boolean, toRoute?: boolean, routeTo?: string): Promise<any> {
    const headers = this.apiService.createRequestHeaders();
    return new Promise<any>(resolve => {
      this.http.get<User>(this.apiService.url + '/users/me', {
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
        if (toRoute){
          if (routeTo){
            this.router.navigate([routeTo]);
          } else {
            this.router.navigate(['../user/' + this.loggedInUser?.id]);
          }
        }
        resolve(this.getLoggedInUser());
      }, error => {
        this.logout();
        alert('Het inloggen is mislukt');
      });
    });
  }

  logout(): void {
    this.authService.deleteAuthorization();
    this.loggedInUser = null;
    this._userSubject.next(this.loggedInUser);
    this.router.navigate(['/auth']);
  }

  isUserLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  getLoggedInUser(): User|null {
    return this.loggedInUser;
  }
  getRoles(): string[] {
    return this.loggedInUser?.roles ? this.loggedInUser.roles : [];
  }

  getCustomerDataOfUser(): Promise<any> {
    const id = this.getLoggedInUser()?.id;
    const headers = this.apiService.createRequestHeaders();
    return new Promise<Customer>(resolve => {
      this.http.get<Customer>(this.apiService.url + '/customers/' + id, {headers})
      .subscribe(data => {
        this.customer = data;
        this.customerChanged.next(this.customer);
        resolve(this.customer);
      });
    });
  }
  updateCustomerDataOfUser(customer: Customer): void{
    const headers = this.apiService.createRequestHeaders();
    this.http.post<Customer>(this.apiService.url + '/customers/update', customer, {headers})
    .subscribe(data => {
      this.customer = data;
      this.customerChanged.next(this.customer);
    });
  }
  deleteUserAndCustomer(id: number): void {
    this.logout();
    const headers = this.apiService.createRequestHeaders();
    this.http.delete<Customer>(this.apiService.url + '/customers/' + id, {headers});
    this.http.delete<User>(this.apiService.url + '/users/' + id, {headers});
  }
}
