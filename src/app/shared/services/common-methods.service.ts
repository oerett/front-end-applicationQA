
import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { doc, getFirestore, setDoc } from "firebase/firestore";

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

    async saveUserInFirestore(userId: string, email: string, role: string): Promise<void> {
        try {
            const db = getFirestore();
            const userData = {
                email: email,
                role: role
            };

            await setDoc(doc(db, 'users', userId), userData);
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

}