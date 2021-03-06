import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserRequest } from 'src/app/payload/user.request';
import { AuthService } from 'src/app/services/auth.service';
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
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id:any = this.authService.getUserIdToken();
    this.userService.getById(id).subscribe(
      (user: User) => {
        this.userForm.patchValue(user);
        console.log(user);
      }
    )
  }

  userForm = new FormGroup({
    id : new FormControl(''),
    username : new FormControl(''),
    email : new FormControl(''),
    presentation : new FormControl('')
  })

  ngOnInit(): void {  }

  updateUser() {
    const formValues = this.userForm?.value;
    console.log(formValues);
    this.userService.updateUser(formValues).subscribe(
      (user: User) => {
        console.log(user);
        this.router.navigate(['/profil']);
        console.log("update profil reussie");
      }
    )
  }
}

/*

  getUser(){
    const id = this.authService.getUserIdToken();
    if(id){
      this.userService.getById(id).subscribe((user: User) => {
        this.user = user
        console.log(user)
      });
    }
  }



  updateUser() {
    const id = this.authService.getUserIdToken();
    if(id){
      this.userService.getById(id).subscribe((user: User) => {
        this.user = user
        console.log(user)
        this.userService.updateUser(user).subscribe(
          (user: User) => {
            console.log(user);
            this.router.navigate(['/home']);
            console.log("update profil reussie");
          }
        )
      });
    }
    const formValues = this.userForm?.value;
    console.log(formValues);
    this.userService.updateUser(formValues).subscribe(
      (user: User) => {
        console.log(user);
        this.router.navigate(['/home']);
        console.log("update profil reussie");
      }
    )
  }
*/

