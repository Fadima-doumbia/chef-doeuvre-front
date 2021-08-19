import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Projet } from 'src/app/models/projet.model';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-edit-projet',
  templateUrl: './edit-projet.component.html',
  styleUrls: ['./edit-projet.component.scss']
})
export class EditProjetComponent implements OnInit {
  dataProject? : Projet[];

  constructor(
    private projetService: ProjetService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  projetForm = new FormGroup({//mon objet de declaration des champs de mon formulaire
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

    this.projetService.getById(id).subscribe(
      (projet: Projet) => {
        this.projetForm.patchValue(projet);
      }
    )
  }

  updateProj() {//fonction bouton de validation et d'envoi des infos
    const formValues = this.projetForm?.value;
    console.log(formValues);//recuperer l'objet
    this.projetService.updateProjet(formValues).subscribe(
      (project: Projet) => {
        console.log(project);
        console.log('update reussie');
        this.router.navigate(['/projet']);
      }
    )
  }

  // ngOnDestroy() {
  //   this.projetService?.unsubscribe();
  //   console.log('Destroy component feature');
  // }

  // onSubmit() {
  //   const formValues:any = this.projetForm?.value;
  //   console.log(formValues);
  //   this.projetService.addProject(formValues).subscribe(
  //     (resp: any) => {
  //       console.log('reussit');
  //       this.router.navigate(['/projet']);
  //     },
  //     (error) => {
  //       console.log('faild');
  //     }
  //   );
  // }
}
