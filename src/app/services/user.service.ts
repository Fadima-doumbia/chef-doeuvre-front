import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserRequest } from '../payload/user.request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = "http://localhost:8080/api/users"

  constructor(private httpClient: HttpClient) { }

  delete(id : number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }

  getById(id: number) {
    return this.httpClient.get<UserRequest>(`${this.baseUrl}/${id}`);
  }

  getByUsername(username: string) {
    return this.httpClient.get<UserRequest>(`${this.baseUrl}/${username}`);
  }

  create(newUser: UserRequest){
    const body=JSON.stringify(newUser);
    const formData=new FormData();
    for(const [key, value] of Object.entries(newUser)){
      formData.append(key,value)
    }
    console.log(body);
    return this.httpClient.post(this.baseUrl, newUser)
  }

  update(newValues:any): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + "/id" + newValues.id, newValues)
  }
}
