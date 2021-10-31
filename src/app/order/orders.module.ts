import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';
@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailComponent,
    OrderListComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ],
  exports: [
    OrdersComponent,
    OrderDetailComponent,
    OrderListComponent
  ]
})
export class OrdersModule { }
