import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { SharedService } from 'src/app/shared/services/common-methods.service';
import { DialogService } from 'src/app/services/dialog/dialogs.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registerForm: FormGroup;
  roles$: any = [{ code: "js", description: "Jobseeker" }, { code: "jo", description: "Joboffer" }];
  isDataLoading: boolean = false;

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

  registerUser(form: FormGroup) {
    this.isDataLoading = true;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.value['email'], form.value['password']).then(userCredential => {
      const user = userCredential.user;
      return this.sharedService.saveUserInFirestore(user.uid, form.value['email'], form.value['role'].code);
    }).then(() => {
      this.isDataLoading = false;
      this._dialog.openSuccessDialogV2("Success", `User ${form.value.email} with role ${form.value.role['description']} is saved successfully!`, '', '');
    }).catch(error => {
      this.isDataLoading = false;
      switch (error.code) {
        case 'auth/email-already-in-use':
          this._dialog.openErrorDialogV2("Error", "Email is already in use!", '', '');
          break;
        default:
          this._dialog.openErrorDialogV2("Error", error.message, '', '');
          break;
      }
    });
  }

  goToLogin() {
    this.router.navigate(["auth/login"]);
  }
}
