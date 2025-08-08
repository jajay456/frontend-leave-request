import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  let authReq = req;

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
  }

  return next(authReq);
};
