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
  
  constructor(public authService: AuthService,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('username') as string;
  }

  logOut() {
    this.authService.logout();
    this.cdRef.detectChanges();
  }
}
