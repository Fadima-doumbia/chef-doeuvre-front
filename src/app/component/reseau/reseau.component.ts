import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Projet } from 'src/app/models/projet.model';
import { User } from 'src/app/models/user';
import { UserRequest } from 'src/app/payload/user.request';
import { ProjetService } from 'src/app/services/projet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reseau',
  templateUrl: './reseau.component.html',
  styleUrls: ['./reseau.component.scss']
})
export class ReseauComponent implements OnInit {
  dataProject? : Projet[];
  projectSub?: Subscription;
  userSub?: Subscription;
  userObject?: Subscription;
  dataUser: User | undefined;
  test = "mailto:farimadoubia@gmail.com"
  constructor(
    private projetService: ProjetService,
    private userService: UserService
  ) { }

  searchForm = new FormGroup({
    name: new FormControl('')
  });

  ngOnInit(): void {
    this.projectSub = this.projetService.getAllProject().subscribe(
      (resp: Projet[]) => {
        this.dataProject = resp;
        console.log(this.dataProject)
      }
    )

  }

  getProject() {
    this.projectSub = this.projetService.searchProject(this.searchForm.value).subscribe(
      (resp: Projet[]) => {
        this.dataProject = resp;
        console.log(this.dataProject)
      }
    )
  }

  getUser(id:any){
    this.userService.getUserById(id).subscribe(
      (user:User) => {
        this.dataUser = user;
        console.log(this.dataUser);
      }
    )


    // this.userService.getById(id).subscribe((user: User) => {
    //   this.user = user
    //   console.log(user)
    // });
  }


  onSubmit() {
    this.getProject();
  }
}
