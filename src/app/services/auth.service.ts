import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { UserRequest } from '../payload/user.request';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dev = false;
  URL_DEV = 'http://localhost:8080/api/auth';
  API_URL?: string
  private jwtHelper = new JwtHelperService();



  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserService
  ) {// this.API_URL = this.dev ? this.URL_DEV : this.URL_TEST;//pour dire si le dev utilise son ordinateur ou pas. si c'est le cas on utilise le localhost sinon on utilise l'url
  }//seul le dev se connecte avec le localhost tout les autres users utilisent le URL_TEST pour acceder au site
  // ***************************************************************************************************************************
  login(user: UserRequest) {
    return this.httpClient.post(`${this.URL_DEV}/login`, user)
    .pipe(
      map((resp: any) => {
        localStorage.setItem('TOKEN_APPLI', resp.accessToken);
        localStorage.setItem('USER_ID', resp.id);
        // console.log(localStorage.setItem('TOKEN_APPLI', resp.accessToken));
        console.log(resp.id);
        console.log('Token Save');
        return resp;
      })
    );
  }
//********************************************************************************************************************* */

  getUserIdToken() {
    const userId  = localStorage.getItem('USER_ID');
    if(userId){
      return parseInt(userId);
    }
    return null;
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
  getUserId(){
    const helper = new JwtHelperService;
    const decodedToken = helper.decodeToken(this.getToken());
    console.log(decodedToken);
    const id = parseInt(decodedToken.sub);
    return id;
  }

  // ********************************************************************************************************************************
  getUserTokenRole(){
    const token:any = localStorage.getItem("TOKEN_APPLI");
    const decode = this.jwtHelper.decodeToken(token);
    console.log( decode);
    if (decode !== null) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return { ...decode, token };
      } else {
        localStorage.removeItem('TOKEN_APPLI');
      }
    }
    return null;
  }


  // ***************************************************************************************************************************
  newAdmin(newAdmin: UserRequest) {
    return this.httpClient.post
    ('http://localhost:8080/api/auth/register', newAdmin)
  }

// ***************************************************************************************************************************
  register(newUser: UserRequest) {
    return this.httpClient.post
    (`http://localhost:8080/api/auth/register`, newUser)
  }

// ***************************************************************************************************************************
  logout() {
    localStorage.removeItem('TOKEN_APPLI');
    this.router.navigate(['/login']);
  }
}
