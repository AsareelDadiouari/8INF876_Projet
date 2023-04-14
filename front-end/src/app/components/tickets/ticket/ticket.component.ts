import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from 'src/app/services/users.service';
import {Role, User} from "../../../models/user";

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{
  @Input()
  ticketId: number | string = 1;
  @Input()
  ticketTitle: string = "Ceci est le titre de mon ticket";
  @Input()
  ticketDescription: string = "Ceci est la superbe description de mon ticket";
  @Input()
  ticketState: string = "cancelled";
  @Input()
  ticketUserId: string = "1a960343-d0ec-4f47-a12c-9046f8bde423";
  @Input()
  userRole: Role | string | undefined = Role.USER;

  username: string = "CocoBiturbo";

  ticketSub: Subscription = new Subscription();
  constructor(private userService: UserService) { };

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.userRole = user?.role || Role.USER;
      if (user?.role.toString() === "ADMIN"){
        this.ticketSub = this.userService.getUserById(this.ticketUserId).subscribe((response: User) => {
          this.username = response.username;
        });
      }
    })

  }

  resolved(): void {
    this.ticketState = "resolved"
  }

  pending(): void {
    this.ticketState = "pending"
  }

  cancelled(): void {
    this.ticketState = "cancelled"
  }

  protected readonly Role = Role;
}
