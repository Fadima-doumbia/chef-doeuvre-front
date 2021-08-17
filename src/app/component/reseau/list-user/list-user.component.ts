import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserRequest } from 'src/app/payload/user.request';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  dataUser? : UserRequest[];
  userSub?: Subscription;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    // Pour charger et mettre à jour tout le temps
    this.userSub = this.userService.userSubject.subscribe(
      (resp: UserRequest[]) => {
        this.dataUser = resp;
      }
    )
  }

  getUsers() {
    this.userService.getAllUser().subscribe(
      (resp:UserRequest[]) => {
        this.dataUser = resp;
      }
    )
  }
}
