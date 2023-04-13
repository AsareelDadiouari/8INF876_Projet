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
  userInfo: User | null =  JSON.parse(localStorage.getItem('user') || '{}');
  authenticated = false;

  constructor(public userService:UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.isAuthenticated().subscribe(value => this.authenticated = value);
  }

  redirectTo(param: string) {
    this.router.navigate([param])
      .then(r => console.log(r))
      .catch(err => console.error(err));
  }

  disconnect() {
    this.userService.disconnect();
  }
}
