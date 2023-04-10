import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {User} from "../models/user";
import {catchError, map, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = environment.backend_url + "users";

  constructor(private http: HttpClient) {
    this.http.get(this.url).pipe(tap(response => console.log(response)))
  }

  public signIn(credentials: User): Observable<unknown>{
    return this.http.post(this.url + "login", credentials).pipe(
      tap((response) => {
        console.log("Connected")
        localStorage.setItem("user", JSON.stringify(response));
      })
    );
  }

  public signUp(credentials: User): Observable<User>{
    const credentialsAlt : {id?: string, login: string, password:string, role: string} = {
      role: credentials.role.toString(),
      login: credentials.username,
      password : credentials.password,
    }

    return this.http.post<User>(this.url, credentialsAlt).pipe(
      map((response: any) => {
        console.log(response)
        return {
          id : response.id,
          role: response.role,
          username: response.login,
          password: response.password
        } as User
      }),
      tap((response) => {
        alert("Utilisateur creer");
      }),
      catchError(err => new Observable<User>().pipe(tap(_ => {
        alert(err.message);
      })))
    );
  }
}
