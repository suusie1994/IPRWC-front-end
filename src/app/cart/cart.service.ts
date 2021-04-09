import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() { }

  getCartItems(): CartItem[]{
    return this.cartItems;
  }

  addProductToCart(productId: number, amount: number, userId?: number): void {
    const id = this.cartItems.length + 1;
    const newCartItem: CartItem = new CartItem(productId, amount, id, userId);
    this.cartItems.push(newCartItem);
  }
}
