import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { JobsModule } from '../jobs/jobs.module';



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
        JobsModule
    ],
    providers: [
    ]
})
export class DashboardModule {
}

