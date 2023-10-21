import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { SharedService } from 'src/app/shared/services/common-methods.service';
import { from } from 'rxjs';
import { DialogService } from 'src/app/services/dialog/dialogs.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registerForm: FormGroup;
  roles$: any = [{ code: "js", description: "Jobseeker" }, { code: "jo", description: "Joboffer" }];

  constructor(
    private _formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private _dialog: DialogService,
  ) {
    this.registerForm = this._formBuilder.group({
      role: ['', Validators.required],
      email: ['', [Validators.required, this.sharedService.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  async registerUser(form: FormGroup) {
    // console.log(initializeApp(environment.firebaseConfig), "firebaseConfig");
    const auth = getAuth();
    from(createUserWithEmailAndPassword(auth, form.value['email'], form.value['password'])).subscribe({
      next: userCredential => {
        const user = userCredential.user;
        this.sharedService.saveUserInFirestore(user.uid, form.value['email'], form.value['role'].code).then(() => {
          this._dialog.openSuccessDialogV2("Success", `User with role `, `${form.value.role['description']}`, `is saved successfully!`);
        }).catch(error => {
          this._dialog.openErrorDialogV2("Error", error, '', '');
        });
      },
      error: error => {
        if (error.code == "auth/email-already-in-use")
          this._dialog.openErrorDialogV2("Error", "Email is already in use!", '', '');
      }
    });
  }

  goToLogin() {
    this.router.navigate(["auth/login"]);
  }
}
