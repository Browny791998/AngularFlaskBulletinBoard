import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
 posts:any = [];
 dataSource:any;

 @ViewChild(MatSort,{static:true}) sort!:MatSort;
 @ViewChild(MatPaginator,{static:true}) paginator!:MatPaginator;
  constructor(private postSvc:PostService,private router:Router) { }

  ngOnInit(): void {
      this.loadPosts();
  }

  displayedColumns:string[] = ['Title','Description','CreatedAt','Modification'];

  async loadPosts(){
    return await this.postSvc.getAllPosts().subscribe((data:any)=>{
       this.posts = data;
       this.dataSource = new MatTableDataSource(this.posts);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sortingDataAccessor = (item: any, property: any) => {
        switch (property) {
          case 'Title': return item.title;
          case 'Description': return item.description;
          case 'CreatedAt': return item.created_at;
          
          default: return item[property];
        }
      };
       this.dataSource.sort = this.sort;
    })
  }

onAdd(){
  this.router.navigate(['post/create']);
}

onDelete(id: any) {
  if (window.confirm('Are you sure, you want to delete?')) {
    this.postSvc.deletePost(id).subscribe((data) => {
      this.loadPosts();
    });
  }
}

onUpdate(id: any) {
  this.router.navigate(['/post/create'], { queryParams: { postId: id } });
}

}
