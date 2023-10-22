import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  username: string = "";
  isAuthenticated: boolean = false;
  constructor(public authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private router: Router) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('username') as string;
    this.isAuthenticated = localStorage.getItem('isAuthenticated') as any;
  }

  logOut() {
    this.authService.logout();
    this.cdRef.detectChanges();
  }
}
