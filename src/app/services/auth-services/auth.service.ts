import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AuthService {


    login() {
        // return this.http.post(`${environment.url}Auth/login`, user, {
        //     observe: "response",
        //     headers: new HttpHeaders({ "Content-Type": "application/json" }),
        // });
    }

    checkCode() {
        // return this.http.post(`${environment.url}Auth/checkcode`, code, {
        //     headers: new HttpHeaders({ "Content-Type": "application/json" }),
        // });
    }

    logout() {
        // this.fbLocalstorageClear();
        // this.authenticationState.next(false);
        // this.codeAuthenticationState.next(false);
        // this.router.navigateByUrl("/auth/login", {
        //     replaceUrl: true,
        // });
    }

    isCodeAuthenticated(){
        
    }

}