import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { UserDto } from '../types/user-dto';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  // liste réactive d'utilisateurs 
  readonly users = signal<UserDto[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  // cherche tout les utilisateurs depuis le backend
  loadAll() {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<UserDto[]>(`${environment.apiUrl}/users`, { withCredentials: true }) // pour autoriser l'envoie de cookies pour reconnaitre l'itilisateur connecté 
      .pipe(
        // tap: quand la réponse arrive fait ça...
        tap(list => this.users.set(list ?? [])),// on prends la liste reçue et on la met dans le signal, si list undefined, tableau vide àa la place
        catchError(error => {
          console.error('Erreur lors du chargement des utilisateurs :', error);
          this.users.set([]);  // vide la liste
          this.error.set('Impossible de charger les utilisateurs.');
          return of([]); // // renvoie un observable contenant un tableau vide
        }),
        finalize(() => this.isLoading.set(false))
      )  
      .subscribe(); // lance la requete 
  }

}

