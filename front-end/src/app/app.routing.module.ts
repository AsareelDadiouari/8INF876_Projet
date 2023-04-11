import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AddTicketPageComponent } from './components/add-tickets/add-tickets.component';
import { ProfilPageComponent } from './components/profil-page/profil-page.component';

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
    path: 'profil',
    component: ProfilPageComponent,
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
