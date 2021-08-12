import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-projet',
  templateUrl: './card-projet.component.html',
  styleUrls: ['./card-projet.component.scss']
})
export class CardProjetComponent implements OnInit {
  @Input() name? : string;
  @Input() description? : string;
  @Input() id? : string;
  @Input() entrepreneur? : string;
  @Input() besoin? : string;
  @Input() dateD? : Date;
  constructor() { }

  ngOnInit(): void {
  }

}
