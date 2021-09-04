import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Projet } from 'src/app/models/projet.model';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-admin-projet',
  templateUrl: './admin-projet.component.html',
  styleUrls: ['./admin-projet.component.scss']
})
export class AdminProjetComponent implements OnInit {
  dataProject? : Projet[];
  projectSub?: Subscription;

  constructor(
    private projetService: ProjetService,
    private route: ActivatedRoute
  ) { }

  searchForm = new FormGroup({
    name: new FormControl('')
  });

  ngOnInit(): void {
    this.getProjects();
    // Pour charger et mettre à jour tout le temps
    this.projectSub = this.projetService.projectSubject.subscribe(
      (resp: Projet[]) => {
        this.dataProject = resp;
      }
    )
  }

  getProjects() {
    this.projetService.getAllProject().subscribe(
      (resp:Projet[]) => {
        this.dataProject = resp;
      }
    )
  }

  getProject() {
    this.projectSub = this.projetService.searchProject(this.searchForm.value).subscribe(
      (resp: Projet[]) => {
        this.dataProject = resp;
        console.log(this.dataProject)
      }
    )
  }

  deleteProj(id:any) {
    confirm('Voulez supprimer le projet');
    this.projetService.deleteUserPost(id).subscribe(
      () => {
        this.dataProject = this.dataProject?.filter((data:any) => data.id != id)
        console.log('delete reussie');
      }
    )
  }

  onSubmit() {
    this.getProject();
  }

  toBack(event:any){//permet de revenir en haut
    window.scrollTo(0,0);//permet de definir l'endroit exact (en px) pour revenir dans la page
    event.preventDefault();
  }
}
