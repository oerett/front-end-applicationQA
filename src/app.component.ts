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
   
  }
}
