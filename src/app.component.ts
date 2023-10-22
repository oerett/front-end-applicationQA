import { Component } from '@angular/core';
import { SharedService } from './app/shared/services/common-methods.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './app/services/auth-services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  jobs: any = [];
  constructor(private _isAuthenticated: AuthService) { }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('isAuthenticated') as string) == true)
      this._isAuthenticated.setAuth();
    else this._isAuthenticated.logout();
  }

}
