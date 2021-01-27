import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root'})
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(private productsService: ProductsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] {
    const products = this.productsService.getAllProducts();
    return products;
  }
}