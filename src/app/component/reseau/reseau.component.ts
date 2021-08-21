import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Projet } from 'src/app/models/projet.model';
import { User } from 'src/app/models/user';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-reseau',
  templateUrl: './reseau.component.html',
  styleUrls: ['./reseau.component.scss']
})
export class ReseauComponent implements OnInit {
  dataProject? : Projet[];
  projectSub?: Subscription;

  constructor(
    private projetService: ProjetService
  ) { }

  searchForm = new FormGroup({
    name: new FormControl('')
  });

  ngOnInit(): void {
    this.projectSub = this.projetService.getAllProject().subscribe(
      (resp: Projet[]) => {
        this.dataProject = resp;
        console.log(this.dataProject)
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


  onSubmit() {
    this.getProject();
  }


}
