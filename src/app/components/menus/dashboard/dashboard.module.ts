import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobsModule } from '../jobs/jobs.module';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
    }
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

