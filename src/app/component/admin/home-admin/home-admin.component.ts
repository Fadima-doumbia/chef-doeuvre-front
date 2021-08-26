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
  dataUsers?: User[];
  dataProjet?: User[];
  userSubscription?: Subscription;
  projetSubscription?: Subscription;
  dataUser?: User[];


  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUser().subscribe(
      (users:User[]) => {
        console.log(this.dataUsers);
        const roles = ["ROLE_ADMIN"];
        this.dataUsers = users.filter((data:User) => !!data.roles?.find((role:any) => roles.includes(role.name)));//je filtre puis je verifie si mon role existe dans mon tableau
        console.log(this.dataUsers);
      }
    )
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

  tolowerRole(roleName:any){
    const role:any = {
      ROLE_ENTREPRENEUR: 'entrepreneur',
      ROLE_INVESTISSEUR: 'investisseur',
      ROLE_ADMIN: 'admin',
    }
    return role[roleName];
  }
}
