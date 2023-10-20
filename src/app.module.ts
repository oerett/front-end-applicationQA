import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './app/components/authentication/login/login.component';
import { RegisterComponent } from './app/components/authentication/register/register.component';
import { JobSeekerComponent } from './app/components/menus/job-seeker/job-seeker.component';
import { JobOfferComponent } from './app/components/menus/job-offer/job-offer.component';


const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import('./app/components/authentication/login/login.module').then(m => m.LoginModule)
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    JobSeekerComponent,
    JobOfferComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
