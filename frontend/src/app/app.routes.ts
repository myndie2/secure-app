import { Routes } from '@angular/router';
import { Login } from './shared/auth/login/login';
import { Home } from './home/home';
import { Admin } from './admin/admin/admin';
import { authGuard } from './shared/auth/auth-guard';
import { adminGuard } from './admin/admin-guard';


export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'home', component: Home, canActivate:[authGuard] },
    { path: 'admin', component: Admin, canActivate:[authGuard, adminGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', redirectTo: 'home' },
]