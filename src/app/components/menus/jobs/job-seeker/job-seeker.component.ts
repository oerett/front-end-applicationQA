import { Component } from '@angular/core';
import { JobSeekerService } from './job-seeker.service';
import { Store } from '@ngrx/store';
import { addFavoriteJob, removeFavoriteJob, updateFavoritesArray } from './favorite-job.actions';
import { selectFavoriteJobs } from './favorite-job.state';
import * as fromFavoriteJob from './favorite-job.state';


@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent {
  jobs: any = [];
  searchTerm: string = "";
  favorites: boolean[] = [];
  favoriteJobs: any[] = [];

  constructor(
    private jobSeekerService: JobSeekerService,
    private storefav: Store<{ favoriteJobs: { favorites: boolean[] } }>,
    private store: Store) {
    this.store.select(fromFavoriteJob.selectFavorites).subscribe(res => {
      if (res.length != 0)
        this.favorites = res;
    })
  }

  ngOnInit() {
    this.jobSeekerService.getJobs().subscribe(data => {
      this.jobs = data;
      this.setFavoritesArray();
    });

    this.store.select(selectFavoriteJobs).subscribe(favJobs => {
      this.favoriteJobs = [...favJobs];  // copy to ensure no direct mutation
      this.setFavoritesArray();  // update favorites array whenever favoriteJobs change
    });
  }

  setFavoritesArray() {
    const newFavorites = this.jobs.map((job: any) =>
      this.favoriteJobs.some(favJob => favJob.jobId === job.jobId)
    );
    this.favorites = [...newFavorites];
    this.store.dispatch(updateFavoritesArray({ favorites: this.favorites }));
  }

  favourite(action: number, index: number, job: any) {
    const newFavorites = [...this.favorites];  // copy to ensure no direct mutation

    if (action === 1) {
      newFavorites[index] = true;
      this.store.dispatch(addFavoriteJob({ job }));
    } else {
      newFavorites[index] = false;
      this.store.dispatch(removeFavoriteJob({ job }));
    }

    this.favorites = newFavorites;
    console.log(this.favorites, "please?")
  }
}
