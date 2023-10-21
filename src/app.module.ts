import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './app/services/auth-services/guard-services/auth-guard.service';
import { RegisterComponent } from './app/components/authentication/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from "./environments/environment";

const appRoutes: Routes = [
  {
    path: "auth",
    loadChildren: () => import('./app/components/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  { path: '', component: RegisterComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,  
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
