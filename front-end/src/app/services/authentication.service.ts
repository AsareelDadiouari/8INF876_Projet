import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {User} from "../models/user";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {UserService} from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = environment.backend_url + "users";

  constructor(private http: HttpClient, private userService: UserService) {
    this.http.get(this.url).pipe(tap(response => console.log(response)))
  }

  public signIn(credentials: User): Observable<unknown>{
    return this.http.post(this.url + "/login", credentials).pipe(
      tap((response) => {
        if (response === null){
          alert("Une erreur s'est produite");
          throw new Error("Le serveur renvoie Null durant l'authentification");
        } else {
          alert("Connected")
          localStorage.setItem("user", JSON.stringify(response));
          this.userService.authenticated.next(localStorage.getItem('user') !== null);
        }
      })
    );
  }

  public signUp(credentials: User): Observable<User>{
    return this.http.post<User>(this.url, credentials).pipe(
      tap((response) => {
        alert("Utilisateur creer");
      }),
      catchError(err => throwError(() => {
        alert("Une erreur s'est produite");
        return err.message;
      }))
    );
  }
}
