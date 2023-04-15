import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import {BehaviorSubject, catchError, filter, map, Observable, switchMap, tap, throwError} from "rxjs";
import { Ticket } from '../models/ticket';
import {UserService} from "./users.service";

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    url = environment.backend_url + "tickets";
    public tickets$ : BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>([]);

    constructor(private http: HttpClient, private userService: UserService) {
      this.userService.authenticated.subscribe(_ => {
        this.getAllTicket()
          .pipe(
            map(tickets => {
              if (this.userService.currentUser?.value?.role === "USER")
                tickets = tickets.filter(ticket => ticket.idUser === this.userService.currentUser.value?.id)

              return tickets;
            })
          )
          .subscribe(tickets => {
            this.tickets$.next(tickets);
          })
      });
    }


    public createTicket(credentials: Ticket): Observable<Ticket> {
        return this.http.post<Ticket>(this.url, credentials).pipe(
            tap((response) => {
                alert("Ticket created");
                this.tickets$.next(this.tickets$.value.concat(response));
            }),
          catchError(err => throwError(() => {
            alert("Une erreur s'est produite");
            return err.message;
          }))
        );
    }

    public getAllTicket(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(this.url).pipe(
            tap((response) => {
            }),
          catchError(err => throwError(() => {
            alert("Une erreur s'est produite");
            return err.message;
          }))
        );
    }

    updateTicket(ticket: Ticket): Observable<Ticket>{
      return this.http.put<Ticket>(this.url + '/' + ticket.id, ticket).pipe(
        tap(response => {
          //this.tickets$.next(this.tickets$.value.map(ticket => this.tickets$.value.find(o => o.id === ticket.id) || ticket))
          const updatedTickets = this.tickets$.value.map((t: Ticket) => t.id === ticket.id ? response : t);
          this.tickets$.next(updatedTickets);
        })
      );
    }
}
