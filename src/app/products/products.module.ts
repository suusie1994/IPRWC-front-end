import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';



@NgModule({
  declarations: [ProductsComponent, ProductListComponent, ProductDetailComponent],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
