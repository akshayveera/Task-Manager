
import {MatCardModule} from '@angular/material/card';
import { Component, inject, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { ApiService } from '../../services/api.service';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { nextTick } from 'process';

interface Task {
  id: string; 
  title: string;
  desc: string;
  category: string;
  priority: string;
  status: string;
  deadline : string;
  postedAt : string;
}


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatIconModule,
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    DialogBoxComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {  

  taskInfo: FormGroup = new FormGroup({
    id : new FormControl(''),
    title : new FormControl('', [Validators.required]),
    desc : new FormControl('', [Validators.required, Validators.minLength(3)]),
    priority : new FormControl('', [Validators.required]),
    category : new FormControl('', [Validators.required]),
    postedAt : new FormControl(String(new Date()).slice(4, 15)),
    deadline : new FormControl('', [Validators.required]),
    status : new FormControl("incomplete"),
    newCategory : new FormControl(''),
  })


  // tasksData = this.appData.tasksData;
  cats: any[] = [];
  tasksData: any[] = [];
  editTaskData : Task | null = null;
  taskId : any | null = null;

  appData = inject(DataService);
  api = inject(ApiService);
  dialog = inject(DialogService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.fetchData();

    this.route.paramMap.subscribe((params)=>{
      if(params.get("id")) {
        this.taskId = params.get('id');
        console.log("taskId",this.taskId);

        this.api.getData("/task/" + this.taskId).subscribe({
          next : (task: any) => {
            console.log(task.category);

            this.taskInfo.setValue({
              id : task.id || '',
              title : task.title || '',
              desc : task.desc || '',
              priority : task.priority || '',
              category : task.category || '',
              deadline : new Date(task.deadline || ''),
              postedAt : task.postedAt || '',
              status : task.status || '',
              newCategory: ''
            })
          },
          error : (err: any) => {
            console.error(err);
          }   
        })
      }
    })
  }  

  fetchData() {
    this.api.getData("/user-tasks").subscribe({
      next: (data: any) => {
        this.tasksData = data;
        console.log("tasksData", data)
      },
      error: (err: any) => {
        console.log(err);
      }
    });

    this.api.getData("/user-cats").subscribe({
      next : (data: any) => {
        console.log("cats data",data);
        this.cats = data;
      },
      error : (err : any) => {
        console.log(err);
      }
    });
  }

  handleReset() {

    this.taskInfo.reset({
      postedAt : String(new Date()).slice(4, 15),
      status : "incomplete"
    })
    
  }

  handleSubmit() {

    if (this.taskInfo.valid) {
      const formData = this.taskInfo.value;
      formData.id = this.getRandomUniqueId();
      formData.deadline = String(formData.deadline).slice(4, 15); 
      this.tasksData.push(formData);

      this.api.postData("/add-task", formData).subscribe({
        next : (res) => {
          this.handleReset();
          this.dialog.openDialog("Task successfully Added").then((data) => {
            this.router.navigateByUrl('');
          })
        },
        error : (err) => {
          console.log("Can't add task, try again");
        }
      })      
      
    } else {
      console.log("Task is invalid");
    }

  }

  addCategory(newCat = this.taskInfo.value.newCategory) {

    const flag = this.cats.some(item => item.name === newCat?.toLowerCase());

    if(flag) {
      this.dialog.openDialog("This category already exist!");
      return;
    }

    if(newCat === "") {      
      this.dialog.openDialog("Please enter a new Category");
      return;
    }

    this.api.postData("/add-cat", {name : newCat}).subscribe({
      next : (res) => {
        this.taskInfo.get("newCategory")?.setValue("");
        this.dialog.openDialog("New category added successfully");
        this.cats.push(res.newCat);
        
      },
      error : (err) => {
        console.log(err);
      }
    })
    
  }

  getRandomUniqueId() {

    let randomId = String(Math.floor(Math.random()*10000)); 

    while(1){
      const exists = this?.tasksData.some(item => item.is === randomId);
      // console.log("exists : " ,randomId)
      if (exists)
      {
        randomId = String(Math.floor(Math.random()*10000));        
      } else {
        break;
      }
    }

    return randomId;
  }

  async deleteCategory(idx : any) {
    // console.log(id);
    
    const flag = await this.dialog.openDialog("Are yous sure you want to delete the category?");

    const id = this.cats[idx]._id;

    if(flag) {
      this.api.deleteData(`/delete-cat/${id}`).subscribe({
        next : (res) => {
          // console.log(res.cats);
          this.cats = res.cats;
          this.taskInfo.get("category")?.reset();
        },
        error : (err) => {
          console.log(err);
        }
      })
    }

  }

  updateTask() {
    this.taskInfo.get('deadline')?.setValue(String(this.taskInfo.value.deadline).slice(4, 15));
    console.log("update",this.taskInfo.value);
    this.api.updateData('/update-task/' + this.taskId, this.taskInfo.value).subscribe({
      next : (data) => {
        this.dialog.openDialog("Task updated").then(()=>{
          this.router.navigateByUrl('/');
        });
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  
  // openDialog(msg: string, id : any = null): void{
  //   const dialogRef = this.dialog.open(DialogBoxComponent, {
  //     width: '300px',
  //     data: {
  //       title: 'Alert',
  //       message: msg
  //     }
  //   })    

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.deleteCategory(id);
  //     }
  //   });
  // }

}
