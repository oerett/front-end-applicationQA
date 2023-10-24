import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-services/auth.service';
import { BreadcrumbService, Breadcrumb } from 'src/app/services/breadcrumb-service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  }

  ngOnInit() { }

  ngAfterViewChecked() {
    if (!!localStorage.getItem('email') && !!localStorage.getItem('role')) {
      this.username = localStorage.getItem('email') as string;
      this.role = localStorage.getItem('role') as string;
      this.cdRef.detectChanges();
    }
  }

  goToProfile() {
    this.router.navigate(['/dashboard/job-seeker/profile']);
  }

  logOut() {
    this.authService.logout();
    this.cdRef.detectChanges();
  }
}
