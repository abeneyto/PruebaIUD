import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { User} from '../../data/user';
import { MatPaginator, MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.sass']
})
export class ListUserComponent implements OnInit {

  userData: any = [];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'birthdate', 'action'];

  constructor(private userApi: ApiService) {
      this.userApi.getUsers().subscribe(data => {
      this.userData = data;
      this.dataSource = new MatTableDataSource<User>(this.userData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() { }

  deleteUser(index: number, e) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(index, 1);
      this.dataSource.data = data;
      this.userApi.deleteUser(e.id).subscribe();
    }
  }
}

