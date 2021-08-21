import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
          this.dataProject = user.projects;//je transfert les projets dans mon tableau
          console.log(user);
      }
    )
  }

  ngOnDestroy(){
    this.projectSubcription?.unsubscribe();
    console.log('destroy component project')
  }

  updateProj() {//fonction bouton de validation et d'envoi des infos
    console.log("update projet")
    const formValues = this.projectForm?.value;
    console.log(formValues);//recuperer l'objet
    this.projetService.updateProjet(formValues).subscribe(
      (project: any) => {
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
  }

  onDelete(id:number){//je filtre les projet une fois le delete executé
     this.dataProject = this.dataProject?.filter((data:any) => data.id != id)
  }
}
