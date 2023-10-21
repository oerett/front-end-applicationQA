import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

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
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    exports: []
})
export class LoginModule { }
