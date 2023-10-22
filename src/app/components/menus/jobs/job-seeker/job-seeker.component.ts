import { Component } from '@angular/core';
import { JobSeekerService } from './job-seeker.service';
import { Store } from '@ngrx/store';
import { addFavoriteJob, removeFavoriteJob } from './favorite-job.actions';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent {
  jobs: any = [];
  searchTerm: string = "";
  favorites: boolean[] = [];

  constructor(
    private jobSeekerService: JobSeekerService,
    private store: Store) {

  }

  ngOnInit() {
    this.jobSeekerService.getJobs().subscribe(data => {
      this.jobs = data;
    });
  }

  favourite(action: number, index: number, job: any) {
    if (action === 1) {
      this.favorites[index] = true;
      this.store.dispatch(addFavoriteJob({ job }));
    } else {
      this.favorites[index] = false; 
      this.store.dispatch(removeFavoriteJob({ job }));
    }
  }




}
