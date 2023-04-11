import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent {
  profilPageSub: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder,
    private router: Router) {
  }

  toMainPage($event: MouseEvent) {
    this.router.navigate(['']) //Il faudrat remplacer par la page principale !
      .then(r => console.log(r))
      .catch(err => console.error(err));
  }
}
