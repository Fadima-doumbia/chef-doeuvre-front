import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Projet } from '../../models/projet.model';
import { ProjetService } from '../../services/projet.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
  dataProject? : Projet[];
  user?: User;
  projectSubcription? : Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
      const id = this.authService.getCurrentUser();
    this.projectSubcription = this.userService.getById(id)
      .subscribe((user:User) => {
          this.user = user;
          this.dataProject = user.projects;//je transfert les projets dans mon tableau
          console.log(user);
      }
    )
  }

  ngOnDestroy(){
    this.projectSubcription?.unsubscribe();
    console.log('destroy component project')
  }

  onDelete(id:number){//je filtre les projet une fois le delete executé
    this.dataProject = this.dataProject?.filter((data:any) => data.id != id)
  }
}
