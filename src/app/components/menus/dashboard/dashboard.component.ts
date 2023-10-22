import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  role: string = "";

  constructor() {
  }

  ngOnInit() {
    this.role = localStorage.getItem('role') as string;
  }
}
