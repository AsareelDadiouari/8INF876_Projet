import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {AuthRouting} from "./auth.routing"
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";


@NgModule({
  imports: [
    AuthRouting,
    ReactiveFormsModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  exports: [SignInComponent, SignUpComponent],
  providers: []
})
export class AuthModule{
}
