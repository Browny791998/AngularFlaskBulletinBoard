import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.css']
})
export class UserConfirmComponent implements OnInit {
 
  userDetail:any;
  constructor(private userSvc: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.userDetail = this.userSvc.getUser();
  }

  hashPassword(password: string) {
    return "*".repeat(password.length)
  }

  async createConfirm() {
    
// var image =new Image();
//   image.src=this.userDetail.profile;
  
      this.userSvc.createUser(
        {
          name: this.userDetail.data.Name,
          email: this.userDetail.data.Email,
          password: this.userDetail.data.Password,
          profile_photo:this.userDetail.profile,
          type:this.userDetail.data.Type.toString(),
          phone: this.userDetail.data.Phone,
          address: this.userDetail.data.Address,
          dob: moment(this.userDetail.data.DOB).format("YYYY-MM-DD"),
          fileName:this.userDetail.file.name
        }).subscribe((data: any) => {
             this.router.navigate(['users']);
        });
  }

}
