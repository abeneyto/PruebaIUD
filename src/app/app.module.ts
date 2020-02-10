import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
