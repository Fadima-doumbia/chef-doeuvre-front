import { Component, Input, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet.model';

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.scss']
})
export class ListProjetComponent implements OnInit {
  @Input() listProject? : Projet[];

  constructor() { }

  ngOnInit(): void {
  }

}
