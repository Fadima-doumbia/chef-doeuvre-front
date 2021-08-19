import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Projet } from '../../models/projet.model';
import { ProjetService } from '../../services/projet.service';

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.scss']
})
export class AddProjetComponent implements OnInit {
  dataProject? : Projet[];
  projectSubcription? : Subscription;

  selectFile:any =null;

  constructor(
    private projetService: ProjetService,
    private authService: AuthService,
    private router : Router
  ) {}

  projetForm = new FormGroup({//mon objet de declaration des champs de mon formulaire
      name : new FormControl('toto'),
      description : new FormControl('tata'),
      entrepreneur : new FormControl('tutu', Validators.required),
      besoin: new FormControl('loulou', Validators.required),
      dateD: new FormControl("2021-12-12"),
      userId: new FormControl()
  });


  ngOnInit(): void {
    const id = this.authService.getUserIdToken();
    this.projetForm.patchValue({userId:id})
  }

  ngOnDestroy(){
    this.projectSubcription?.unsubscribe();
    console.log('destroy component project')
  }

  addphoto(event:any){
    this.selectFile = event.target.files[0];
   // console.log(this.selectFile);
  }

  onSubmit() {
    const formValues:any = this.projetForm?.value;
    console.log(formValues);
    this.projetService.addProject(formValues).subscribe(
      (resp: any) => {
        console.log('reussit');
        this.router.navigate(['/projet']);
      },
      (error) => {
        console.log(error)
        console.log('faild');
      }
    );
  }
}
