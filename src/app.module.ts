import { NgModule } from '@angular/core';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
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
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarModule } from './app/layout/components/toolbar/toolbar.module';
import { DashboardComponent } from './app/components/menus/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { favoriteJobReducer } from './app/components/menus/jobs/job-seeker/favorite-job.reducer';

firebase.initializeApp(environment.firebaseConfig);

const appRoutes: Routes = [
  {
    path: "auth",
    loadChildren: () => import('./app/components/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: "dashboard",
    loadChildren: () => import('./app/components/menus/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "jobs",
    loadChildren: () => import('./app/components/menus/jobs/jobs.module').then(m => m.JobsModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
  // { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
];

export function initializeFirebaseApp(): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (getApps().length === 0) {
        initializeApp(environment.firebaseConfig);
        resolve(true);
      } else {
        resolve(true);
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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule,
    StoreModule.forRoot({ favoriteJobs: favoriteJobReducer }),
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
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
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    ToolbarModule
  ],
  providers: [
    AngularFirestoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

