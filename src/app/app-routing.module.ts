import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'orders', loadChildren: () => import('./order/orders.module').then(m => m.OrdersModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: '**', redirectTo: '/products'} // TODO 404 page maken
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
