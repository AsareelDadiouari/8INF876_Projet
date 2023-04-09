import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/user";
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = environment.backend_url + "users";

  constructor(private http: HttpClient) { }

  public signIn(credentials: User): Observable<unknown>{
    return this.http.post(this.url + "login", credentials).pipe(
      tap((response) => {

      })
    );
  }

  public signUp(credentials: User): Observable<User>{
    const credentialsAlt : {id?: string, login: string, password:string, role: string} = {
      role: credentials.role.toString(),
      login: credentials.username,
      password : credentials.password
    }

    return this.http.post<User>(this.url , credentialsAlt).pipe(
      map((response: any) => response.map((value: any) => {
        return {
          id : value.id,
          role: value.role,
          username: value.login,
          password: value.password
        } as User
      })),
      tap((response) => {
        alert("Utilisateur creer");
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response));
      })
    );
  }
}
