import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { CommonModule, TitleCasePipe } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Task {
  id: string;
  title: string;
  desc: string;
  priority: string;
  category: string;
  postedAt: string;
  deadline: string;
  status: string;
}

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    TitleCasePipe,
    RouterLink,
    RouterLink,
    MatProgressSpinnerModule
   ],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
  // changeDetection : ChangeDetectionStrategy.OnPush
})
export class TaskPageComponent implements OnInit {

  taskId: string | null = null;
  tasksData: any[] = [];
  taskDetails: any  = null;
  priorityArr: number[] = [];

  route = inject(ActivatedRoute);
  router = inject(Router);
  api = inject(ApiService);
  dialog = inject(MatDialog);



  ngOnInit(): void {

    this.route.paramMap.subscribe((params)=>{
      this.taskId = params.get("id");
    })



    this.api.getData("/task/" + this.taskId).subscribe({
      next : (data: any) => {
        this.taskDetails = data;
        // console.log("task details", this.taskDetails);

        let priority = Number(this.taskDetails?.priority);
        while(priority--) {
          this.priorityArr.push(priority);
        }
      },
      error : (err: any) => {
        console.error(err);
      }
    })


  }

  handleStatusClick() {

    if(this.taskDetails._id === this.taskId) {
      if(this.taskDetails.status === "completed") {
        this.taskDetails.status = "incomplete";
      } else {
        this.taskDetails.status = "completed";
      }
    }

    this.api.updateData('/update-task/' + this.taskDetails._id , this.taskDetails).subscribe({
      next : (res: any) => {
        // console.log(res);
      },
      error : (err : any) => {
        console.log(err);
      }
    });

  }

  deleteTask(id: any) {

    this.api.deleteData("/delete-task/" + id).subscribe({
      next : (res: any) => {
        // console.log(res);
      },
      error : (err: any) => {
        console.log(err);
      }
    })

    this.router.navigateByUrl("");

  }

  goToEditTask() {
    this.router.navigateByUrl("/add-task/" +  this.taskId);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width : '250px',
      data : {
        title: 'Confirm Deletion',
        message: "Are you sure, you want to delete this item?"
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteTask(this.taskDetails?._id);
      }
    });
  }



}
