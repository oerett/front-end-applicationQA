
import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class SharedService {

    emailValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const valid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(control.value);
            return valid ? null : { 'invalidEmail': { value: control.value } };
        };
    }

}