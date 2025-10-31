import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { UserService } from '../user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss'
})
export class UsersList {
  private readonly userService = inject(UserService);
  readonly users = this.userService.users;
  readonly isLoading = this.userService.isLoading;
  readonly error = this.userService.error;
}
