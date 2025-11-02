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

  private readonly _users = signal<UserDto[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly users = this._users.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  loadAll() {
    this._isLoading.set(true);
    this._error.set(null);

    this.http.get<UserDto[]>(`${environment.apiUrl}/users`, { withCredentials: true }) // pour autoriser l'envoie de cookies pour reconnaitre l'itilisateur connecté 
      .pipe(
        tap(list => this._users.set(list ?? [])), // on prends la liste reçue et on la met dans le signal, si list undefined, tableau vide àa la place
        catchError(error => {
          console.error('Erreur lors du chargement des utilisateurs :', error);
          this._users.set([]);  // vide la liste
          this._error.set('Impossible de charger les utilisateurs.');
          return of([]);
        }),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe();
  }
}