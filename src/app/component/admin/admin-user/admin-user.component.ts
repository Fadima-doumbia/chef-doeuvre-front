import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  dataUsers?: User[];
  dataUser?: User[];
  dataProjet?: User[];
  userSubscription?: Subscription;
  projetSubscription?: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  searchForm = new FormGroup({
    name: new FormControl('')
  });

  ngOnInit(): void {
    this.getUsers();
    // Pour charger et mettre à jour tout le temps
    this.userSubscription = this.userService.userSubject.subscribe(
      (resp: User[]) => {
        this.dataUser = resp;
      }
    )

  }

  getUser() {
    this.userSubscription = this.userService.searchUser(this.searchForm.value).subscribe(
      (resp: User[]) => {
        this.dataUser = resp;
        console.log(this.dataUser)
      }
    )
  }

  onSubmit() {
    this.getUser();
  }

  getUsers() {
    this.userService.getAllUser().subscribe(
      (users:User[]) => {
        const roles = ["ROLE_ENTREPRENEUR", "ROLE_INVESTISSEUR"];
        console.log(users);
        this.dataUsers = users.filter((data:User) =>
        !!data.roles?.find((role:any) => roles.includes(role.name)));
      }
    )
  }

  tolowerRole(roleName:any){
    const role:any = {
        ROLE_ENTREPRENEUR: 'Entrepreneur',
        ROLE_INVESTISSEUR: 'Investisseur',
        ROLE_ADMIN: 'Admin',
    }
    return role[roleName];
  }

  deleteUser(user: any) {
    this.userService.delete(user.id).subscribe(
      (user: User) => {
        console.log(user);
        this.dataUser = this.dataUser?.filter((data:any) => data.id != user.id);
        console.log('delete reussit');
      }
    )
  }

  toBack(event:any){//permet de revenir en haut
    window.scrollTo(0,0);//permet de definir l'endroit exact (en px) pour revenir dans la page
    event.preventDefault();
  }
}
