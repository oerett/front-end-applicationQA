import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFavoriteJobs } from '../favorite-job.state';
import { SharedService } from 'src/app/shared/services/common-methods.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('bodyExpansion', []),  // No transitions
    trigger('indicatorRotate', [
      state('collapsed, void', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed, void <=> *', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ]
})
export class ProfileComponent {
  favoriteJobs$: Observable<any[]>;
  favourites: any = [];
  jobsApplied: any = [];
  email: string = "";
  role: string = "";

  constructor(
    private store: Store,
    private sharedService: SharedService
  ) {
    this.favoriteJobs$ = this.store.select(selectFavoriteJobs);
    this.email = (localStorage.getItem('email') as string);
    if ((localStorage.getItem('role') as string) == "js")
      this.role = "Job seeker";
    else this.role = "Job offer";

  }

  ngOnInit() {
    this.favoriteJobs$.subscribe((favJobs) => {
      this.favourites = favJobs;
    });
    this.getJobsApplied();
  }

  getJobsApplied() {
    this.sharedService.getJobsApplied().subscribe(data => {
      this.jobsApplied = data;
    });
  }
}
