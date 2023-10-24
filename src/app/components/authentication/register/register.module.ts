import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes = [
    {
        path: 'register',
        component: RegisterComponent,
    }
];

@NgModule({
    declarations: [RegisterComponent],
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
        MatSelectModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
    ],
    exports: []
})
export class RegisterModule { }
