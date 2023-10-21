import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
@Component({
  selector: 'app-dialog-v2',
  templateUrl: './dialog-v2.component.html',
  styleUrls: ['./dialog-v2.component.scss']
})

export class DialogV2Component {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  getClass(titleBg: string): string {
    const classes: any = {
      red: 'title red',
      blue: 'title blue'
    };
    return classes.titleBg || '';
  }

}
