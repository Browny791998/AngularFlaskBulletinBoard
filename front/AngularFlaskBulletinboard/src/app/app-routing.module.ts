import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostConfirmComponent } from './posts/post-confirm/post-confirm.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { UserConfirmComponent } from './users/user-confirm/user-confirm.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UsersListComponent } from './users/users-list/users-list.component';

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
  {
    path:'post/confirm',
    component:PostConfirmComponent
  },
  {
    path:'user/create',
    component:UserCreateComponent
  },
  {
    path:'users',
    component:UsersListComponent
  },
  {
    path:'user/confirm',
    component:UserConfirmComponent
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
