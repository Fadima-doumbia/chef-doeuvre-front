import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserRequest } from 'src/app/payload/user.request';
import { ProjetService } from 'src/app/services/projet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  dataUser?: User[];
  dataProjet?: User[];
  userSubscription?: Subscription;
  projetSubscription?: Subscription;
  users$: Observable<Array<UserRequest>> | undefined;

  constructor(
    private projetService: ProjetService,
    private userService: UserService,
    private route: ActivatedRoute
    // private router: Route
  ) { }

  ngOnInit(): void {
      this.users$ = this.userService.getAllUser().pipe(
        map(users=> users.filter(user => user.role == 'USER'))
      );

    // const id:any = this.route.snapshot.paramMap.get("id")

    // this.projetService.getById(id).subscribe(
    //   (user: User) => {
    //     this.userService.delete(id)
    //   })
    //*************************************************************************************
      this.getUsers();
      this.userSubscription = this.projetService.projectSubject.subscribe(
      (resp: User[]) => {
        this.dataUser = resp;
      }
    )
  }

  getUsers() {
    this.userService.getAllUser().subscribe(
      (resp:User[]) => {
        this.dataUser = resp;
      }
    )
  }

  getUser(){
    const id:any = this.route.snapshot.paramMap.get("id")
    const user:any = this.userService.getById(id);
    console.log(user);
  }

  tolowerRole(roleName:any){
    const role:any = {
      ROLE_ENTREPRENEUR: 'entrepreneur',
      ROLE_INVESTISSEUR: 'investisseur',
      ROLE_ADMIN: 'admin',
    }
    return role[roleName];
  }

  deleteUser() {//fonction bouton de validation et d'envoi des infos
    const id:any = this.route.snapshot.paramMap.get("id")
    console.log(id);//recuperer l'objet
    this.projetService.deletePost(id).subscribe(
      (user: User) => {
        console.log(user);
        console.log('delete reussit');
        // this.router.navigate(['/projet']);
      }
    )
  }
}
