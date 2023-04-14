import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit{
  @Input() username: string = this.getUsername();
  @Input() password: string = this.getPassword();

  profilForm!: FormGroup;
  profilPageSub: Subscription = new Subscription();

  updateUsernameValue = false;
  updatePasswordValue = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.profilForm = this.formBuilder.group({
      newUsername: new FormControl("", [Validators.required]),
      passwordForNewUsername: new FormControl("", [Validators.required]),
      newPassord: new FormControl("", [Validators.required]),
      passwordForNewPassord: new FormControl("", [Validators.required]),
    });
  }

  onSubmit($event: MouseEvent) {
    let register = {};
    if (!this.profilForm.get('newUsername')?.value && !this.profilForm.get('newPassord')?.value) {

    } else if (!this.profilForm.get('newUsername')?.value) {
      console.log("No new username")
      register = {
        newPassord: this.profilForm.get('newPassord')?.value,
        password: this.profilForm.get('passwordForNewPassord')?.value,
      };
      console.log(register);
      this.updateUser(register)
    } else if (!this.profilForm.get('newPassord')?.value) {
      console.log("No new password");
      register = {
        newUsername: this.profilForm.get('newUsername')?.value,
        password: this.profilForm.get('passwordForNewUsername')?.value,
      };
      console.log(register);
      this.updateUser(register);
    } else {
      if (this.profilForm.get('passwordForNewPassord')?.value == this.profilForm.get('passwordForNewUsername')?.value) {
        register = {
          newPassord: this.profilForm.get('newPassord')?.value,
          newUsername: this.profilForm.get('newUsername')?.value,
          password: this.profilForm.get('passwordForNewPassord')?.value,
        };
        console.log(register);
        this.updateUser(register);
      }
      else {
        console.log("Mot de passe différent !");
      }
    }
  }

  getUsername(): string {
    const userString = localStorage.getItem("user");
    if (userString !== null) {
      const user = JSON.parse(userString);
      return user.username;
    } else {
      return "error";
    }
  }

  getPassword(): string {
    const userString = localStorage.getItem("user");
    if (userString !== null) {
      const user = JSON.parse(userString);
      return user.password;
    } else {
      return "error";
    }
  }

  getIdUser(): string {
    const userString = localStorage.getItem("user");
    if (userString !== null) {
      const user = JSON.parse(userString);
      return user.id;
    } else {
      return "error";
    }
  }

  updateUsername(): void {
    this.updateUsernameValue = !this.updateUsernameValue;
  }

  updatePassword(): void {
    this.updatePasswordValue = !this.updatePasswordValue;
  }

  updateUser(register: {}): void {
    this.profilPageSub = this.userService.updateUser(register, this.getIdUser()).subscribe(() => {
      this.refresh()
    });
  }

  refresh(): void {
    window.location.reload();
  }

  toMainPage($event: MouseEvent): void {
    this.router.navigate([''])
      .then(r => console.log(r))
      .catch(err => console.error(err));
  }
}
