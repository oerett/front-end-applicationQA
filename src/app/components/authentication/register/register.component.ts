import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/common-methods.service';

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
    private router: Router
  ) {
    this.registerForm = this._formBuilder.group({
      role: ['', Validators.required],
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

  }

  goToLogin() {
    this.router.navigate(["auth/login"]);
  }
}
