import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parmas => {
      this.productId = +parmas.id;
    });
    this.product = this.productsService.getProductById(this.productId);
  }

  productToCard(form: NgForm): void{
    const value = form.value;
    this.cartService.addProductToCart(this.productId, value.amountToCart);
    const updatedProduct = this.product;
    if (this.product.amount) {
      updatedProduct.amount = this.product.amount - value.amountToCart;
    }
    this.productsService.updateProduct(updatedProduct);
    this.router.navigate(['/cart']);
  }
}
