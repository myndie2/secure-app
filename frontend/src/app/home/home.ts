import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/auth-services';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  protected auth = inject(AuthService);
}
