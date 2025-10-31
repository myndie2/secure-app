import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from '../auth-services';
import {  FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { effect } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  protected auth = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    // Si l'utilisateur est connecté → redirige (admin → /admin, sinon → /home)
    effect(() => {
      const u = this.auth.currentUser();
      if (u) this.router.navigateByUrl(u.role === 'admin' ? '/admin' : '/home');
    });
  }


  readonly form = new FormGroup({
    login: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  // Fonction appelée à la soumission du formulaire
  submit() {
    if (this.form.invalid) return; // ne rien faire si les champs sont vides
    const { login, password } = this.form.getRawValue();
    this.auth.login(login, password);
  }


}
