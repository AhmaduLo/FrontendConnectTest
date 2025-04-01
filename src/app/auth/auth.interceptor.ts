import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  // Récupération du token
  const token = sessionStorage.getItem('token');

  // Si le token existe, on clone la requête avec le header Authorization
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Poursuite de la requête
  return next(req);
};
