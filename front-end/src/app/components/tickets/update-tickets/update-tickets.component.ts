import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Ticket } from 'src/app/models/ticket';
import { ActivatedRoute, Router } from "@angular/router";
import { TicketService } from 'src/app/services/ticket.service';
import { Subscription, of, switchMap } from "rxjs";

@Component({
  selector: 'update-ticket-page',
  templateUrl: './update-tickets.component.html',
  styleUrls: ['./update-tickets.component.css']
})
export class UpdateTicketPageComponent implements OnInit {
  ticketForm!: FormGroup;
  ticketSub: Subscription = new Subscription();

  ticket: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private ticketService: TicketService) {
    this.ticket = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    if (this.ticket) { 
      this.ticketForm = this.formBuilder.group({
        title: new FormControl(this.ticket.ticket.title, [Validators.required]),
        description: new FormControl(this.ticket.ticket.description, [Validators.required]),
      });
    }
  }

  onSubmit($event: MouseEvent) {
    const register = {
      id: this.ticket.ticket.id,
      title: this.ticketForm.get('title')?.value,
      description: this.ticketForm.get('description')?.value,
      state: this.ticket.ticket.state,
    } as Ticket;
    console.log(register)
    this.ticketSub = this.ticketService.updateTicket(register).subscribe(response => {
      this.router.navigateByUrl('');
    });
  }

  toMainPage($event: MouseEvent) {
    this.router.navigate([''])
      .then(r => console.log(r))
      .catch(err => console.error(err));
  }
}
