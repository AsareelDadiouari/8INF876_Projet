import {Component, OnInit} from '@angular/core';
import {TicketService} from "../../../services/ticket.service";
import {Ticket} from "../../../models/ticket";
import {UserService} from "../../../services/users.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  tickets: Array<Ticket> = [];

  role: string = ""
  constructor(private ticketService: TicketService, public userService: UserService) {
  }

  ngOnInit(): void {
    this.ticketService.tickets$.asObservable().subscribe(tickets => {
      this.tickets = tickets;
    })
    this.role = this.getRole()
  }

  getRole(): string {
    const userString = localStorage.getItem("user");
    if (userString !== null) {
      const user = JSON.parse(userString);
      return user.role;
    } else {
      return "unknown";
    }
  }

}
