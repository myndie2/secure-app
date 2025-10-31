import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth-services';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Permet de restaurer la session à la première visite d’une page protégée
  // Vérifie si on n'a pas encore d'utilisateur et si le service n'est pas en train de vérifier déjà (whoami)
  if (auth.currentUser() === null && !auth.isLoading()) {
    // On demande au backend "qui est connecté ?" (si un cookie de session existe)
    auth.whoami();
  }

  // Si l'utilisateur est déjà connecté, on autorise l'accès à la page
  if (auth.isLoggedIn()) {
    return true;
  } else {
    // Sinon, on redirige vers la page de connexion
    router.navigate(['/login']);
    return false;
  }
};

// authguard passe en premier donc pas besoin d'appeler whoami du back