import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getApps } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (getApps().length === 0) {
      console.log('Firebase has not been initialized (app Comp)');
    } else {
      console.log('Firebase has been initialized (app Comp)');
    }
  }
}
