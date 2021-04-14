import { Component, OnInit } from '@angular/core';
import { Order } from '../order/order.model';
import { OrdersService } from '../order/orders.service';
import { Customer } from './customer.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  customer: Customer = {};
  showUserInfo = true;
  isDataAvailable = false;
  orders: Order[] = [];

  constructor(private userService: UserService,
              private orderService: OrdersService) { }

  ngOnInit(): void {
    this.userService.getCustomerDataOfUser().then(data => {
      this.customer = data;
      this.isDataAvailable = true;
    });
    this.orderService.getOrders().then(data => {
      this.orders = data;
      this.isDataAvailable = true;
    });
  }

  updateCustomer(customer: Customer): void{
    this.customer = customer;
  }

}
