import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "src/app/services/auth-services/guard-services/auth-guard.service";
import { NgModule } from "@angular/core";
import { JobOfferComponent } from "./job-offer/job-offer.component";
import { JobSeekerComponent } from "./job-seeker/job-seeker.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JobFilterPipe } from "src/app/shared/pipes/jobs-filter.pipe";
import { ProfileComponent } from './job-seeker/profile/profile.component';

const routes: Routes = [
    {
        path: "",
        data: { breadcrumb: "Job seeker" },
        children: [
            //     {
            //         path: "",
            //         redirectTo: "/dashboard",
            //         pathMatch: "full",
            //     },
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
                    // {
                    //     path: "detail",
                    //     component: CardsDetailsComponent,
                    //     data: {
                    //         breadcrumb: "Detaje",
                    //     },
                    // },
                    // {
                    //     path: "modify",
                    //     component: MasterdataModifyComponent,
                    //     data: {
                    //         breadcrumb: "Modifiko",
                    //     },
                    // },
                    // {
                    //     path: "add",
                    //     component: MasterdataModifyComponent,
                    //     data: {
                    //         breadcrumb: "Shto",
                    //     },
                    // },
                ],
                canActivate: [AuthGuardService],
            },
        ],
    },
    {
        path: "",
        data: { breadcrumb: "Job offer" },
        children: [
            //     {
            //         path: "",
            //         redirectTo: "/dashboard",
            //         pathMatch: "full",
            //     },
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
                    // {
                    //     path: "detail",
                    //     component: CardsDetailsComponent,
                    //     data: {
                    //         breadcrumb: "Detaje",
                    //     },
                    // },
                    // {
                    //     path: "modify",
                    //     component: MasterdataModifyComponent,
                    //     data: {
                    //         breadcrumb: "Modifiko",
                    //     },
                    // },
                    // {
                    //     path: "add",
                    //     component: MasterdataModifyComponent,
                    //     data: {
                    //         breadcrumb: "Shto",
                    //     },
                    // },
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
        ProfileComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    exports: [JobSeekerComponent, JobOfferComponent],
    providers: [],
})
export class JobsModule { }
