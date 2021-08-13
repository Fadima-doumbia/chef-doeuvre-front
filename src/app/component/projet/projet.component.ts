import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Projet } from '../../models/projet.model';
import { ProjetService } from '../../services/projet.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
  dataProject? : Projet[];
  user?: User;
  projectSubcription? : Subscription;

  selectFile:any =null;

  constructor(
    private authService: AuthService,
    private projetService: ProjetService,
    private userService: UserService

    ) {}

  projectForm = new FormGroup({//mon objet de declaration des champs de mon formulaire
      id : new FormControl(''),
      name : new FormControl(''),
      description : new FormControl(''),
      entrepreneur : new FormControl('', Validators.required),
      besoin: new FormControl('', Validators.required),
      dateD: new FormControl("")
  });

  ngOnInit(): void {
    const id = this.authService.getCurrentUser();
    this.projectSubcription = this.userService.getById(id)
    .subscribe((user:User) => {
        this.user = user;
      }
    )




    // this.projectSubcription = this.projetService.getProject()
    // .subscribe((listProject: Array<Projet>) => {
    //     this.dataProject = listProject;
    //   }
    // )
    // this.projetService.getProject();
    // console.log(this.projetService.getProject());
  }

  ngOnDestroy(){
    this.projectSubcription?.unsubscribe();
    console.log('destroy component project')
  }

  addphoto(event:any){
    this.selectFile = event.target.files[0];
   // console.log(this.selectFile);
  }

  updateProj() {//fonction bouton de validation et d'envoi des infos
    const formValues = this.projectForm?.value;
    console.log(formValues);//recuperer l'objet
    this.projetService.updateProjet(formValues).subscribe(
      (project: Projet) => {
        console.log(project);
        this.dataProject?.push(project);
      }
    )
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
