import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { catchError, map, Observable, tap, throwError } from "rxjs";
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
        const credentialsAlt: { idUser: string, title: string, description: string, state: string } = {
            idUser: credentials.idUser,
            title: credentials.title,
            description: credentials.description,
            state: credentials.state.toString(),
        }

        return this.http.post<Ticket>(this.url, credentialsAlt).pipe(
            map((response: any) => {
                console.log(response)
                return {
                    id: response.id,
                    idUser: response.idUser,
                    title: response.title,
                    description: response.description,
                    state: response.state
                } as Ticket
            }),
            tap((response) => {
                alert("Ticket created");
            }),
            catchError(err => new Observable<Ticket>().pipe(tap(_ => {
                alert(err.message);
            })))
        );
    }
}