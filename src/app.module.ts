import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './app/services/auth-services/guard-services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { environment } from "./environments/environment";
import { DialogV2Component } from './app/shared/dialogs/dialog-v2/dialog-v2.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoginComponent } from './app/components/authentication/login/login.component';
import { getApps, initializeApp } from 'firebase/app';

const appRoutes: Routes = [
  {
    path: "auth",
    loadChildren: () => import('./app/components/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: "jobs",
    loadChildren: () => import('./app/components/menus/jobs/jobs.module').then(m => m.JobsModule),
    canActivate: [AuthGuardService],
  },
  { path: '', component: LoginComponent, canActivate: [AuthGuardService] },
];

export function initializeFirebaseApp(): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (getApps().length === 0) {
        initializeApp(environment.firebaseConfig);
        resolve(true);
      } else {
        console.log('Firebase is already initialized.');
        resolve(true);  // You probably want to resolve here too, since it's not a fatal error.
      }
    });
  }
}
@NgModule({
  declarations: [
    AppComponent,
    DialogV2Component,
  ],
  imports: [
    AngularFireModule,
    AngularFirestoreModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    // Angular Material modules
    MatDialogModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFirebaseApp,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

