import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {User} from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    url = environment.backend_url + "users";
    authenticated : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem('user') !== null);
    currentUser: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

    constructor(private http: HttpClient) {
        this.http.get(this.url).pipe(tap(response => console.log(response)))
        this.authenticated.subscribe(response => {
          if (response)
            this.currentUser.next(JSON.parse(localStorage.getItem('user') || '{}'));
          else
            this.currentUser.next(undefined);
        })
    }


    public updateUser(credentials: {}, idUser: string) {
        return this.http.put(this.url + "/" + idUser, credentials).pipe(
            tap((response) => {
                localStorage.setItem("user", JSON.stringify(response));
            }),
          catchError(err => throwError(() => {
            alert("Une erreur s'est produite");
            return err.message;
          }))
        );
    }

    public getUserById(idUser: string): Observable<User> {
        return this.http.get<User>(this.url + "/" + idUser).pipe(
            tap((response:User) => {

            }),
          catchError(err => throwError(() => {
            alert("Une erreur s'est produite");
            return err.message;
          }))
        );
    }

    isAuthenticated() {
      console.log( )
      return this.authenticated;
    }

    disconnect() {
      localStorage.removeItem("user");
      this.authenticated.next(localStorage.getItem('user') !== null)
    }
}
