import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet.model';

@Component({
  selector: 'app-reseau',
  templateUrl: './reseau.component.html',
  styleUrls: ['./reseau.component.scss']
})
export class ReseauComponent implements OnInit {
  dataProject? : Projet[];
  constructor() { }

  ngOnInit(): void {
  }

}
