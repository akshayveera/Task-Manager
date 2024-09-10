import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {

  // console.log("route", route, "state", state);
  const auth = inject(AuthService);
  const router = inject(Router);

  if(auth.isTokenValid()) {
    // console.log("valid token")
    const userRole = auth.getRole();
    const requiredRole = route.data['role'];
    console.log("requiredRole", requiredRole, "userRole", userRole);
    // check for role here
    if(requiredRole === userRole) {
      return true;
    } else {
      router.navigateByUrl("/");
      return false;
    }

  } else {
    return false;
  }


  

  
};
