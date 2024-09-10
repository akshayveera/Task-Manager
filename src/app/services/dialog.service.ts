import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../components/dialog-box/dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openDialog(msg: string){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: {
        title: 'Alert',
        message: msg
      }
    })    

    return new Promise<boolean>((resolve) => {
      dialogRef.afterClosed().subscribe(result => {
        resolve(result);
      });
    });
  }


}

