import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './user/layout/layout.component';
import { NavBarComponent } from './user/layout/nav-bar/nav-bar.component';
import { FooterComponent } from './user/layout/footer/footer.component';
import { HomeComponent } from './user/home/home.component';
import { ReseauComponent } from './user/reseau/reseau.component';
import { ProjetComponent } from './user/projet/projet.component';
import { ListProjetComponent } from './user/projet/list-projet/list-projet.component';
import { CardProjetComponent } from './user/projet/list-projet/card-projet/card-projet.component';
import { AddProjetComponent } from './user/add-projet/add-projet.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HistoriqueComponent } from './user/projet/historique/historique.component';
import { NotFoundComponent } from './user/not-found/not-found.component';
import { LoginComponent } from './component/login/login.component';
import { HomeAdminComponent } from './component/admin/home-admin/home-admin.component';
import { CardComponent } from './user/card/card.component';
import { RegisterComponent } from './component/register/register.component';
import { EditProfilComponent } from './user/edit-profil/edit-profil.component';
import { AuthInterceptor } from './user/interceptor/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    ReseauComponent,
    ProjetComponent,
    ListProjetComponent,
    CardProjetComponent,
    AddProjetComponent,
    HistoriqueComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    CardComponent,
    HomeAdminComponent,
    EditProfilComponent
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
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
