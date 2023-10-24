import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addFavoriteJob, removeFavoriteJob, updateFavoritesArray } from './favorite-job.actions';
import { selectFavoriteJobs } from './favorite-job.state';
import * as fromFavoriteJob from './favorite-job.state';
import { SharedService } from 'src/app/shared/services/common-methods.service';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})

export class JobSeekerComponent {
  jobs: any[] = [];
  searchTerm: string = "";
  favorites: { [jobId: string]: boolean } = {};
  favoriteJobs: any[] = [];

  constructor(
    private sharedService: SharedService,
    private store: Store) {
    this.store.select(fromFavoriteJob.selectFavorites).subscribe(res => {
      if (res.length != 0) {
        this.favorites = res.reduce((acc: { [jobId: string]: boolean }, job: any) => {
          acc[job.jobId] = true;
          return acc;
        }, {});
      }
    })
  }

  ngOnInit() {
    this.sharedService.getJobs().subscribe(data => {
      this.jobs = data;
      this.setFavoritesArray();
    });

    this.store.select(selectFavoriteJobs).subscribe(favJobs => {
      this.favoriteJobs = [...favJobs];
      this.setFavoritesArray();
    });
  }

  setFavoritesArray() {
    this.jobs.forEach(job => {
      this.favorites[job.jobId] = this.favoriteJobs.some(favJob => favJob.jobId === job.jobId);
    });
  }

  favourite(action: number, job: any) {
    if (action === 1) {
      this.favorites[job.jobId] = true;
      this.store.dispatch(addFavoriteJob({ job }));
    } else {
      this.favorites[job.jobId] = false;
      this.store.dispatch(removeFavoriteJob({ job }));
    }
  }
}
