import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Projet } from '../../models/projet.model';
import { ProjetService } from '../../services/projet.service';

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.scss']
})
export class AddProjetComponent implements OnInit {
  dataProject? : Projet[];
  projectSubcription? : Subscription;

  selectFile:any =null;

  constructor(
    private projetService: ProjetService,
    private router : Router
  ) {}

  projetForm = new FormGroup({//mon objet de declaration des champs de mon formulaire
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
    const formValues = this.projetForm?.value;
    console.log(formValues);//recuperer l'objet
    this.projetService.postProject(formValues).subscribe(
      (project: Projet) => {
        console.log(project);
        this.dataProject?.push(project);
        this.router.navigate(['/projet']);//redirect
      }
    )
    formValues["photo"] = this.selectFile;
  }
}
