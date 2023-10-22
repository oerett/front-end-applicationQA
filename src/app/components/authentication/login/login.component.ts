import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { SharedService } from 'src/app/shared/services/common-methods.service';
import { DialogService } from 'src/app/services/dialog/dialogs.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private _dialog: DialogService,
    private firestore: AngularFirestore
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, this.sharedService.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  loginUser(form: FormGroup) {
    form.invalid == true ? form.markAllAsTouched() : this.loginApicall(form);
  }

  async loginApicall(form: FormGroup) {
    const auth = getAuth();
    from(signInWithEmailAndPassword(auth, form.value['email'], form.value['password'])).pipe(switchMap(userCredential => {
      const user = userCredential.user;
      const userDocRef = this.firestore.collection('users').doc(user['uid']);
      return userDocRef.valueChanges().pipe(
        map(userData => ({ user, userData }))
      );
    })).subscribe({
      next: ({ user, userData }: any) => {
        let role = "";
        if (userData) {
          role = userData['role'];
        }
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("email", `${userData['email']}`);
        localStorage.setItem("username", `${userData['username']}`);
        this.router.navigate(["/dashboard"]);
        this.sharedService.saveUserInFirestore(user.uid, form.value['email'], role).then(() => {
          if (role == "js") localStorage.setItem("role", "js");
        }).catch(error => {
          this._dialog.openErrorDialogV2("Error", error, '', '');
        });
      },
      error: error => {
        if (error.code == "auth/invalid-login-credentials") {
          this._dialog.openErrorDialogV2("Error", "Invalid login credentials!", '', '');
        }
      }
    });
  }


  register() {
    this.router.navigate(["auth/register"]);
  }

  rememberMeEvent(ev: MatCheckboxChange) {
    console.log(ev.checked);
  }
}
