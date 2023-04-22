import {NgModule} from "@angular/core";
import {AuthRouting} from "../auth/auth.routing";
import {ReactiveFormsModule} from "@angular/forms";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {ProfilPageComponent} from "./profil-page/profil-page.component";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {TicketsModule} from "../tickets/tickets.module";

@NgModule({
    imports: [
        AuthRouting,
        ReactiveFormsModule,
        NgForOf,
        TicketsModule,
        NgIf,
        SlicePipe
    ],
  declarations: [
    LandingPageComponent,
    ProfilPageComponent
  ],
  exports: [LandingPageComponent, ProfilPageComponent],
  providers: []
})
export class PagesModule{}
