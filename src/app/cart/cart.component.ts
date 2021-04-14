import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';
import { UserService } from '../user/user.service';
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
  showModal = false;
  isLoginMode = true;

  constructor(private cartService: CartService,
              private productService: ProductsService,
              private router: Router,
              private userService: UserService) { }

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
    if (updatedProduct.amount && cartItem.amount > newAmount){
      updatedProduct.amount = updatedProduct.amount + (cartItem.amount - newAmount);
    } else if (updatedProduct.amount && cartItem.amount < newAmount) {
      updatedProduct.amount = updatedProduct.amount - (newAmount - cartItem.amount);
    }
    this.productService.updateProduct(updatedProduct);

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

  toOrder(): void{
    // niet ingelogd? login or sign up dan naar orders
    if (!this.userService.isUserLoggedIn()){
      this.showModal = true;
    } else{
      // ingelogd? ga naar orders
      this.router.navigate(['/orders']);
    }
  }

  onSwitchMode(): void{
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    if (!form.valid){
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    const customer = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      emailAddress: form.value.emailAddress,
      address: form.value.address,
      zipcode: form.value.zipcode,
      city: form.value.city,
      phoneNumber: form.value.phoneNumber
    };

    if (this.isLoginMode) {
      // login
      this.userService.login({username, password}, true, false).then(() => {
        this.continueOrder();
      });
    } else {
      // signup
      this.userService.register({username, password, roles: ['CUSTOMER']}, customer, false).then(() => {
        this.continueOrder();
      });
    }
    form.reset();
  }
  continueOrder(): void{
    const id = this.userService.getLoggedInUser()?.id;
    for (const item of this.cartItems){
      item.userId = id;
      this.cartService.updateCartItem(item).then(data => {
        console.log(data);
      });
    }
    this.router.navigate(['/orders']);
  }

  closeModal(): void{
    this.showModal = false;
  }

  ngOnDestroy(): void {
    this.cartItems = [];
    this.cartService.resetCart();
  }
}
