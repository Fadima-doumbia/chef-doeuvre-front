import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Projet } from 'src/app/models/projet.model';
import { User } from 'src/app/models/user';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.scss']
})
export class ListProjetComponent implements OnInit {
  @Input() user? : User;
  @Output() idToDelete = new EventEmitter<number>();

  constructor(
    private projetService: ProjetService
  ) { }

  ngOnInit(): void {
  }

  deleteProj(id:any) {
    console.log("id projet: "+id);
    this.idToDelete.emit(id);
  }

  deleteProject(id:number, userId:number){
    console.log("ok");
    this.projetService.deleteUserPost(id, userId).subscribe(
      (resp)=>console.log("suppression reussie")
    )
  }

}
