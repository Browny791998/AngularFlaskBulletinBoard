import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
}
