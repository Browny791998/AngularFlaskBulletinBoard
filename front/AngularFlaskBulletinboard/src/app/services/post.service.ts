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

  postDetail:any;


  //set Post
  setPost(data:any){
    this.postDetail = data;
  }

  //get Post
  getPost(){
    return this.postDetail;
  }

  createPost(post:any):Observable<Post>{
    return this.http.post<any>(
      this.apiURL + '/post/create',
      JSON.stringify(post),
      this.httpOptions
    )
  }

  updatePost(id: any, post: any): Observable<Post> {
    return this.http
      .put<Post>(
        this.apiURL + '/post/update/' + id,
        JSON.stringify(post),
        this.httpOptions
      )
  }

  deletePost(id:any){
    return this.http
    .delete<Post>(this.apiURL + '/post/delete/' +id,this.httpOptions)
  }

  getSinglePost(id:any): Observable<Post> {
    return this.http
       .get<Post>(this.apiURL + '/post/get/'+id,this.httpOptions)
       
   }


  getAllPosts():Observable<Post>{
    return this.http
    .get<Post>(this.apiURL + '/post/getAll',this.httpOptions)
   }
}


