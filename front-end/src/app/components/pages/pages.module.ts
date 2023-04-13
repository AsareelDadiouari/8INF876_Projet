import {NgModule} from "@angular/core";
import {AuthRouting} from "../auth/auth.routing";
import {ReactiveFormsModule} from "@angular/forms";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {ProfilPageComponent} from "./profil-page/profil-page.component";

@NgModule({
  imports: [
    AuthRouting,
    ReactiveFormsModule
  ],
  declarations: [
    LandingPageComponent,
    ProfilPageComponent
  ],
  exports: [LandingPageComponent, ProfilPageComponent],
  providers: []
})
export class PagesModule{}
