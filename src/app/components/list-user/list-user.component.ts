import {Component, ViewChild, OnInit} from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { User} from '../../data/user';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.sass']
})
export class ListUserComponent implements OnInit {
  userData: any = [];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'birthdate', 'action'];


  constructor(private userApi: ApiService) {
      this.userApi.getUsers().subscribe(data => {
      this.userData = data;
      this.dataSource = new MatTableDataSource<User>(this.userData);
      this.ngAfterInit();
    });
  }

  ngOnInit() {
  }

  ngAfterInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
  }

  deleteUser(index: number, e) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(index, 1);
      this.dataSource.data = data;
      this.userApi.deleteUser(e.id).subscribe();
    }
  }
}

