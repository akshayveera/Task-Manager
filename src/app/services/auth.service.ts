import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  api = inject(ApiService);

  async isTokenValid() : Promise<boolean> {

    const token = localStorage.getItem('token');

    if(token) {
      try {
        const data = await firstValueFrom(this.api.getData("/user/me"));
        // console.log("api data", data);
        return true;
      } catch(err) {
        // console.log("err", err);
        return false;
      }      
    } else {
      return false;
    }
  }    


  async isAdmin() : Promise<boolean> {

    const token = localStorage.getItem('token');

    if(token) {
      try {
        const data = await firstValueFrom(this.api.getData("/user/me"));
        
        if(data.role === 'admin') {
          return true;
        } else {
          return false;
        }

      } catch(err) {

        return false;
      }      
    } else {
      return false;
    }

  }

}
