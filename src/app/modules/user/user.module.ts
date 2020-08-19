import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EditUsersComponent } from './components/edit-users/edit-users.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

@NgModule({
  declarations: [ListUsersComponent, EditUsersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
})
export class UserModule { }
