import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService {

    constructor(private router: Router,
        private _isAuthenticated: AuthService) {
    }

    canActivate(): boolean {
        if (JSON.parse(localStorage.getItem('isAuthenticated') as string) == true) {
            return true;
        } else {
            this.router.navigateByUrl('/auth/login', {
                replaceUrl: true
            });
            return false;
        }
    }
}
