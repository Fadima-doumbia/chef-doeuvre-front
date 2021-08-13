import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Projet } from '../models/projet.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  arrayProject?:[];
  private baseUrl: string = "http://localhost:8080/api"

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    ) { }
//********************************************************************************************************************* */

  addProject(newProjet: Projet){
    // this.projets.push(newProjet);
    // console.log(this.projets);
    // this.emitDataProject();
    const id = this.authService.getUserIdToken();
    return this.httpClient.post(`${this.baseUrl}/projets/${id}`, newProjet)
  }
//********************************************************************************************************************* */

  deletePost(id : number){
    return this.httpClient.delete(`${this.baseUrl}/projets/${id}`)
  }
//********************************************************************************************************************* */

  getById(id: number) {
    return this.httpClient.get<Projet>(`${this.baseUrl}/projets/${id}`);
  }
//********************************************************************************************************************* */

  getProject(): Observable<Array<Projet>> {
    return this.httpClient.get<Array<Projet>>(`${this.baseUrl}/projets`);
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


