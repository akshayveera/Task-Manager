
import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators
} from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerData : FormGroup = new FormGroup({
    name : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(
    private apiService : ApiService, 
    private dialog : DialogService,
    private route : Router
  ) {}

  hide = signal(true);  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  registerUser() {    

    if(this.registerData.valid) {
      this.apiService.postData("/add-user", this.registerData.value).subscribe({
        next : (res) => {
          this.dialog.openDialog("User added succesfully");
          this.route.navigate(['/login'])
        },
        error : async (err) => {
          console.log(err);
          this.dialog.openDialog(err?.error?.message);
        }
    })
    } else {
      this.dialog.openDialog("Enter valid details");
    }

  }
}
