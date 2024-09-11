import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";


export const httpInterceptor : HttpInterceptorFn = (req, next) => {

    const router = inject(Router);

    const token = window.localStorage.getItem('token') || '';

    const authenticatedReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(authenticatedReq).pipe(
        catchError((err : HttpErrorResponse) => {
            if(err.status === 401) {
                localStorage.clear();
                router.navigate(['/login']);
            } 

            return throwError(() => err);
        })
    );

}