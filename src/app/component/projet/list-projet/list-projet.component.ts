import { Component, Input, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet.model';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.scss']
})
export class ListProjetComponent implements OnInit {
  @Input() user? : User;

  constructor() { }

  ngOnInit(): void {
  }

}
