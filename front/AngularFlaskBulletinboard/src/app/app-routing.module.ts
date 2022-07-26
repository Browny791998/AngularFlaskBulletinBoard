import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostConfirmComponent } from './posts/post-confirm/post-confirm.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

const routes: Routes = [
  {
    path:'posts',
    component:PostListComponent
  },
  {
    path:'post/create',
    component:PostCreateComponent
  },
  {
    path:'post/confirm',
    component:PostConfirmComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
