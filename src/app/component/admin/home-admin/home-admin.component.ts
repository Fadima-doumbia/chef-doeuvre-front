import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Projet } from 'src/app/models/projet.model';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProjetService } from 'src/app/services/projet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  dataUser?: User[];
  dataProjet?: User[];
  userSubscription?: Subscription;
  projetSubscription?: Subscription;

  constructor(
    private projetService: ProjetService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser();

    // this.projetSubscription = this.projetService.projectSubject.subscribe(
    //   (resp: Projet[]) => {
    //     this.dataProjet = resp;
    //   }
    // )

      // *************************************************************************************

      this.userSubscription = this.projetService.projectSubject.subscribe(
      (resp: User[]) => {
        this.dataUser = resp;
      }
    )
  }

  getUser() {
    this.userService.getAllUser().subscribe(
      (resp:User[]) => {
        this.dataUser = resp;
      }
    )
  }

  tolowerRole(roleName:any){
    const role:any = {
      ROLE_ENTREPRENEUR: 'entrepreneur',
      ROLE_INVESTISSEUR: 'investisseur',
      ROLE_ADMIN: 'admin',
    }
    return role[roleName];
  }

  // getProject() {
  //   this.projetService.getAllProject().subscribe(
  //     (resp:Projet[]) => {
  //       this.dataProjet = resp;
  //     }
  //   )
  // }
}
