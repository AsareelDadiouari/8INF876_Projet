import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {AuthModule} from "./components/auth/auth.module";
import {AuthGuard} from "./auth.guard";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app.routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PagesModule} from "./components/pages/pages.module";
import {TicketsModule} from "./components/tickets/tickets.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    TicketsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
