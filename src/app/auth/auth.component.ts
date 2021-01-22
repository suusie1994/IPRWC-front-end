import {
  Component,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../user/customer.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;

  constructor(private userService: UserService){}

  onSwitchMode(): void{
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void{
    if (!form.valid){
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    const customer = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      emailAddress: form.value.emailAddress,
      address: form.value.address,
      zipcode: form.value.zipcode,
      city: form.value.city,
      phoneNumber: form.value.phoneNumber
    };

    this.isLoading = true;

    if (this.isLoginMode) {
      // login
      this.userService.login({username, password}, true);
      this.isLoading = false;
    } else {
      // signup
      this.userService.register({username, password, roles: ['CUSTOMER']}, customer);
      this.isLoading = false;
    }

    // gelukt? isloading false en navigeren naar/products of account
    // mislukt? show error en is loading naar false

    form.reset();
  }

}
