import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetail: any;
  apiURL = 'http://127.0.0.1:5000';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    }),
  };

  httpOptionsImg = {
    headers: new HttpHeaders({
      'Content-Type': 'image/jpeg',
      
    }),
  };

  constructor(private http:HttpClient) { }

   //set User
   setUser(data: any) {
    this.userDetail = data;
  }

  //get User
  getUser() {
    return this.userDetail;
  }

  //get all users
  getAllUsers(): Observable<User> {
    return this.http
       .get<User>(this.apiURL+'/user/getAll',this.httpOptions)
   }

   //upload
   uploadImage(formData:any):Observable<any>{
    return this.http
      .post<any>(this.apiURL+'/user/upload',formData)
   }

    // HttpClient API post() method => Create user
  createUser(user: any): Observable<User> {
    console.log(user);
    return this.http
      .post<any>(
        this.apiURL + '/user/create',
        JSON.stringify(user),
        this.httpOptions
      )
  }

  deleteUser(id:any){
    return this.http
    .delete<User>(this.apiURL + '/user/delete/' +id,this.httpOptions)
  }

  



}
