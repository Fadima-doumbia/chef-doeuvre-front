import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [
    {
      id : 1,
      username : "nomProjet",
      firstname : "nomProjet",
      lastname : "nomProjet",
      telephone : 094567832,
      entrepreneur : "fadimou",
      email : "nathan@gmail.materiel",
      presentation : "sxcfc 01-04-2021",
      pays : "sxcfc 01-04-2021",
      password : "sxcfc 01-04-2021"
    },
    {
      id : 2,
      name : "nomProjet2",
      username : "nomProjet",
      firstname : "nomProjet",
      lastname : "nomProjet",
      telephone : 094567832,
      entrepreneur : "fadimou",
      email : "nathan@gmail.materiel",
      presentation : "sxcfc 01-04-2021",
      pays : "sxcfc 01-04-2021",
      password : "sxcfc 01-04-2021"
    },
    {
      id : 3,
      name : "nomProjet2",
      username : "nomProjet",
      firstname : "nomProjet",
      lastname : "nomProjet",
      telephone : 094567832,
      entrepreneur : "fadimou",
      email : "nathan@gmail.materiel",
      presentation : "sxcfc 01-04-2021",
      pays : "sxcfc 01-04-2021",
      password : "sxcfc 01-04-2021"
    }
  ]

  private baseUrl: string = "http://localhost:8080/api/users"
  userSubject = new Subject<any[]>();
  userObject$ = new Subject<User[]>();

  constructor(private httpClient: HttpClient) { }

  addUser(){
    const newUser = {
      id : this.users.length+1,
      name : "nomProjet",
      username : "nomProjet",
      firstname : "nomProjet",
      lastname : "nomProjet",
      telephone : 094567832,
      entrepreneur : "fadimou",
      email : "nathan@gmail.materiel",
      presentation : "sxcfc 01-04-2021",
      pays : "sxcfc 01-04-2021",
      password : "sxcfc 01-04-2021"
    }
    this.users.push(newUser);
    console.log(this.users);
    this.emitDataUser();
  }

  emitDataUser(){
    this.userSubject.next(this.users.slice());
    console.log('emit data');
  }

  deletePost(id : number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }

  getUser() {
    this.httpClient.get(`${this.baseUrl}`).subscribe(
      (listUser: any) => {
        this.userObject$.next(listUser);
      },
      err => {
        console.error(err)
      },
      () => console.log('fini')
    )
  }

  getBookById(id: number) {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  postUser(newUser: User){
    const body=JSON.stringify(newUser);
    const formData=new FormData();
    for(const [key, value] of Object.entries(newUser)){
      formData.append(key,value)
    }
    console.log(body);
    return this.httpClient.post(this.baseUrl, newUser)
  }

  modify(newValues:any): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + "/id" + newValues.id, newValues)
  }
}
