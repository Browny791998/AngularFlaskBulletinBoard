import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-confirm',
  templateUrl: './post-confirm.component.html',
  styleUrls: ['./post-confirm.component.css']
})
export class PostConfirmComponent implements OnInit {

  postDetail: any;
  postId = "";

  constructor(private postSvc:PostService,private router:Router) { }

  ngOnInit(): void {
    this.postDetail = this.postSvc.getPost();
    this.postId = this.postDetail.id;
  
  }

  CreatePost(){
    if(this.postId){
   
      this.postSvc.updatePost(this.postId,{
       
          title: this.postDetail.data.PostTitle,
          description: this.postDetail.data.PostDescription,
          status:this.postDetail.status
        
      }).subscribe((data: any) => {
        this.router.navigate(["posts"]);
    });
    
    }
    else{
      this.postSvc.createPost(
        {
          title:this.postDetail.data.PostTitle,
          description:this.postDetail.data.PostDescription,
         status:1
        }
      ).subscribe((data:any)=>{
        this.router.navigate(["posts"]);
      })
    }
  
  }
}
