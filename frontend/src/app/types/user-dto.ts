export enum Role {
  User = 'user',
  Admin = 'admin',
}

export interface UserDto { 
  id: string;
  login: string;
  role: Role;
}

