import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/user/customer.model';
import { OrderItem } from '../order-item.model';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() orders!: Order[];
  @Input() orderDetails!: OrderItem[];
  @Input() customer!: Customer;
  @Input() route = '/orders';

  constructor(public router: Router) {}

  ngOnInit(): void {}

  getAmountOfProducts(orderId: number): number {
    const orderDetailsOfOrder: OrderItem[] = this.getOrderdetailsOfOrder(orderId);
    let result = 0;
    orderDetailsOfOrder.forEach(orderitem => {
      if (orderitem.amount){
        result += orderitem.amount;
      }
    });
    return result;
  }
  getOrderdetailsOfOrder(orderId: number): OrderItem[] {
    return this.orderDetails.filter(orderItem => orderItem.orderId === orderId);
  }
}
