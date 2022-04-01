import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListItemComponent } from './product-list/product-list-item/product-list-item.component';
import { ProductsResolversService } from './products-resolvers.service';
import { SharedModule } from '../shared/shared.module';


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
    ProductRoutingModule,
    SharedModule
  ],
  providers: [
    ProductsResolversService
  ],
  exports: [
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductListItemComponent
  ]
})
export class ProductsModule { }
