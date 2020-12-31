import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [ProductsComponent, ProductListComponent],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
