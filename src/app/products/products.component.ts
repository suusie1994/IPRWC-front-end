import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  subscription!: Subscription;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.subscription = this.productsService.productsChanged
    .subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.products = this.productsService.getAllProducts();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
