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
  ) { }

  userForm = new FormGroup({
    username : new FormControl(''),
    email : new FormControl(''),
    presentation : new FormControl('')
  })

  ngOnInit(): void {
    const id:any = this.authService.getUserIdToken();
    this.userService.getById(id).subscribe(
      (user: User) => {
        this.userForm.patchValue(user);
        console.log(user);
      }
    )
  }

  updateUser() {
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
}

