import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { AuthService } from '../auth/auth-services'
import { catchError, switchMap, throwError } from 'rxjs'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService)

    // --- Ne pas intercepter les requêtes d'auth elles-mêmes ---
    const excluded = ['/auth/login', '/auth/logout', '/auth/refresh']
    if (excluded.some(path => req.url.includes(path))) { return next(req) } // passe directement

    // --- Interception des autres requêtes ---
    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status !== 401) { 
                return throwError(() => err) 
            } // si pas 401 on transmet au suivant
            // Si 401 on tente de refresh via Observable
            return auth.refresh$().pipe(
                switchMap(ok => ok ? next(req) : throwError(() => err)), // Si refresh réussi, rejouer la requête
                catchError(refreshErr => { // si encore erreur, on termine
                    auth.logout() ; 
                    return throwError(() => refreshErr)
                }),
            )
        })
    )
}


// Tu fais une requête → si tout va bien, l’intercepteur ne fait rien.
// Si le serveur répond 401 → l’intercepteur essaie de sauver la session (refresh).
// Si le refresh marche → on refait automatiquement la même requête (l’utilisateur ne voit rien).
// Si le refresh rate → logout puis l’app peut te renvoyer sur /login.