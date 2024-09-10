import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router);

  role = localStorage.getItem("role");
  name = localStorage.getItem("name");

  logoutUser() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

}
