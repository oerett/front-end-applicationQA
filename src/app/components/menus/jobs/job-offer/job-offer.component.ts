import { Component } from '@angular/core';
import { MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor() {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  applyFilter(column: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value || "";
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data[column] === filter;  // Match column's value with filter
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
}
