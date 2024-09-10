import { HttpInterceptorFn } from "@angular/common/http";


export const httpInterceptor : HttpInterceptorFn = (req, next) => {

    const token = window.localStorage.getItem('token') || '';

    const authenticatedReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(authenticatedReq);

}