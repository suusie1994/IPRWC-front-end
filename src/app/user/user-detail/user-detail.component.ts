import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() updateCustomerData = new EventEmitter<Customer>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  updateCustomer(form: NgForm): void {
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
    this.updateCustomerData.next(updatedCustomer);
  }

}
