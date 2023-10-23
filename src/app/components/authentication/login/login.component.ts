import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/common-methods.service';
import { DialogService } from 'src/app/services/dialog/dialogs.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { debounceTime } from 'rxjs';
import { AuthService } from 'src/app/services/auth-services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  rememberMe: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private _dialog: DialogService,
    private _isAuthenticated: AuthService,
    private spinner: NgxSpinnerService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, this.sharedService.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false, [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.loginForm.controls['email'].setValue(rememberedEmail);
      this.loginForm.controls['rememberMe'].setValue(true);
      this.rememberMe = true;
    }

    this.loginForm.controls['email'].valueChanges.pipe(debounceTime(300)).subscribe(newEmail => {
      if (this.loginForm.controls['rememberMe'].value == true) {
        localStorage.setItem('rememberedEmail', newEmail);
      }
    });
  }

  loginUser(form: FormGroup) {
    form.invalid == true ? form.markAllAsTouched() : this.loginApicall(form);
  }

  async loginApicall(form: FormGroup) {
    try {
      const userData = await this.afAuth.signInWithEmailAndPassword(form.value.email, form.value.password);
      const user = userData.user;
      this._isAuthenticated.setAuth();
      localStorage.setItem("isAuthenticated", 'true');
      if (user && !user.emailVerified) {
        await user.sendEmailVerification();
        this._dialog.openSuccessDialogV2("Success", "Verifying link sent successfully", '', '');
      }
      this.router.navigate(["/dashboard"]);
      return true;
    } catch (e: any) {
      this._isAuthenticated.logout();
      localStorage.setItem("isAuthenticated", 'false');
      if (e.code == "auth/invalid-login-credentials") {
        this.spinner.hide();
        this._dialog.openErrorDialogV2("Error", "Invalid login credentials!", '', '');
      }
      return false;
    }
  }

  register() {
    this.router.navigate(["auth/register"]);
  }

  rememberMeEvent(ev: MatCheckboxChange) {
    if (ev.checked) {
      // Save the email to localStorage.
      localStorage.setItem('rememberedEmail', this.loginForm.value.email);
    } else {
      // Remove the email from localStorage.
      localStorage.removeItem('rememberedEmail');
    }
  }

}
