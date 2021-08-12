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
  private baseUrl: string = "http://localhost:8080/api/auth/projets"

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    ) { }

  addProject(newProjet: Projet){
    // this.projets.push(newProjet);
    // console.log(this.projets);
    // this.emitDataProject();
    const id = this.authService.getUserIdToken();
    return this.httpClient.post(`http://localhost:8080/api/auth/projets/${id}`, newProjet)
  }

  deletePost(id : number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }

  // emitDataProject(){
  //   this.projectSubject.next(this.projets.slice());
  //   console.log('emit data');
  // }

  getProject(): Observable<Array<Projet>> {
    return this.httpClient.get<Array<Projet>>(`${this.baseUrl}`);
  }

  postProject(newProjet: Projet){
    return this.httpClient.post(`http://localhost:8080/api/auth/projets`, newProjet)
  }
}


