import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { SharedService } from 'src/app/shared/services/common-methods.service';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';
import { DialogService } from 'src/app/services/dialog/dialogs.service';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
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
    console.log(initializeApp(environment.firebaseConfig), "firebaseConfig");
    const auth = getAuth();
    from(signInWithEmailAndPassword(auth, form.value['email'], form.value['password'])).subscribe({
      next: userCredential => {
        const user = userCredential.user;
        this.sharedService.saveUserInFirestore(user.uid, form.value['email'], form.value['role'].code).then((res) => {
          console.log(res, "RESI")
          //  this.router.navigate([""])
        }).catch(error => {
          this._dialog.openErrorDialogV2("Error", error, '', '');
        });
      },
      error: error => {
        console.log(error.code, "errorcodee")
        if (error.code == "auth/email-already-in-use")
          this._dialog.openErrorDialogV2("Error", "Email is already in use!", '', '');
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
