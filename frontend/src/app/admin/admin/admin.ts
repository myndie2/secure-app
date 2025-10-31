import { Component, effect, inject } from '@angular/core'
import { UserService } from '../../users/user-service';
import { UsersList } from '../../users/users-list/users-list';

@Component({
  selector: 'app-admin',
  standalone: true,  
  imports: [UsersList],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {
  private readonly userService = inject(UserService);
  readonly users = this.userService.users;

  constructor() {
    // charge la liste à l’ouverture de la page
    effect(() => this.userService.loadAll());
  }

}
