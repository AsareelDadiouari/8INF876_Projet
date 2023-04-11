import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AddTicketPageComponent } from './components/add-tickets/add-tickets.component';
import {AuthModule} from "./components/auth/auth.module";
import {AuthGuard} from "./auth.guard";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app.routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilPageComponent } from './components/profil-page/profil-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AddTicketPageComponent,
    ProfilPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
