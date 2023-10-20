import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

const routes = [
    {
        path: 'login',
        component: LoginComponent,
    }
];

@NgModule({
    declarations: [LoginComponent],
    imports: [
        MatCardModule,
        RouterModule.forChild(routes),
    ],
    exports: []
})
export class LoginModule { }
