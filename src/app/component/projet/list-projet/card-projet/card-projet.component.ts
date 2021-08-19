import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from 'src/app/models/projet.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjetService } from 'src/app/services/projet.service';
import { ProjetComponent } from '../../projet.component';

@Component({
  selector: 'app-card-projet',
  templateUrl: './card-projet.component.html',
  styleUrls: ['./card-projet.component.scss']
})
export class CardProjetComponent implements OnInit {
  @Input() projet?: Projet
  @Output() idToDelete = new EventEmitter<number>();
  constructor(
    private projetService: ProjetService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // const id:any = this.route.snapshot.paramMap.get("id");
    const id:any = this.authService.getCurrentUser()
    console.log(id)

    this.projetService.getById(id).subscribe(
      (projet: Projet) => {
        // this.userForm.patchValue(projet);
        console.log(projet);
      }
    )
  }



  deleteProj(id:any) {//fonction bouton de validation et d'envoi des infos
    // const projet = this.projetService.getProject(id);
    // console.log(projet);
    this.projetService.deletePost(id).subscribe(
      (project: Projet) => {
        console.log(project);
        console.log('delete reussie');
      }
    )
  }
  // deleteProj(id:any) {
  //   console.log("id projet: "+id);
  //   this.idToDelete.emit(id);
  // }
  // deleteProj(id:any) {
  //   id = this.route.snapshot.paramMap.get("id");
  //   // const userId:any = this.route.snapshot.paramMap.get("userId");
  //   console.log(id);
  //   this.projetService.deletePost(id).subscribe(
  //     (project: Projet) => {
  //       console.log(project);
  //       console.log('delete reussit');
  //       this.router.navigate(['/projet']);
  //     }
  //   )
  // }
}
