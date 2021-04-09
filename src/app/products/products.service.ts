import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../shared/api.service';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [];
  productsChanged = new Subject<Product[]>();

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.getProductsFromServer();
  }

  getAllProducts(): Product[] {
    if (this.products.length === 0){
      this.getProductsFromServer();
    }
    return this.products.slice();
  }

  getProductsFromServer(): Product[] {
    this.http.get<Product[]>('http://localhost:8080/api/products').subscribe(data => {
      this.products = data;
      this.products.sort((a: Product, b: Product) => a.id - b.id);
      this.productsChanged.next(this.products.slice());
    });
    return this.products.slice();
  }

  getProductById(id: number): Product {
    return this.products[id];
  }

  updateProduct(product: Product): void {
    const headers = this.apiService.createRequestHeaders();
    this.http.post<Product>('http://localhost:8080/api/products/update', product, { headers })
    .subscribe(data => {
      this.productsChanged.next(this.products.slice());
    });
  }
}
