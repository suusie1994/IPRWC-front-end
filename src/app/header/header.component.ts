import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  collapsed = true;
  isAuthenticated: boolean = false;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.hasAuthorization();
  }

  ngOnChanges(): void {
    this.isAuthenticated = this.authService.hasAuthorization();
  }

  onLogout(): void {
    this.userService.logout();
  }

}
