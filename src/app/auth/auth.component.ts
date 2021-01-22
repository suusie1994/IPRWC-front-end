import {
  Component,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;

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

    this.isLoading = true;

    if (this.isLoginMode) {
      // login
      this.userService.login({username, password}, true);
      this.isLoading = false;
    } else {
      // signup
      this.userService.register({username, password, roles: ['CUSTOMER']});
      this.isLoading = false;
    }

    // gelukt? isloading false en navigeren naar/products of account
    // mislukt? show error en is loading naar false

    form.reset();
  }

}
