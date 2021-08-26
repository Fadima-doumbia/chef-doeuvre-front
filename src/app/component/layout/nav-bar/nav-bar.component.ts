import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user: User | undefined;
  admin: User | undefined;
  roleObj:any = "";
  role: any;
  varRole:any;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.isAdmin();
    this.isEntrepreneur();
  }

  getUser(){
    const id = this.authService.getUserIdToken();
    // console.log(id)
    if(id){
      this.userService.getById(id).subscribe((user: User) => {
        this.user = user
        // console.log(user)
        this.roleObj = user.roles
        // console.log(this.roleObj[0].name) ;
         this.role = this.roleObj[0].name;
         return this.role;
      });
    }
  }

  isAdmin(){
    // console.log(this.authService.getUserTokenRole().roles[0].authority)
    // console.log(this.authService.getUserTokenRole().roles[0].authority == 'ROLE_ADMIN')
    return(this.authService.getUserTokenRole().roles[0].authority == 'ROLE_ADMIN')
  }

  isEntrepreneur(){
    // console.log(this.authService.getUserTokenRole().roles[0].authority)
    // console.log(this.authService.getUserTokenRole().roles[0].authority == "ROLE_ENTREPRENEUR")
    return(this.authService.getUserTokenRole().roles[0].authority == "ROLE_ENTREPRENEUR")
  }
}
