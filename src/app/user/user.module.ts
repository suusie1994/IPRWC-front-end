import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from '../order/orders.component';
import { OrdersModule } from '../order/orders.module';


@NgModule({
  declarations: [
    UserComponent,
    UserEditComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    OrdersModule
  ]
})
export class UserModule { }
