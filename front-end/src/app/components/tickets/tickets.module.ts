import {NgModule} from "@angular/core";
import {AuthRouting} from "../auth/auth.routing";
import {ReactiveFormsModule} from "@angular/forms";
import {AddTicketPageComponent} from "./add-tickets/add-tickets.component";
import {TicketComponent} from "./ticket/ticket.component";
import {AsyncPipe, NgIf} from "@angular/common";

@NgModule({
  imports: [
    AuthRouting,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ],
  declarations: [
    AddTicketPageComponent,
    TicketComponent
  ],
  exports: [AddTicketPageComponent, TicketComponent],
  providers: []
})
export class TicketsModule{
}
