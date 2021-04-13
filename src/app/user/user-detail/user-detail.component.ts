import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../customer.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() currentCustomer!: Customer;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.currentCustomer);
  }

  updateUser(form: NgForm): void {
    console.log(form.value);
    const updatedCustomer = new Customer(
      this.currentCustomer.id,
      form.value.firstname,
      form.value.lastname,
      form.value.emailAddress,
      form.value.address,
      form.value.zipcode,
      form.value.city,
      form.value.phoneNumber);
    this.userService.updateCustomerDataOfUser(updatedCustomer);
  }

}
