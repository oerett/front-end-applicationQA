import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/shared/services/common-methods.service';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent {
  sortDir: string = 'default';
  sortedColumn: string = '';
  dataSource: MatTableDataSource<any>;
  jobId: string = "";
  jobDescription: string = "";
  jobLongDescription: string = "";
  displayedColumns: string[] = ["index", "jobId", "jobDescription", "jobLongDescription", "options"];
  jobs: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private sharedService: SharedService,) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    this.sharedService.getJobs().subscribe(data => {
      this.jobs = data;
      this.dataSource = new MatTableDataSource<any>(this.jobs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(column: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const cellValue = data[column] ? data[column].toString().toLowerCase() : "";
      return cellValue.includes(filter);
    };

    this.dataSource.filter = value;
  }

  sortByColumn(event: any, column: string, direction: string): void {
    if (column !== this.sortedColumn)
      this.sortDir = "default";

    this.sortedColumn = column;
    event.stopPropagation();
    if (this.sortDir === "descending")
      this.sortDir = "default";
    else if (this.sortDir === "ascending")
      this.sortDir = "descending";
    else if (this.sortDir === "default")
      this.sortDir = "ascending";

    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    if (this.dataSource && this.dataSource.sort)
      this.dataSource.sort.sort(<MatSortable>({ id: column, start: this.sortDir }));
  }

  sortingDataAccessor(item: any, property: string): string {
    if (typeof item[property] === 'string') {
      return item[property].toLowerCase()
    }
    return item[property]
  }

  addJob() {

  }
}
