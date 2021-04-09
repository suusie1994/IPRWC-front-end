import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListItemComponent } from './product-list/product-list-item/product-list-item.component';
import { ProductsResolversService } from './products-resolvers.service';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule
  ],
  providers: [
    ProductsResolversService
  ]
})
export class ProductsModule { }
