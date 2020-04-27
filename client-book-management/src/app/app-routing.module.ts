import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/user/home/home.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {DetailComponent} from './components/user/detail/detail.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {UserListComponent} from './components/admin/user-list/user-list.component';
import {BookListComponent} from './components/admin/book-list/book-list.component';
import {UnathorizedComponent} from './components/error/unathorized/unathorized.component';
import {NotFoundComponent} from './components/error/not-found/not-found.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './model/role';

const routes: Routes = [
  //Páginas principais
  {path: '', redirectTo: 'home',pathMatch: 'full'},
  {path: 'home', component: HomeComponent},

  //Usuário pages
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'detail', component: DetailComponent},
  {path: 'detail/:id', component: DetailComponent},

  //painel Admin
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]},
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]},
  {path: 'book-list', component: BookListComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]},

  //Pág. erros
  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnathorizedComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
constructor(private router: Router) {
  this.router.errorHandler = (error: any) => {
    this.router.navigate(['/404']);
  }
}
}
