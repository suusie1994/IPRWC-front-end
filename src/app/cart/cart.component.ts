import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';
import { CartItem } from './cart-item.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  public cartItems: CartItem[] = [];
  productsInCart: Product[] = [];
  totalPrice = 0.00;

  constructor(private cartService: CartService,
              private productService: ProductsService,
              private router: Router) { }

  ngOnInit(): void {
    this.cartItems = [];
    this.cartService.getCartItems().then(data => {
      this.cartItems = data;
    });
  }

  getProductById(id: number): Product{
    return this.productService.getProductById(id);
  }

  getTotalPrice(): number {
    let overallPrice = 0;
    for (const item of this.cartItems) {
      overallPrice = overallPrice + (parseFloat(this.getProductById(item.productId).price!.replace(/,/g, '.')) * item.amount);
    }
    return overallPrice;
  }

  updateAmountInCart(form: NgForm, cartItem: CartItem){
    const newAmount: number = form.value.amount;
    const updatedProduct: Product = this.getProductById(cartItem.productId);
    // update product amount
    if (updatedProduct.amount && cartItem.amount > newAmount){
    // als oud > nieuw -> minder in mandje -> meer voorraad
      updatedProduct.amount = updatedProduct.amount + (cartItem.amount - newAmount);
    } else if (updatedProduct.amount && cartItem.amount < newAmount) {
    // als oud < nieuw -> meer in mandje -> minder voorraad
      updatedProduct.amount = updatedProduct.amount - (newAmount - cartItem.amount);
    }
    this.productService.updateProduct(updatedProduct);

    // update cart amount
    const updatedCartItem = cartItem;
    updatedCartItem.amount = newAmount;
    this.cartService.updateCartItem(updatedCartItem);
  }

  removeCartItem(cartItem: CartItem): void{
    const updatedProduct: Product = this.getProductById(cartItem.productId);
    if (updatedProduct.amount){
      updatedProduct.amount = updatedProduct.amount + cartItem.amount;
    }
    this.productService.updateProduct(updatedProduct);

    this.cartService.removeCartItemById(cartItem.id);

    window.location.reload();
  }

  ngOnDestroy(): void {
    this.cartItems = [];
    this.cartService.resetCart();
  }
}
