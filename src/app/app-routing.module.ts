import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjetComponent } from './user/add-projet/add-projet.component';
import { AddAdminComponent } from './component/admin/add-admin/add-admin.component';
import { HomeAdminComponent } from './component/admin/home-admin/home-admin.component';
import { AuthGuard } from './user/guard/auth.guard';
import { HomeComponent } from './user/home/home.component';
import { LayoutComponent } from './user/layout/layout.component';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './user/not-found/not-found.component';
import { HistoriqueComponent } from './user/projet/historique/historique.component';
import { ProjetComponent } from './user/projet/projet.component';
import { RegisterComponent } from './component/register/register.component';
import { ReseauComponent } from './user/reseau/reseau.component';
import { EditProfilComponent } from './user/edit-profil/edit-profil.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // { path: '', canActivate : [AuthGuard] ,component: LayoutComponent, children : [
    { path: '', component: LayoutComponent, children : [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home',  component: HomeComponent},
    { path: 'projet',  component: ProjetComponent},
    { path: 'historique',  component: HistoriqueComponent},
    { path: 'add-projet',  component: AddProjetComponent},
    { path: 'home-admin',  component: HomeAdminComponent},
    { path: 'add-admin',  component: AddAdminComponent},
    { path: 'edit-profil',  component: EditProfilComponent},
    { path: 'reseau',  component: ReseauComponent},
    { path:'**', redirectTo:'/not-found'},
    { path: 'not-found', component: NotFoundComponent},
  ]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
