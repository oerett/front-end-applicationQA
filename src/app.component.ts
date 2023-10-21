import { Component } from '@angular/core';
import { SharedService } from './app/shared/services/common-methods.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  jobs: any = [];
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

}
