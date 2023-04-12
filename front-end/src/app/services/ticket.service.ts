import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Ticket } from '../models/ticket';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    url = environment.backend_url + "tickets";

    constructor(private http: HttpClient) {
        this.http.get(this.url).pipe(tap(response => console.log(response)))
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
                return response
            }),
          catchError(err => throwError(() => {
            alert("Une erreur s'est produite");
            return err.message;
          }))
        );
    }
}
