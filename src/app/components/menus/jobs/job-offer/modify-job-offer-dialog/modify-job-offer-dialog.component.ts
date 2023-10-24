import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog/dialogs.service';
import { SharedService } from 'src/app/shared/services/common-methods.service';

@Component({
  selector: 'app-modify-job-offer-dialog',
  templateUrl: './modify-job-offer-dialog.component.html',
  styleUrls: ['./modify-job-offer-dialog.component.scss']
})
export class ModifyJobOfferDialogComponent {
  dialogForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private _dialog: DialogService,
    private sharedService: SharedService,
  ) {
    this.dialogForm = this._formBuilder.group({
      jobId: ['', []],
      jobDescription: ['', Validators.required],
      jobLongDescription: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.data['action'] == "modify") {
      this.dialogForm.controls['jobId'].setValidators([Validators.required]);
      this.dialogForm.controls['jobId'].updateValueAndValidity();
      this.createForm();
    }
  }

  createForm() {
    this.dialogForm.setValue({
      jobId: this.data['jobsdata'].jobId,
      jobDescription: this.data['jobsdata'].jobDescription,
      jobLongDescription: this.data['jobsdata'].jobLongDescription,
    })
  }

  saveJobs(form: FormGroup) {
    if (this.data['action'] == "modify") {
      this.firestore.collection('jobs').doc(this.data['jobsdata'].id).update(form.value).then(async () => {
        this._dialog.openSuccessDialogV2("Success", "Job successfully updated!", '', '');
        await this.sharedService.refreshTable().next({ refresh: true });
      }).catch((error) => {
        this._dialog.openErrorDialogV2("Error", error, '', '');
      });
    } else {
      let body = {
        email: localStorage.getItem('email'),
        jobId: form.value.jobId,
        jobDescription: form.value.jobDescription,
        jobLongDescription: form.value.jobLongDescription
      }
      this.firestore.collection('jobs').add(body).then(async () => {
        this._dialog.openSuccessDialogV2("Success", "Job successfully added!", '', '');
        await this.sharedService.refreshTable().next({ refresh: true });
      }).catch((error) => {
        this._dialog.openErrorDialogV2("Error", error, '', '');
      });
    }
  }

}