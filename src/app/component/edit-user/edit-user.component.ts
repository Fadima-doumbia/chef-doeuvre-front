import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  dataUser? : User[];

  constructor(
    private userService: UserService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  userForm = new FormGroup({//mon objet de declaration des champs de mon formulaire
    name : new FormControl(''),
    description : new FormControl(''),
    entrepreneur : new FormControl('', Validators.required),
    besoin: new FormControl('', Validators.required),
    dateD: new FormControl(""),
    id: new FormControl(""),
    userId: new FormControl("")
  });

  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get("id")

    this.userService.getById(id).subscribe(
      (user: User) => {
        this.userForm.patchValue(user);
      })
  }

  updateUpdate() {//fonction bouton de validation et d'envoi des infos
    const formValues = this.userForm?.value;
    console.log(formValues);//recuperer l'objet
    this.userService.updateUser(formValues).subscribe(
      (user: User) => {
        console.log(user);
        console.log('update reussit');
        this.router.navigate(['/projet']);
      }
    )
  }

  // ngOnDestroy() {
  //   this.projetService?.unsubscribe();
  //   console.log('Destroy component feature');
  // }

  onSubmit() {
    const formValues:any = this.userForm?.value;
    console.log(formValues);
    this.userService.updateUser(formValues).subscribe(
      (resp: any) => {
        console.log('reussit');
        this.router.navigate(['/projet']);
      },
      (error) => {
        console.log('faild');
      }
    );
  }
}
