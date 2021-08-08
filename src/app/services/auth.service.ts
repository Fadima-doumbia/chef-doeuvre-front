import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dev = false;
  URL_DEV = 'http://localhost:9000/api/auth';
  // URL_TEST = 'https://test-node-jb.herokuapp.com/api';
  API_URL?: string
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    // this.API_URL = this.dev ? this.URL_DEV : this.URL_TEST;//pour dire si le dev utilise son ordinateur ou pas. si c'est le cas on utilise le localhost sinon on utilise l'url
  }//seul le dev se connecte avec le localhost tout les autres users utilisent le URL_TEST pour acceder au site


  // ***************************************************************************************************************************
  login(user: User) {
    return this.httpClient.post(`${this.URL_DEV}/login`, user)
    .pipe(
      map((resp: any) => {
        localStorage.setItem('TOKEN_APPLI', resp.token);
        localStorage.setItem('USER_ID', resp.userId);
        console.log('Token Save');
        return resp;
      })
    );
  }
  // ***************************************************************************************************************************
    getToken(){
      const token:any =localStorage.getItem('TOKEN_APPLI');
      console.log(token)
      if(token){
        return token;
      }
    }
  // ***************************************************************************************************************************
    getCurrentUser(){
      const user_id:any =localStorage.getItem('USER_ID');
      if(user_id){
        return user_id;
      }
    }
  // ***************************************************************************************************************************
  // getToken(){
  //   const token =localStorage.getItem('TOKEN_APPLI')
  //   console.log(token)
  //   if(token){
  //     return token;
  //   }
  // }

  // ***************************************************************************************************************************
  // getUserId(){
  //   const helper = new JwtHelperService();
  //   const decodedToken = helper.decodeToken(this.getToken());
  //   const id = parseInt(decodedToken.sub);
  //   return id;
  // }

  // ***************************************************************************************************************************
  newAdmin(newAdmin: User) {
    return this.httpClient.post<any>('http://localhost:8080/api/auth/register', newAdmin)
  }

// ***************************************************************************************************************************
  register(newUser: User) {
    return this.httpClient.post(`${this.URL_DEV}/register`, newUser)
  }

// ***************************************************************************************************************************
  logout() {
    localStorage.removeItem('TOKEN_APPLI');
    this.router.navigate(['/login']);
  }
}
