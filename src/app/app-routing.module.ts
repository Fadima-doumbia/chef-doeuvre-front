import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjetComponent } from './component/projet/add-projet/add-projet.component';
import { AddAdminComponent } from './component/admin/add-admin/add-admin.component';
import { HomeAdminComponent } from './component/admin/home-admin/home-admin.component';
import { AuthGuard } from './component/guard/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './component/authentification/login/login.component';
import { ProjetComponent } from './component/projet/projet.component';
import { RegisterComponent } from './component/authentification/register/register.component';
import { ReseauComponent } from './component/reseau/reseau.component';
import { EditProfilComponent } from './component/edit-profil/edit-profil.component';
import { EditProjetComponent } from './component/projet/edit-projet/edit-projet.component';
import { AdminProjetComponent } from './component/admin/admin-projet/admin-projet.component';
import { AdminUserComponent } from './component/admin/admin-user/admin-user.component';
import { NousContacterComponent } from './component/nous-contacter/nous-contacter.component';
import { ByeComponent } from './component/authentification/bye/bye.component';

const routes: Routes = [

  // Route d'authentification
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'bye', component: ByeComponent},

  // Guard qui bloque l'accès tant que l'utilisateur n'est pas connecté
  { path: '', canActivate : [AuthGuard] ,component: LayoutComponent,
    children : [ // Mes routes enfants

      { path: 'edit-profil',  component: EditProfilComponent},
      { path: 'profil',  component: HomeComponent},
      { path: 'home',  component: ReseauComponent},
      { path: 'contact',  component: NousContacterComponent},

      //*******************************Projet***********************************

      { path: 'add-projet',  component: AddProjetComponent},
      { path: 'edit-projet/:id',  component: EditProjetComponent},
      { path: 'projet',  component: ProjetComponent},

      //*******************************Admin************************************

      { path: 'home-admin',  component: HomeAdminComponent},
      { path: 'add-admin',  component: AddAdminComponent},
      { path: 'admin-projet',  component: AdminProjetComponent},
      { path: 'admin-user',  component: AdminUserComponent},

      // ***********************************************************************

      { path: '', redirectTo: 'home', pathMatch: 'full'},// Si pas de route rediriger vers la page d'accueil

      // ***********************************************************************

      { path:'**', redirectTo:'/not-found'},// Si la route n'existe pas rediriger vers la page not found
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
