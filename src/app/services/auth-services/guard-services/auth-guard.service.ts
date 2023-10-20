import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService {

    constructor(private router: Router) {
        console.log("therritet ky??")
    }

    canActivate() {
        let authenticated: boolean = false;
        let storedValue = localStorage.getItem('isAuthenticated');
        if (storedValue !== null) {
            authenticated = JSON.parse(storedValue);
            return true;
        } else {
            console.log("jemi ne navigim??  ")
            return this.router.navigate(['/auth/login']);
        }
    }
}
