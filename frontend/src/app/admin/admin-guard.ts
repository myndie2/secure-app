import { CanActivateFn } from '@angular/router';
import { AuthService } from '../shared/auth/auth-services';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAdmin()) { //l'utilisateur est admin
    return true;
  }
  else { //l'utilisateur n'est pas admin
    router.navigate(['/home']); 
    return false;
  }
};
