import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const  authGuard: CanActivateFn = async (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const routePath =  route.routeConfig?.path;
  
  if(await auth.isTokenValid()) {

    if(routePath === 'login') {
      router.navigateByUrl("/");
      return false;
    }

    return true;

  } else {

    if(routePath === 'login') {
      return true;
    }
    localStorage.clear();
    router.navigateByUrl("/login");
    return false;
  }

};
