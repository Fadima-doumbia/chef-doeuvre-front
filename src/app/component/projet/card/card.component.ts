import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Projet } from 'src/app/models/projet.model';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() projet?: Projet;
  @Output() idToDelete = new EventEmitter<number>();

  constructor(
    private projetService: ProjetService,
    private router: Router,private route: ActivatedRoute
  ) { }

  ngOnInit(): void { }

  addNewItem(value: string) {
  }

  deleteProj(id:any) {
    confirm('Voulez supprimer le projet');
    this.projetService.deletePost(id).subscribe(
      () => {
        this.idToDelete.emit(id);
        console.log('delete reussie');
      }
    )
  }

}
