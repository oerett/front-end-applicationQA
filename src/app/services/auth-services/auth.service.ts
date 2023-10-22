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

    setAuth() {
        console.log("what the hell???")
        this._isAuthenticated.next(true);
    }

    logout() {
        console.log("what the hell??? 2222")
        localStorage.clear();
        this._isAuthenticated.next(false);
        this.router.navigateByUrl("/auth/login", {
            replaceUrl: true,
        });
    }


}