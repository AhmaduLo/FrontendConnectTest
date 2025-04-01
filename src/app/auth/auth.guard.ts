import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

Injectable({
  providedIn: 'root'
})
export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');

  if (token) {
    return true; // ✅ Accès autorisé
  } else {
    router.navigate(['/login']); // 🔴 Redirection si non authentifié
    return false;
  }
};
