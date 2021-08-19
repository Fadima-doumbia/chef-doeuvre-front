import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserRequest } from 'src/app/payload/user.request';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {
  dataUsers?: User[];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  userForm = new FormGroup({
    username : new FormControl(''),
    email : new FormControl(''),
    presentation : new FormControl('')
  })

  ngOnInit(): void {
    // const id:any = this.route.snapshot.paramMap.get("id")

    // this.userService.getById(id).subscribe(
    //   (user: UserRequest) => {
    //     this.userForm.patchValue(user);
    //   }
    // )
    this.updateUser;
  }
  // updateProj() {//fonction bouton de validation et d'envoi des infos
  //   const formValues = this.projetForm?.value;
  //   console.log(formValues);//recuperer l'objet
  //   this.projetService.updateProjet(formValues).subscribe(
  //     (project: Projet) => {
  //       console.log(project);
  //       console.log('update reussie');
  //       this.router.navigate(['/projet']);
  //     }
  //   )
  // }
  updateUser() {
    const formValues = this.userForm?.value;
    console.log(formValues);
    this.userService.updateUser(formValues).subscribe(
      (user: UserRequest) => {
        console.log(user);
        console.log("update reussie");
        this.router.navigate(['/home']);
      }
    )
  }
}
