import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../data/user';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../shared/api.service';
import {getLocaleDateFormat} from '@angular/common';
import {DateFormatter} from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userArray: User[] = [];

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private api: ApiService
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.api.getUser(id).subscribe(data => {
      this.userArray = data;
      this.userForm = this.fb.group({
        name: [data.name, [Validators.required]],
        birthdate: [data.birthdate, [Validators.required]]
      });
    });
  }

  updateBookForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      birthdate: ['', [Validators.required]]
    });
  }


  formatDate(e) {
    const date = new Date(e.target.value);
    date.setTime( date.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
    date.toISOString().substring(0, 10);
    this.userForm.get('birthdate').setValue( date, {
      onlyself: true
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  updateUserForm() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    const user: User = new User();
    user.setId(Number(id));
    user.setBirthdate(this.userForm.get('birthdate').value);
    user.setName(this.userForm.get('name').value);
    if (window.confirm('Are you sure you want to update')) {
      this.api.updateUser(user).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/list-user'));
      });
    }
  }
}
