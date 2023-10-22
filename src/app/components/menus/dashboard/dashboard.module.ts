import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { JobsModule } from '../jobs/jobs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



const routes: Routes = [
    {
        path: '**',
        component: DashboardComponent,
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        MatProgressBarModule,
        MatCardModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        JobsModule
    ],
    providers: [
    ]
})
export class DashboardModule {
}

