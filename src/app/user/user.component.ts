import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCustomerDataOfUser().then(data => {
      this.customer = data;
      this.isDataAvailable = true;
    });
  }

  updateCustomer(customer: Customer): void{
    this.customer = customer;
  }

}
