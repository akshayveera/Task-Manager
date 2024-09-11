
import {Component, inject, signal} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginData : FormGroup = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  dialog = inject(DialogService);
  api = inject(ApiService);
  router = inject(Router);
  auth = inject(AuthService);

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginUser() {
    if (this.loginData.valid) {
      this.api.postData("/user-login", this.loginData.value).subscribe({
        next : (res) => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("userData", JSON.stringify(res.user));
          
          if(res.user.role === 'admin') {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('');
          }
          
        },
        error : (err) => {
          console.log(err);
          this.dialog.openDialog(err.error.message);
        }}
      )
    } else {
      this.dialog.openDialog("Enter valid details");
    }
  }
}
