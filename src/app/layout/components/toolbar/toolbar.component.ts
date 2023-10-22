import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-services/auth.service';
import { BreadcrumbService, Breadcrumb } from 'src/app/services/breadcrumb-service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  username: string = "";
  role: string = "";
  breadcrumbs$: Observable<Breadcrumb[]>;
  url: string = "";

  constructor(
    public authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url;
      }
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem('email') as string;
    this.role = localStorage.getItem('role') as string;
  }

  goToProfile() {
    this.router.navigate(['/dashboard/job-seeker/profile']);
  }

  logOut() {
    this.authService.logout();
    this.cdRef.detectChanges();
  }
}
