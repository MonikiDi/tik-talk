import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const canActivateAuth = () => {
  const isLoggenIn = inject(AuthService).isAuth;

  if (isLoggenIn) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};
