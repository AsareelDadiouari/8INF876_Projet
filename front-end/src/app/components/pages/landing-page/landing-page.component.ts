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

  constructor(private ticketService: TicketService, public userService: UserService) {
  }

  ngOnInit(): void {
    this.ticketService.tickets$.subscribe(tickets => {
      this.tickets = tickets;
    })
  }
}
