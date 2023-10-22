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

const routes: Routes = [
    {
        path: "",
        data: { breadcrumb: "Job seeker" },
        children: [
            {
                path: "",
                redirectTo: "/dashboard",
                pathMatch: "full",
            },
            {
                path: "",
                component: JobSeekerComponent,
                data: {
                    breadcrumb: "Job seeker",
                },
            },
            {
                path: "job-seeker",
                children: [
                    {
                        path: "",
                        component: JobSeekerComponent,
                        data: {
                            breadcrumb: null,
                        },
                    },
                    {
                        path: "profile",
                        component: ProfileComponent,
                        data: {
                            breadcrumb: "Profile",
                        },
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
                component: JobOfferComponent,
                data: {
                    breadcrumb: "Job offer",
                },
            },
            {
                path: "job-offer",
                children: [
                    {
                        path: "",
                        component: JobOfferComponent,
                        data: {
                            breadcrumb: null,
                        },
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
    ],
    exports: [JobSeekerComponent, JobOfferComponent],
    providers: [],
})
export class JobsModule { }
