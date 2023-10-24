import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  role: string = "";
  userData: any = [];

  constructor(
    private afAuth: AngularFireAuth,
    private dashboardService: DashboardService
  ) {
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.dashboardService.getUserData(user.uid).subscribe(data => {
          this.userData = data;
          localStorage.setItem("email", this.userData.email);
          localStorage.setItem("role", this.userData.role);
          this.role = localStorage.getItem('role') as string;
        });
      }
    });
  }

  ngOnInit() {
    this.role = localStorage.getItem('role') as string;
  }



}
