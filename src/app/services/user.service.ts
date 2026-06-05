import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://flasksavingstracker.onrender.com/api/users';

  constructor(private http:HttpClient){}

  createUser(user:User):Observable<User>{
    return this.http.post<User>(this.apiUrl,user)
  }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }
}
