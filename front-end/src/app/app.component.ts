import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/users.service";
import {User} from "./models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-end';
  authenticated = false;
  userInfo: User | undefined;

  constructor(public userService:UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.isAuthenticated().subscribe(value => {
      this.authenticated = value;
    });
    this.userService.currentUser.subscribe(user => {
      this.userInfo = user;
    });
  }

  async redirectTo(param: string) {
    await this.router.navigate([param]);
  }

  disconnect() {
    this.userService.disconnect();
  }
}
