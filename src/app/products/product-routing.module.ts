import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsResolversService } from './products-resolvers.service';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  {
    path: ':id',
    component: ProductDetailComponent,
    resolve: { products: ProductsResolversService }
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ProductRoutingModule { }
