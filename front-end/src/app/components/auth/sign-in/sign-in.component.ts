import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit($event: MouseEvent) {
    const login = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    } as User;

    this.authService.signIn(login).subscribe( {
      next : response => {

      },
      error : err => alert("error")
    });
  }

  toRegister($event: MouseEvent) {
    this.router.navigate(['auth/sign-up'])
      .then(r => console.log(r))
      .catch(err => console.error(err));
  }
}
