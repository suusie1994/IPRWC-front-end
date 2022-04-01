import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  collapsed = true;
  isAuthenticated = false;
  roles: string[] = [];

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.hasAuthorization();
    this.roles = this.userService.getRoles();
  }

  ngDoCheck(): void {
    this.isAuthenticated = this.authService.hasAuthorization();
    this.roles = this.userService.getRoles();
  }

  onLogout(): void {
    this.userService.logout();
  }

}
