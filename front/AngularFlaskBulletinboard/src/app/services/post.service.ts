import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/models/post';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  apiURL = 'http://127.0.0.1:5000';
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllPosts():Observable<Post>{
    return this.http
    .get<Post>(this.apiURL + '/post/getAll',this.httpOptions)
   }
}


