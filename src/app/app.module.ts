import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './component/layout/nav-bar/nav-bar.component';
import { FooterComponent } from './component/layout/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { ReseauComponent } from './component/reseau/reseau.component';
import { AddProjetComponent } from './component/projet/add-projet/add-projet.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { LoginComponent } from './component/authentification/login/login.component';
import { HomeAdminComponent } from './component/admin/home-admin/home-admin.component';
import { RegisterComponent } from './component/authentification/register/register.component';
import { EditProfilComponent } from './component/edit-profil/edit-profil.component';
import { ProjetComponent } from './component/projet/projet.component';

import { AuthInterceptor } from './component/interceptor/auth.interceptor';
import { LayoutComponent } from './component/layout/layout.component';
import { EditProjetComponent } from './component/projet/edit-projet/edit-projet.component';
import { AdminProjetComponent } from './component/admin/admin-projet/admin-projet.component';
import { AdminUserComponent } from './component/admin/admin-user/admin-user.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { CardComponent } from './component/projet/card/card.component';
import { NousContacterComponent } from './component/nous-contacter/nous-contacter.component';
import { ByeComponent } from './component/authentification/bye/bye.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    ReseauComponent,
    ProjetComponent,
    AddProjetComponent,
    EditProjetComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    HomeAdminComponent,
    EditProfilComponent,
    CardComponent,
    LayoutComponent,
    AdminProjetComponent,
    AdminUserComponent,
    EditUserComponent,
    NousContacterComponent,
    ByeComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
