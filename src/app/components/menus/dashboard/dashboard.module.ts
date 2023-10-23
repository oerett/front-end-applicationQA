import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobsModule } from '../jobs/jobs.module';
import { ProfileComponent } from '../jobs/job-seeker/profile/profile.component';
import { AuthGuardService } from 'src/app/services/auth-services/guard-services/auth-guard.service';

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                redirectTo: "/dashboard",
                pathMatch: "full",
            },
            {
                path: "",
                component: DashboardComponent
            },
            {
                path: "dashboard",
                children: [
                    {
                        path: "",
                        component: DashboardComponent
                    },
                    {
                        path: "job-seeker/profile",
                        component: ProfileComponent
                    },
                ],
                canActivate: [AuthGuardService],
            },
        ],
    },
];


@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        JobsModule,
        MatProgressBarModule,
        MatCardModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
    ]
})
export class DashboardModule {
}

