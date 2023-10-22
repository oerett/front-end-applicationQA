import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "src/app/services/auth-services/guard-services/auth-guard.service";
import { NgModule } from "@angular/core";
import { JobOfferComponent } from "./job-offer/job-offer.component";
import { JobSeekerComponent } from "./job-seeker/job-seeker.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JobFilterPipe } from "src/app/shared/pipes/jobs-filter.pipe";
import { ProfileComponent } from './job-seeker/profile/profile.component';
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { FlexLayoutModule } from "@angular/flex-layout";

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
                component: JobSeekerComponent
            },
            {
                path: "job-seeker",
                children: [
                    {
                        path: "",
                        component: JobSeekerComponent
                    },
                    {
                        path: "profile",
                        component: ProfileComponent
                    },
                ],
                canActivate: [AuthGuardService],
            },
        ],
    },
    {
        path: "",
        data: { breadcrumb: "Job offer" },
        children: [
            {
                path: "",
                redirectTo: "/dashboard",
                pathMatch: "full",
            },
            {
                path: "",
                component: JobOfferComponent
            },
            {
                path: "job-offer",
                children: [
                    {
                        path: "",
                        component: JobOfferComponent
                    },
                ],
                canActivate: [AuthGuardService],
            },
        ],
    },
];

@NgModule({
    declarations: [
        JobOfferComponent,
        JobSeekerComponent,
        JobFilterPipe,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatIconModule,
        MatExpansionModule,
        MatInputModule,
        FlexLayoutModule
    ],
    exports: [JobSeekerComponent, JobOfferComponent],
    providers: [],
})
export class JobsModule { }
