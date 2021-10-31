import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { OrderDetailComponent } from '../order/order-detail/order-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'orders', pathMatch: 'full' },
      { path: ':id', component: UserDetailComponent },
      { path: ':id/edit', component: UserEditComponent },
      { path: 'orders/:id', component: OrderDetailComponent },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class UserRoutingModule {}
