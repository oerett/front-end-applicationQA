import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { JobSeekerService } from './job-seeker.service';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent {
  jobs: any = [];
  searchTerm: string = "";
  favorites: boolean[] = [];

  constructor(private jobSeekerService: JobSeekerService) {

  }

  ngOnInit() {
    this.jobSeekerService.getJobs().subscribe(data => {
      this.jobs = data;
    });
  }

  favourite(action: number, index: number) {
    if (action === 1) {
      this.favorites[index] = true;
    } else {
      this.favorites[index] = false;
    }
  }




}
