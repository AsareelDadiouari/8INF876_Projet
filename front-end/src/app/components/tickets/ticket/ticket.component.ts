import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/users.service';
import { Role, User } from "../../../models/user";
import { TicketService } from "../../../services/ticket.service";
import { Ticket } from "../../../models/ticket";
import { Router } from '@angular/router';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UpdateTicketPageComponent} from "../update-tickets/update-tickets.component";

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @Input()
  ticketId: number | undefined;
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
  constructor(private userService: UserService,
              private router: Router,
              private ticketService: TicketService,
              private modalService: NgbModal) { };

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.userRole = user?.role || Role.USER;
      if (user?.role.toString() === "ADMIN") {
        this.ticketSub = this.userService.getUserById(this.ticketUserId).subscribe((response: User) => {
          this.username = response.username;
        });
      }
    })
  }

  navigateToUpdateTicket(): void {
    this.router.navigate(['/update-ticket'], { state: { ticket: this.get() } })
      .then(r => console.log(r))
      .catch(err => console.error(err));
  }

  resolved(): void {
    this.ticketState = "resolved"
    this.ticketService.updateTicket(this.get()).subscribe(response => {
      console.log("Updated : ", response);
    });
  }

  pending(): void {
    this.ticketState = "pending"
    this.ticketService.updateTicket(this.get()).subscribe(response => {
      console.log("Updated : ", response);
    });
  }

  cancelled(): void {
    this.ticketState = "cancelled"
    this.ticketService.updateTicket(this.get()).subscribe(response => {
      console.log("Updated : ", response);
    });
  }

  async openModal(data: Ticket) {
    const modalRef = this.modalService.open(UpdateTicketPageComponent, { centered: true });
    modalRef.componentInstance.ticket = data;
  }

  public get() {
    return {
      id: this.ticketId,
      title: this.ticketTitle,
      state: this.ticketState,
      description: this.ticketDescription,
    } as Ticket
  }

  protected readonly Role = Role;
}
