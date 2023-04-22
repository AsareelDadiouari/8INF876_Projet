import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { Ticket } from 'src/app/models/ticket';
import { ActivatedRoute, Router } from "@angular/router";
import { TicketService } from 'src/app/services/ticket.service';
import { Subscription, of, switchMap } from "rxjs";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'update-ticket-page',
  standalone: true,
  templateUrl: './update-tickets.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./update-tickets.component.css']
})
export class UpdateTicketPageComponent implements OnInit {
  ticketForm!: FormGroup;
  ticketSub: Subscription = new Subscription();
  @Input()
  ticket?: Ticket;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private ticketService: TicketService,
              public activeModal: NgbActiveModal) {
    //this.ticket = this.router.getCurrentNavigation()?.extras.state;
    //console.log( "Ticket : ",this.ticket)
  }

  ngOnInit(): void {
    if (this.ticket) {
      this.ticketForm = this.formBuilder.group({
        title: new FormControl(this.ticket.title, [Validators.required]),
        description: new FormControl(this.ticket.description, [Validators.required]),
      });
    }
  }

  onSubmit($event: MouseEvent) {
    const register = {
      id: this.ticket?.id,
      title: this.ticketForm.get('title')?.value,
      description: this.ticketForm.get('description')?.value,
      state: this.ticket?.state,
    } as Ticket;

    console.log(register);

    this.ticketSub = this.ticketService.updateTicket(register).subscribe(async (response) => {
      await this.router.navigateByUrl('');
      this.activeModal.close();
    });
  }

  closeModal($event: MouseEvent) {
    this.activeModal.close();
  }
}
