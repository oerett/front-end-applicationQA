import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/common-methods.service';
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
    private router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, this.sharedService.emailValidator()]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  loginUser(form: FormGroup) {
    form.invalid == true ? form.markAllAsTouched() : console.log("do the api call");
  }

  register() {
    this.router.navigate(["auth/register"]);
  }
}
