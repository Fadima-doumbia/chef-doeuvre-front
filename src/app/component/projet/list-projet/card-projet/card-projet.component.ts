import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from 'src/app/models/projet.model';
import { ProjetService } from 'src/app/services/projet.service';
import { ProjetComponent } from '../../projet.component';

@Component({
  selector: 'app-card-projet',
  templateUrl: './card-projet.component.html',
  styleUrls: ['./card-projet.component.scss']
})
export class CardProjetComponent implements OnInit {
  @Input() projet?: Projet
  constructor(
    private projetService: ProjetService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  deleteProj(id:any) {
    console.log(id);
    this.projetService.deletePost(id).subscribe(
      (project: Projet) => {
        console.log(project);
        console.log('delete reussit');
        this.router.navigate(['/projet']);
      }
    )
  }
}
