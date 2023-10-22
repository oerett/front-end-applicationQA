import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFavoriteJobs } from '../favorite-job.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  favoriteJobs$: Observable<any[]>;

  constructor(private store: Store) {
    this.favoriteJobs$ = this.store.select(selectFavoriteJobs);
    console.log(this.favoriteJobs$, "tellme ?")
  }

  ngOnInit() {
  }
}
