import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../../models/user";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),
    });
  }

  onSubmit($event: MouseEvent) {
    const register = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      role: this.registerForm.get('role')?.value,
    } as User;

    this.authService.signUp(register).subscribe( {
      next : response => {

      },
        error : err => alert("error")
    });
  }

  toLogin($event: MouseEvent) {
    this.router.navigate(['auth/sign-in'])
      .then(r => console.log(r))
      .catch(err => console.error(err));
  }
}
