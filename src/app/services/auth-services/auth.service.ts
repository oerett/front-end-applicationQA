import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private _isAuthenticated = new BehaviorSubject<boolean>(false);

    constructor(private dialog: MatDialog,
        private router: Router) {

    }

    get isAuthenticated() {
        return this._isAuthenticated.asObservable();
    }

    setAuth() {
        this._isAuthenticated.next(true);
    }

    logout() {
        this.dialog.closeAll();
        localStorage.setItem("isAuthenticated", 'false');
        this.clearStorage();
        this._isAuthenticated.next(false);
        this.router.navigateByUrl("/auth/login", {
            replaceUrl: true,
        });
    }

    clearStorage() {
        const keys = Object.keys(localStorage);
        for (const key of keys) {
            if (key !== 'rememberedEmail')
                localStorage.removeItem(key);
        }
    }
}