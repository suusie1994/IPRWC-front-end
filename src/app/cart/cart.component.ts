import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../order/orders.service';
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
              private userService: UserService,
              private orderService: OrdersService) { }

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
      // tslint:disable-next-line: no-non-null-assertion
      overallPrice = overallPrice + (parseFloat(this.getProductById(item.productId).price!.replace(/,/g, '.')) * item.amount);
    }
    return overallPrice;
  }

  updateAmountInCart(form: NgForm, cartItem: CartItem): void{
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

    if (cartItem.id){
      this.cartService.removeCartItemById(cartItem.id);
    }

    window.location.reload();
  }

  toOrder(): void{
    // niet ingelogd? login or sign up dan naar orders
    if (!this.userService.isUserLoggedIn()){
      this.showModal = true;
    } else{
      this.continueOrder();
    }
  }

  onSwitchMode(): void{
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm): void{
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
        this.updateCartItems();
        this.continueOrder();
      });
    } else {
      // signup
      this.userService.register({username, password, roles: ['CUSTOMER']}, customer, false).then(() => {
        this.updateCartItems();
        this.continueOrder();
      });
    }
    form.reset();
  }

  updateCartItems(): void{
    const id = this.userService.getLoggedInUser()?.id;
    for (const item of this.cartItems){
      item.userId = id;
      this.cartService.updateCartItem(item).then(data => {
        this.cartItems = data;
      });
    }
  }

  async continueOrder(): Promise<void>{
    const createdOrder = await this.orderService.createOrder(this.cartItems);
    for (const item of this.cartItems) {
      if (item.id){
        this.cartService.removeCartItemById(item.id);
      }
    }
    this.cartItems = [];
    this.router.navigate(['/orders', createdOrder.id]);
  }

  closeModal(): void {
    this.showModal = false;
  }

  emptyCart(): void {
    for (const item of this.cartItems) {
      if (item.id){
        this.cartService.removeCartItemById(item.id);
      }
    }
    this.cartItems = [];
  }

  ngOnDestroy(): void {
    this.cartItems = [];
    this.cartService.resetCart();
  }
}
