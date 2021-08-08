import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Projet } from '../../models/projet.model';
import { ProjetService } from '../../services/projet.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
  dataProject? : Projet[];
  projectSubcription? : Subscription;

  selectFile:any =null;

  constructor(private projetService: ProjetService) {}

  projectForm = new FormGroup({//mon objet de declaration des champs de mon formulaire
      id : new FormControl(''),
      name : new FormControl(''),
      description : new FormControl(''),
      entrepreneur : new FormControl('', Validators.required),
      besoin: new FormControl('', Validators.required),
      dateD: new FormControl("")
  });

  ngOnInit(): void {
    this.projectSubcription = this.projetService.projetObject$.subscribe(
      (listProject: Projet[]) => {
        console.log(listProject);
        this.dataProject = [...listProject];
      }
    )
    this.projetService.getProject()
  }

  ngOnDestroy(){
    this.projectSubcription?.unsubscribe();
    console.log('destroy component project')
  }

  addphoto(event:any){
    this.selectFile = event.target.files[0];
   // console.log(this.selectFile);
  }

  onSubmit() {//fonction bouton de validation et d'envoi des infos
    const formValues = this.projectForm?.value;
    console.log(formValues);//recuperer l'objet
    this.projetService.postProject(formValues).subscribe(
      (project: Projet) => {
        console.log(project);
        this.dataProject?.push(project);
      }
    )
    formValues["photo"] = this.selectFile;
  }
}
