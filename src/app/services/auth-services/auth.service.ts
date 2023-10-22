import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private _isAuthenticated = new BehaviorSubject<boolean>(false);

    constructor(private afAuth: AngularFireAuth,
        private router: Router) {

    }

    get isAuthenticated() {
        return this._isAuthenticated.asObservable();
    }

    login() {
        // Logic for login
        this._isAuthenticated.next(true);
    }

    async logout() {
        try {
            localStorage.setItem("isAuthenticated", "false");
            this.router.navigate(["/auth/login"]);
            await this.afAuth.signOut();
            this._isAuthenticated.next(false);
            localStorage.clear();
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    }
}