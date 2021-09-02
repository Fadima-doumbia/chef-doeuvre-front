import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  ) { }

  searchForm = new FormGroup({
    name: new FormControl('')
  });

  ngOnInit(): void {
    this.getUsers();
  }

  tolowerRole(roleName:any){
    const role:any = {
      ROLE_MODERATOR: 'entrepreneur',
      ROLE_USER: 'investisseur',
      ROLE_ADMIN: 'admin',
    }
    return role[roleName];
  }

  deleteUser(user: any) {
    console.log(user);
    this.userService.delete(user.id).subscribe(
      (user: User) => {
        console.log(user);
        this.dataUser = this.dataUser?.filter((data:any) => data.id != user.id);
        console.log('delete reussit');
      }
    )
  }

  getUsers() {
    this.userService.getAllUser().subscribe(
      (users:User[]) => {
        const roles = ["ROLE_MODERATOR", "ROLE_USER"];
        this.dataUsers = users.filter((data:User) =>
        !!data.roles?.find((role:any) => roles.includes(role.name)));
        console.log(this.dataUsers);
      }
    )
  }


  toBack(event:any){//permet de revenir en haut
    window.scrollTo(0,0);//permet de definir l'endroit exact (en px) pour revenir dans la page
    event.preventDefault();
  }
}
