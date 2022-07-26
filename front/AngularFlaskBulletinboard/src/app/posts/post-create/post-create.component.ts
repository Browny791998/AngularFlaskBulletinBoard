import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private fb:FormBuilder,public postSvc:PostService,private router:Router,private route:ActivatedRoute) { }

  action="Create";
  posts: any;
  postDetail: any;
  postId: any;
  status: any;
  error = null;

  postForm = this.fb.group({
    PostTitle: ['', [Validators.required, Validators.maxLength(255)]],
    PostDescription: ['', [Validators.required]],
    PostStatus: ['']
  });

  get Title() {
    return this.postForm?.get('PostTitle');
  }
  get Description() {
    return this.postForm?.get('PostDescription');
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.queryParams['postId'];
    this.getPostDetail();
  }

  
  async getPostDetail() {
    if (this.postId) {
      this.action="Edit";
      return await this.postSvc.getSinglePost(this.postId).subscribe((data: any) => {
        this.postDetail = data.data;
        this.status = this.postDetail.attributes.PostStatus;
        this.postForm.get("PostDescription")?.setValue(this.postDetail.attributes.PostDescription);
        this.postForm.get("PostTitle")?.setValue(this.postDetail.attributes.PostTitle);
      });
    }
    else {
      // this.postDetail = await this.postService.getPost();
      // const postData = this.postDetail;
      // if (postData?.data.PostTitle && postData?.data.PostDescription) {
      //   this.postForm.get("PostDescription")?.setValue(postData.data.PostDescription);
      //   this.postForm.get("PostTitle")?.setValue(postData.data.PostTitle);
      // } else {
      //   this.postForm.get("PostDescription")?.setValue("");
      //   this.postForm.get("PostTitle")?.setValue("");
      // }
      // return;
    }
  }


  Add() {
    this.postSvc.setPost({
      data: this.postForm.value
    });
    this.router.navigate(["post/confirm"]);
  }

}
