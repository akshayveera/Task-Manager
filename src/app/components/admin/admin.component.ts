import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  usersList : any[] = [];

  api = inject(ApiService);
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    
    this.api.getData("/all-users").subscribe({
      next: (res: any) => {
        // console.log("res", res);
        this.usersList = res.users;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  deleteTask(id: any) {

    this.api.deleteData("/delete-user/" + id).subscribe({
      next : (data) => {
        const index = this.usersList.indexOf(data.deletedUser);
        this.usersList.splice(index, 1);
      },
      error : (err) => {
        console.log(err);
      }
    });
     
  }

  openConfirmDialog(id : any): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this item?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log("id", id);
        this.deleteTask(id);
      }
    });
  }

  trackByUserId(index: number, user: any): any {
    return user._id;
  }

}
