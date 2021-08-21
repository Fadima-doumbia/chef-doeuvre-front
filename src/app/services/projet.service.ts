import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Projet } from '../models/projet.model';
import { SearchProjetRequest } from '../payload/search-projet.request';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  projectSubject = new Subject<Projet[]>();
  private baseUrl: string = "http://localhost:8080/api"

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    ) { }

    // methode pour mettre a jour les projets
    // emitProjetSubject() {
    //   this.getAllProject().subscribe(
    //     (resp:any) => {
    //       this.projectSubject.next(resp);
    //     }
    //   )
    // }
//********************************************************************************************************************* */

  addProject(newProjet: Projet){
    const id = this.authService.getUserIdToken();
    return this.httpClient.post(`${this.baseUrl}/projets/${id}`, newProjet)
  }
//********************************************************************************************************************* */

  deletePost(id : number){
    return this.httpClient.delete(`${this.baseUrl}/projets/${id}`)
  }

//********************************************************************************************************************* */

  deleteUserPost(id : number){
    return this.httpClient.delete(`${this.baseUrl}/projets/${id}`);
  }

//********************************************************************************************************************* */

  getById(id: number) {
    return this.httpClient.get<Projet>(`${this.baseUrl}/projets/${id}`);
  }

//********************************************************************************************************************* */

  getAllProject() {//j'ai mis un tableau card il me retourne un tableau d'objet
    return this.httpClient.get<Projet[]>(`${this.baseUrl}/projets`)
  }

  //********************************************************************************************************************* */

  getProject(id:any): Observable<Array<Projet>> {
    return this.httpClient.get<Array<Projet>>(`${this.baseUrl}/projets/${id}`);
  }

  //*********************************************************************************************************************
  searchProject(search: SearchProjetRequest){
    return this.httpClient.post<Array<Projet>>(`${this.baseUrl}/projets/searchProject`, search);
  }
//********************************************************************************************************************* */

  updateProjet(updateProjet: Projet) {
    return this.httpClient.put(`${this.baseUrl}/projets`, updateProjet);
  }

//********************************************************************************************************************* */

  postProject(newProjet: Projet){
    return this.httpClient.post(`${this.baseUrl}/projets`, newProjet)
  }
}


