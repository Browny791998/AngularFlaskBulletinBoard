import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: any = [];
  originalUsers: any = []
  searchByName: String = " ";
  searchByEmail: String = " ";
  dataSource: any;
  createdFrom: any;
  createdTo: any;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  displayedColumns: string[] = ['username', 'email', 'created_user_id', 'phone', 'dob', 'address', 'createdAt', 'updatedAt', 'Modification'];

  // Get user list
  async loadUsers() {

    return await this.userSvc.getAllUsers().subscribe((data: any) => {
      this.users = data
      this.originalUsers = data
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
