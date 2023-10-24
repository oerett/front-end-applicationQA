import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/shared/services/common-methods.service';
import { ModifyJobOfferDialogComponent } from './modify-job-offer-dialog/modify-job-offer-dialog.component';
import { DialogService } from 'src/app/services/dialog/dialogs.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})

export class JobOfferComponent {
  [key: string]: any;
  sortDir: 'default' | 'asc' | 'desc' = 'default';
  sortedColumn: string = '';
  dataSource: MatTableDataSource<any>;
  jobId: string = "";
  jobDescription: string = "";
  jobLongDescription: string = "";
  displayedColumns: string[] = ["index", "jobId", "jobDescription", "jobLongDescription", "options"];
  jobs: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  refresh: boolean = false;
  email = localStorage.getItem('email');

  constructor(
    private sharedService: SharedService,
    private _matDialog: MatDialog,
    private _dialog: DialogService,
    private firestore: AngularFirestore,
    private cdRef: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    this.getJobsByEmail();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getJobs() {
    this.jobs = [];
    this.dataSource = new MatTableDataSource<any>([]);
    this.sharedService.getJobs().subscribe(data => {
      this.jobs = data;
      this.dataSource = new MatTableDataSource<any>(this.jobs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getJobsByEmail() {
    this.jobs = [];
    this.dataSource = new MatTableDataSource<any>([]);
    this.sharedService.getJobsByEmail(this.email as string).subscribe(data => {
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

  sortByColumn(event: any, column: string): void {
    if (this.sortedColumn !== column) {
      this.sortDir = 'default';
    }
    this.sortedColumn = column;
    event.stopPropagation();
    switch (this.sortDir) {
      case 'default':
        this.sortDir = 'asc';
        break;
      case 'asc':
        this.sortDir = 'desc';
        break;
      case 'desc':
        this.sortDir = 'default';
        break;
    }
    if (this.dataSource && this.dataSource.sort) {
      this.dataSource.sort.sort(<MatSortable>({ id: column, start: 'asc' }));
      if (this.sortDir === 'default') {
        this.dataSource.sort.active = '';
        this.dataSource.sort.direction = '';
        this.dataSource.sort.sortChange.emit();
      }
    }
  }


  sortingDataAccessor(item: any, property: string): string {
    if (typeof item[property] === 'string') {
      return item[property].toLowerCase()
    }
    return item[property]
  }

  modifyJobs(jobsdata: any) {
    this.refresh = false;
    this._matDialog.open(ModifyJobOfferDialogComponent, {
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: {
        action: 'modify',
        jobsdata: jobsdata
      },
      autoFocus: false
    }).afterClosed().subscribe(async () => {
      await this.sharedService.refreshTable().subscribe(
        async res => {
          if (res.refresh != false && this.refresh == false) {
            this.refresh = true;
            await this.sharedService.refreshTable().next({ refresh: false });
            this.getJobsByEmail();
          }
        })
    });
  }

  delete(jobsdata: any) {
    this._dialog.openConfirmDialogV2(`Delete job`, `Are you sure you want to delete job `, `${jobsdata.jobDescription}`, `?`)
      .beforeClosed().subscribe({
        next: (res: boolean) => {
          if (res === true) {
            this.firestore.collection('jobs').doc(jobsdata.id).delete().then(() => {
              this._dialog.openSuccessDialogV2("Success", "Job successfully deleted!", '', '');
              this.getJobsByEmail();
              this.cdRef.detectChanges();
            }).catch((error) => {
              this._dialog.openErrorDialogV2("Error", error, '', '');
            });
          }
        }
      })
  }


  addJobs() {
    this.refresh = false;
    this._matDialog.open(ModifyJobOfferDialogComponent, {
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: {
        action: 'add'
      },
      autoFocus: false
    }).afterClosed().subscribe(async () => {
      await this.sharedService.refreshTable().subscribe(
        async res => {
          if (res.refresh != false && this.refresh == false) {
            this.refresh = true;
            await this.sharedService.refreshTable().next({ refresh: false });
            this.getJobsByEmail();
          }
        })
    });
  }

  refetchJobs() {
    this.getJobsByEmail();
    this.clear('');
  }

  clear(column: string) {
    const properties = [``, `jobId`, `jobDescription`, `jobLongDescription`, ``];
    properties.forEach(prop => {
      if (column === '' || prop !== column) {
        this[prop] = '';
      }
    });

    this.sortDir = 'default';
    this.sort.direction = '';
  }


}
