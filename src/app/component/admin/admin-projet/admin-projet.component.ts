import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Projet } from 'src/app/models/projet.model';
import { User } from 'src/app/models/user';
import { ProjetService } from 'src/app/services/projet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-projet',
  templateUrl: './admin-projet.component.html',
  styleUrls: ['./admin-projet.component.scss']
})
export class AdminProjetComponent implements OnInit {
  dataProject? : Projet[];
  projectSub?: Subscription;
  // dataUser: User | undefined;


  constructor(
    private projetService: ProjetService,
    // private userService: UserService,
    private route: ActivatedRoute
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

  // getUser(id:any){
  //   this.userService.getUserById(id).subscribe(
  //     (user:User) => {
  //       this.dataUser = user;
  //       console.log(this.dataUser);
  //     }
  //   )
  // }

  deleteProj(id:any) {
    confirm('Voulez supprimer le projet');
    // id = this.route.snapshot.paramMap.get("id")
    this.projetService.deleteUserPost(id).subscribe(
      () => {
        this.dataProject = this.dataProject?.filter((data:any) => data.id != id)
        console.log('delete reussie');
      }
    )
  }

  toBack(event:any){//permet de revenir en haut
    window.scrollTo(0,0);//permet de definir l'endroit exact (en px) pour revenir dans la page
    event.preventDefault();
  }
}
