import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserRequest } from 'src/app/payload/user.request';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User | undefined;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.authService.getUserIdToken();
    console.log(id)
    if(id){
        this.userService.getById(id).subscribe((user: User) => {
          this.user = user
        });
    }
  }

  tolowerRole(roleName:any){
    const role:any = {
      // ROLE_MODERATOR: 'modérateur',
      // ROLE_USER: 'utilisateur',
      ROLE_ENTREPRENEUR: 'entrepreneur',
      ROLE_INVESTISSEUR: 'investisseur',
      ROLE_ADMIN: 'admin',
    }
    return role[roleName];
  }
}
