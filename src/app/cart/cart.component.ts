import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private cartService: CartService,
              private productService: ProductsService) { }

  ngOnInit(): void {
    this.cartItems = [];
    this.cartService.getCartItems().then(data => {
      this.cartItems = data;
    });
  }

  getProductById(id: number): Product{
    return this.productService.getProductById(id);
  }

  ngOnDestroy(): void {
    this.cartItems = [];
    this.cartService.resetCart();
  }
}
