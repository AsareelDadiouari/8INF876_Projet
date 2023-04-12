import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Ticket } from 'src/app/models/ticket';
import { Router } from "@angular/router";
import { TicketService } from 'src/app/services/ticket.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-ticket-page',
  templateUrl: './add-tickets.component.html',
  styleUrls: ['./add-tickets.component.css']
})
export class AddTicketPageComponent implements OnInit {
  ticketForm!: FormGroup;
  ticketSub: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      idUser: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
    });

    this.ticketForm.controls['state'].setValue("PENDING", { onlySelf: true });
    this.ticketForm.controls['idUser'].setValue(this.getIdUser(), { onlySelf: true });
  }

  onSubmit($event: MouseEvent) {
    const register = {
      idUser: this.ticketForm.get('idUser')?.value,
      title: this.ticketForm.get('title')?.value,
      description: this.ticketForm.get('description')?.value,
      state: this.ticketForm.get('state')?.value,
    } as Ticket;
    console.log(register)
    this.ticketSub = this.ticketService.createTicket(register).subscribe(response => {
      this.router.navigateByUrl(''); //Il faudrat remplacer par la page principale !
    });
  }

  toMainPage($event: MouseEvent) {
    this.router.navigate(['']) //Il faudrat remplacer par la page principale !
      .then(r => console.log(r))
      .catch(err => console.error(err));
  }

  getIdUser() {
    const userString = localStorage.getItem("user");
    if (userString !== null) {
      const user = JSON.parse(userString);
      return user.id
    } else {
      return "error"
    }
  }

}
