import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { AddTicketPageComponent } from './components/tickets/add-tickets/add-tickets.component';
import { ProfilPageComponent } from './components/pages/profil-page/profil-page.component';
import {TicketComponent} from "./components/tickets/ticket/ticket.component";
import { UpdateTicketPageComponent } from './components/tickets/update-tickets/update-tickets.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import(`./components/auth/auth.module`)
      .then( module => module.AuthModule)
  },
  {
    path: 'add-ticket',
    component: AddTicketPageComponent,
  },
  {
    path: 'update-ticket',
    component: UpdateTicketPageComponent,
  },
  {
    path: 'profil',
    component: ProfilPageComponent,
  },
  {
    path: 'ticket',
    component: TicketComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
