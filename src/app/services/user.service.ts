import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Projet } from '../models/projet.model';
import { User } from '../models/user';
import { SearchProjetRequest } from '../payload/search-projet.request';
import { UserRequest } from '../payload/user.request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = "http://localhost:8080/api/users"

  userSubject = new Subject<User[]>();

  constructor(private httpClient: HttpClient) { }
// mettre a jour le tableau
  // emitUserSubject(){
  //   this.getAllUser().subscribe(
  //     (resp:any) => {
  //       this.userSubject.next(resp);
  //     }
  //   )
  // }

  create(newUser: UserRequest){
    const body=JSON.stringify(newUser);
    const formData=new FormData();
    for(const [key, value] of Object.entries(newUser)){
      formData.append(key,value)
    }
    console.log(body);
    return this.httpClient.post(this.baseUrl, newUser)
  }

  getById(id: number) {
    return this.httpClient.get<UserRequest>(`${this.baseUrl}/${id}`);
  }

  getAllUser():Observable<Array<UserRequest>>  {
    return this.httpClient.get<Array<UserRequest>>(`${this.baseUrl}`);
  }

  getByUsername(username: string) {
    return this.httpClient.get<UserRequest>(`${this.baseUrl}/${username}`);
  }

  searchUser(search: SearchProjetRequest){
    return this.httpClient.post<Array<User>>(`${this.baseUrl}/searchProject`, search);
  }

  updateUser(updateUser: User) {
    return this.httpClient.put(`${this.baseUrl}`, updateUser);
  }
  
  delete(id : number){
    return this.httpClient.delete("http://localhost:8080/api/users/delete/" + id);
  }
}
