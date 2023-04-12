import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProfilPageService {
    url = environment.backend_url + "users";

    constructor(private http: HttpClient) {
        this.http.get(this.url).pipe(tap(response => console.log(response)))
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
}
