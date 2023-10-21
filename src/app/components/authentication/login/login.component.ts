import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { SharedService } from 'src/app/shared/services/common-methods.service';
import { DialogService } from 'src/app/services/dialog/dialogs.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
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
    console.log("INSIDE???")
  }

  loginUser(form: FormGroup) {
    form.invalid == true ? form.markAllAsTouched() : this.loginApicall(form);
  }

  async loginApicall(form: FormGroup) {
    // const auth = getAuth();
    // from(signInWithEmailAndPassword(auth, form.value['email'], form.value['password'])).pipe(switchMap(userCredential => {
    //   const user = userCredential.user;
    //   const userDocRef = this.firestore.collection('users').doc(user['uid']);
    //   return userDocRef.valueChanges().pipe(
    //     map(userData => ({ user, userData }))
    //   );
    // })).subscribe({
    //   next: ({ user, userData }: any) => {
    //     let role = "";
    //     if (userData) {
    //       role = userData['role'];
    //     }
    //     console.log(role, "ROLIIII");
    //     localStorage.setItem("isAuthenticated", "true");
    //     this.sharedService.saveUserInFirestore(user.uid, form.value['email'], role).then(() => {
    //       role == "js" ? this.router.navigate(["/jobs/job-seeker"]) : this.router.navigate(["/jobs/job-offer"]);
    //     }).catch(error => {
    //       this._dialog.openErrorDialogV2("Error", error, '', '');
    //     });
    //   },
    //   error: error => {
    //     if (error.code == "auth/invalid-login-credentials") {
    //       this._dialog.openErrorDialogV2("Error", "Invalid login credentials!", '', '');
    //     }
    //   }
    // });
  }


  register() {
    this.router.navigate(["auth/register"]);
  }

  rememberMeEvent(ev: MatCheckboxChange) {
    console.log(ev.checked);
  }
}
