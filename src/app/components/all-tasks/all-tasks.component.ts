import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FiltersComponent } from '../filters/filters.component';
import { OneTaskComponent } from '../one-task/one-task.component';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    RouterLink,
    FiltersComponent,
    OneTaskComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css'
})
export class AllTasksComponent implements OnInit {

  data = inject(DataService);
  router = inject(Router);

  user : string | null = null;

  selectedCat = "all";
  selectedStatus = "all";
  selectedSorting = "date";
  selectedOrder = "des";

  tasksData: any = null;
  filteredTasks: any = [];
  categories: any[] = [];

  constructor(
    private api : ApiService
  ) {}

  ngOnInit(): void {

      this.api.getData("/user-tasks").subscribe({
        next : (data) => {
          if(data.totalTasksCount === 0) {
            this.tasksData = null;
          } else {
            this.tasksData = data.tasksData;
          }
          this.filteredTasks = this.tasksData;
          console.log("task data",this.tasksData);
          console.log("filtered",this.filteredTasks);
        },
        error: (err) => {
          this.tasksData = null;
          console.log(err);
        }
      })

      this.api.getData("/user-cats").subscribe({
        next : (data) => {
          const cats = data.map( (item : {name: string}) => item?.name);
          this.categories = cats;
        },
        error: (err) => {
          console.log(err);
        }
      })

  }


  receiveData(event : {
    filter : string,
    sort : string,
    status : string,
    order : string
  }) {

    this.selectedCat = event.filter;
    this.selectedSorting = event.sort;
    this.selectedStatus = event.status;
    this.selectedOrder = event.order;

    // console.log(event);

    this.handleFilter();
    this.handleSorting();

  }

  deleteTask(id: any) {

    console.log('id', id);

    this.api.deleteData("/delete-task/" + id).subscribe({
      next : (data) => {
        // console.log(data);
        this.tasksData = this.tasksData?.filter((task: any) => task._id !== id);

        // Update the filteredTasks array to reflect the deletion
        this.filteredTasks = this.tasksData ? [...this.tasksData] : [];

        // If no tasks remain, set tasksData to null to trigger the UI fallback
        if (this.tasksData.length === 0) {
          this.tasksData = null;
        }
      },
      error : (err) => {
        console.log(err);
      }
    });

  }

  handleFilter() {

    if(this.tasksData) {
      this.filteredTasks = [...this.tasksData]
    }

    if(this.selectedCat === 'all' && this.selectedStatus === 'all' ) {
      return;
    }

    if(this.selectedCat !== 'all') {
      this.filteredTasks = this.filteredTasks.filter((item : any)=>{
        return item?.category === this.selectedCat;
      })
    }

    if(this.selectedStatus !== 'all') {
      this.filteredTasks = this.filteredTasks.filter((item: any)=>{
        return item?.status === this.selectedStatus;
      })
    }

  }

  handleSorting() {

    switch(this.selectedSorting) {
      case 'date' :
      this.filteredTasks.sort( (item1: any, item2: any) => {
        const date1 = new Date(item1.postedAt);
        const date2 = new Date(item2.postedAt);
        if (date1.getMonth() !== date2.getMonth()) {
          if(this.selectedOrder === 'asc') {
            return date1.getMonth() - date2.getMonth();
          } else {
            return date2.getMonth() - date1.getMonth();
          }
        }
        if(this.selectedOrder === 'asc') {
          return date1.getDate() - date2.getDate();
        } else {
          return date2.getDate() - date1.getDate();

        }
      })
      break;

      case 'priority' :
      this.filteredTasks.sort( (item1: any, item2: any) => {
        if(this.selectedOrder === 'asc') {
          return item1.priority.localeCompare(item2.priority);
        } else {
          return item2.priority.localeCompare(item1.priority);
        }
      })
      break;

      case 'deadline' :
      this.filteredTasks.sort( (item1: any, item2: any) => {
        const date1 = new Date(item1.deadline);
        const date2 = new Date(item2.deadline);
        if (date1.getMonth() !== date2.getMonth()) {
          if(this.selectedOrder === 'asc') {
            return date1.getMonth() - date2.getMonth();
          } else {
            return date2.getMonth() - date1.getMonth();
          }
        }

        if(this.selectedOrder === 'asc') {
          return date1.getDate() - date2.getDate();
        } else {
          return date2.getDate() - date1.getDate();

        }
      })
      break;

    }

  }


  // trackById(index: number, item: any): number {
  //   return item.id;
  // }

  // resetFiltersAndSorting() {
  //   this.selectedCat = "all";
  //   this.selectedStatus = "all";
  //   this.selectedSorting = "date";
  //   this.selectedOrder = "asc";

  //   this.handleFilter();
  //   this.handleSorting();
  // }
}
