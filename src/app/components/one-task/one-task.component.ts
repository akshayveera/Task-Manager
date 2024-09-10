import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Router } from '@angular/router';
import {
  MatSlideToggleModule
} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { ApiService } from '../../services/api.service';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-one-task',
  standalone: true,
  imports: [
    JsonPipe,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
    MatCheckboxModule,
    DialogBoxComponent,
    MatButtonModule
  ],
  templateUrl: './one-task.component.html',
  styleUrl: './one-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneTaskComponent implements OnInit {

  @Input() item : any;
  @Input() tasksData: any;
  @Input() filteredTasks: any;
  @Output() delete = new EventEmitter<any>(); 
  router = inject(Router);
  api = inject(ApiService);

  priorityArr: number[] = [];
  isChecked = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    let priority = Number(this.item?.priority);
    while(priority--) {
      this.priorityArr.push(priority);
    }
  }  


  handleStatusClick(id = this.item.id) {
    
    for(let task of this.tasksData) {
      if(task.id === id) {
        if(task.status === "completed") {
          task.status = "incomplete";
        } else {
          task.status = "completed";
        }
      }
    }

    // console.log("item",this.item);

    this.api.updateData('/update-task/' + this.item._id , this.item).subscribe({
      next : (res: any) => {
        // console.log(res);
      },
      error : (err : any) => {
        console.log(err);
      }
    });

  }
  
  handleTaskClick(id = this.item._id) {
    this.router.navigate(['/task', id]);
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this item?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit(this.item._id);
      }
    });
  }


}
