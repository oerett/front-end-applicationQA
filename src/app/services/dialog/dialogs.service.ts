import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogV2Component } from 'src/app/shared/dialogs/dialog-v2/dialog-v2.component';

@Injectable({
    providedIn: 'root'
})

export class DialogService {

    constructor(
        public _dialog: MatDialog,
    ) { }

    openErrorDialogV2(title: string, before: string, data: any, after: string): void {
        let dialogData = {
            title: title,
            titleBg: 'red',
            before: before,
            data: data,
            after: after,
            hasCloseBtn: false,
            hasOkBtn: true,
        }

        this._dialog.open(DialogV2Component, {
            data: dialogData,
            panelClass: 'custom-dialog-container',
            autoFocus: false
        })
    }

    openSuccessDialogV2(title: string, before: string, data: any, after: string): void {
        let dialogData = {
            title: title,
            titleBg: 'blue',
            before: before,
            data: data,
            after: after,
            hasCloseBtn: false,
            hasOkBtn: true,
        }

        this._dialog.open(DialogV2Component, {
            data: dialogData,
            panelClass: 'custom-dialog-container',
            autoFocus: false
        })
    }

}