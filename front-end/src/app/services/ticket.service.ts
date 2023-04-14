import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import { Ticket } from '../models/ticket';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    url = environment.backend_url + "tickets";
    public tickets$ : BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>([]);

    constructor(private http: HttpClient) {
      this.getAllTicket().subscribe(tickets => {
        this.tickets$.next(tickets);
      })
    }


    public createTicket(credentials: Ticket): Observable<Ticket> {
        return this.http.post<Ticket>(this.url, credentials).pipe(
            tap((response) => {
                alert("Ticket created");
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
          this.tickets$.next(this.tickets$.value.map(ticket => this.tickets$.value.find(o => o.id === ticket.id) || ticket))
        })
      );
    }
}
