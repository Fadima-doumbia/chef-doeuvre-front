import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjetComponent } from './component/add-projet/add-projet.component';
import { AddAdminComponent } from './component/admin/add-admin/add-admin.component';
import { HomeAdminComponent } from './component/admin/home-admin/home-admin.component';
import { AuthGuard } from './component/guard/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { HistoriqueComponent } from './component/projet/historique/historique.component';
import { ProjetComponent } from './component/projet/projet.component';
import { RegisterComponent } from './component/register/register.component';
import { ReseauComponent } from './component/reseau/reseau.component';
import { EditProfilComponent } from './component/edit-profil/edit-profil.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', canActivate : [AuthGuard] ,component: LayoutComponent, children : [
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
