import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  isTokenValid() {

    const token = localStorage.getItem('token');

    if(token) {
  
      const userInfo = JSON.parse(atob(token.split('.')[1]));
      const exp = userInfo.exp;
      const now = Math.floor(Date.now() / 1000);
  
      if(exp >= now) {
        return true;
      } else {
        return false;
      }
  
    } else {
        return false;
    }

  }    

  getRole() {

    const token = localStorage.getItem('token');

    if(token) {

      const userInfo = JSON.parse(atob(token.split('.')[1]));
  
      const isAdmin = userInfo.email.startsWith("admin");
  
      if(isAdmin) {
        return "admin";
      } else {
        return "user";
      }

    }

    return null;
  }
}
