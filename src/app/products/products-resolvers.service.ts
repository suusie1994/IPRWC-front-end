import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root'})
export class ProductsResolversService implements Resolve<Product[]> {
  constructor(private productsService: ProductsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] {
    const products = this.productsService.getAllProducts();
    if (products.length === 0) {
      return this.productsService.getProductsFromServer();
    } else {
      return products;
    }
  }
}
