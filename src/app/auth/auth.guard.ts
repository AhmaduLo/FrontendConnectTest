import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';

Injectable({
  providedIn: 'root'
})
export const AuthGuard: CanActivateFn = (route, state) => {

  
  return true;
};
