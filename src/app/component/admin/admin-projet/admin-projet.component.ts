import { Component, OnInit } from '@angular/core';
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
    private projetService: ProjetService
  ) { }

  ngOnInit(): void {
    this.getProject();
    // Pour charger et mettre à jour tout le temps
    this.projectSub = this.projetService.projectSubject.subscribe(
      (resp: Projet[]) => {
        this.dataProject = resp;
      }
    )
  }

  getProject() {
    this.projetService.getAllProject().subscribe(
      (resp:Projet[]) => {
        this.dataProject = resp;
      }
    )
  }

}
