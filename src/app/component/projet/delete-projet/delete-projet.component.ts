import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Projet } from 'src/app/models/projet.model';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-delete-projet',
  templateUrl: './delete-projet.component.html',
  styleUrls: ['./delete-projet.component.scss']
})
export class DeleteProjetComponent implements OnInit {
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
      })
  }

  deleteProj() {//fonction bouton de validation et d'envoi des infos
    const id:any = this.route.snapshot.paramMap.get("id")
    console.log(id);//recuperer l'objet
    this.projetService.deletePost(id).subscribe(
      (project: Projet) => {
        console.log(project);
        console.log('delete reussit');
        this.router.navigate(['/projet']);
      }
    )
  }

  onSubmit() {
    const formValues:any = this.projetForm?.value;
    console.log(formValues);
    this.projetService.deletePost(formValues).subscribe(
      (resp: any) => {
        return resp
        console.log('reussit');
        this.router.navigate(['/projet']);
      },
      (error) => {
        return error;
        console.log('faild');
      }
    );
  }
}
