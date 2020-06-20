import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  getToken():string{
    return localStorage.getItem('token')
  }

  login(data:any):Observable<any>{
    return this.http.post(`http://localhost:3002/login`, { email:data.email, password:data.password});
  }

  signup(data:User):Observable<any>{
    return this.http.post(`http://localhost:3002/signup`, {
      email:data.email,
      password:data.password,
      address:data.address,
      name: data.name,
      age:data.age,
      sex:data.sex,
    });
  }
}
