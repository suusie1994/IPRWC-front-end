import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [];
  productsChanged = new Subject<Product[]>();

  constructor(private http: HttpClient) {
    this.getProductsFromServer();
  }

  getAllProducts(): Product[] {
    return this.products.slice();
  }

  getProductsFromServer(): Product[] {
    this.http.get<Product[]>('http://localhost:8080/api/products').subscribe(data => {
      this.products = data;
      this.productsChanged.next(this.products.slice());
    });
    return this.products.slice();
  }

  getProductById(id: number): Product {
    return this.products[id];
  }
}
