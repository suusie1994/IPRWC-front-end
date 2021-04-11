import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../shared/api.service';
import { UserService } from '../user/user.service';
import { CartItem } from './cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  cartItemsChanged = new Subject<CartItem[]>();
  isAuthenticated = false;

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private authService: AuthService,
              private userService: UserService) {
    this.isAuthenticated = this.authService.hasAuthorization();
  }

  getCartItems(): Promise<any> {
    const headers = this.apiService.createRequestHeaders();
    const id = this.userService.getLoggedInUser()?.id;
    if (this.cartItems.length === 0){
      if (id){
        return new Promise<any>(resolve => {
          this.http.get<CartItem[]>('http://localhost:8080/api/cart/' + id, {headers})
          .subscribe(data => {
            for (const cartItem of data){
              this.cartItems.push(cartItem);
              this.cartItemsChanged.next(this.cartItems.slice());
            }
            resolve(this.cartItems.slice());
          });
        });
      } else {
        return new Promise<any>(resolve => {
          this.http.get<CartItem[]>('http://localhost:8080/api/cart/')
          .subscribe(data => {
            for (const cartItem of data){
              this.cartItems.push(cartItem);
              this.cartItemsChanged.next(this.cartItems.slice());
            }
            resolve(this.cartItems.slice());
          });
        });
      }
    } else{
      return new Promise<any>(resolve => {
        resolve(this.cartItems.slice());
      });
    }
  }

  addProductToCart(productId: number, amount: number): void {
    const id = this.cartItems.length;
    const userId = this.userService.getLoggedInUser()?.id;
    let newCartItem: CartItem;
    if (this.userService.getLoggedInUser()?.id){
      newCartItem = new CartItem(id, productId, amount, userId);
    } else {
      newCartItem = new CartItem(id, productId, amount, 0);
    }
    this.cartItems.push(newCartItem);
    // cartitem to db
    const headers = this.apiService.createRequestHeaders();
    this.http.put<CartItem>('http://localhost:8080/api/cart/create', newCartItem, {headers})
    .subscribe(data => {
      this.getCartItems();
      this.cartItemsChanged.next(this.cartItems.slice());
    });
  }

  removeCartItemById(id: number): void {
    this.http.delete('http://localhost:8080/api/cart' + id);
  }

  resetCart(): void {
    this.cartItems = [];
    this.cartItemsChanged.next(this.cartItems.slice());
    // this.getCartItems();
  }
}