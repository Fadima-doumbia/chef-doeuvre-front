import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  searchForm = new FormGroup({
    name: new FormControl('')
  });

  ngOnInit(): void {
    //*************************************************************************************

    this.users$ = this.userService.getAllUser().pipe(
      map(users=> users.filter(user => user.role == 'USER'))
    );

    //*************************************************************************************
    this.userSubscription = this.userService.getAllUser().subscribe(
      (resp: User[]) => {
        this.dataUser = resp;
        console.log(this.dataUser)
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

  deleteUser(user: any) {
    this.userService.delete(user.id).subscribe(
      (user: User) => {
        console.log(user);
        console.log('delete reussit');
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
}
