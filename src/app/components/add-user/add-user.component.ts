import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../shared/api.service';
import {moment} from 'ngx-bootstrap/chronos/test/chain';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  ngOnInit() {
    this.updateBookForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private api: ApiService
  ) {
      this.userForm = this.fb.group({
        name: ['', [Validators.required]],
        birthdate: ['', [Validators.required]]
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
    this.userForm.get('birthdate').setValue(date, {
      onlyself: true
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  insertUserForm() {
    if (window.confirm('Are you sure you want to create a new user?')) {
      this.api.addUser(this.userForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/list-user'));
      });
    }
  }
}
