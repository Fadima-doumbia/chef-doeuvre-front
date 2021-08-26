import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjetComponent } from './component/projet/add-projet/add-projet.component';
import { AddAdminComponent } from './component/admin/add-admin/add-admin.component';
import { HomeAdminComponent } from './component/admin/home-admin/home-admin.component';
import { AuthGuard } from './component/guard/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './component/authentification/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ProjetComponent } from './component/projet/projet.component';
import { RegisterComponent } from './component/authentification/register/register.component';
import { ReseauComponent } from './component/reseau/reseau.component';
import { EditProfilComponent } from './component/edit-profil/edit-profil.component';
import { EditProjetComponent } from './component/projet/edit-projet/edit-projet.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AdminProjetComponent } from './component/admin/admin-projet/admin-projet.component';
import { AdminUserComponent } from './component/admin/admin-user/admin-user.component';
import { NousContacterComponent } from './component/nous-contacter/nous-contacter.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', canActivate : [AuthGuard] ,component: LayoutComponent, children : [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'profil',  component: HomeComponent},
    { path: 'projet',  component: ProjetComponent},
    { path: 'add-projet',  component: AddProjetComponent},
    { path: 'list-user',  component: ListUserComponent},
    { path: 'edit-projet/:id',  component: EditProjetComponent},
    { path: 'home-admin',  component: HomeAdminComponent},
    { path: 'add-admin',  component: AddAdminComponent},
    { path: 'admin-projet',  component: AdminProjetComponent},
    { path: 'admin-user',  component: AdminUserComponent},
    { path: 'edit-profil',  component: EditProfilComponent},
    { path: 'home',  component: ReseauComponent},
    { path: 'contact',  component:NousContacterComponent},
    { path:'**', redirectTo:'/not-found'},
    { path: 'not-found', component: NotFoundComponent},
  ]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
