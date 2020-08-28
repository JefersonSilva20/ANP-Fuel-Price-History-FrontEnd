import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROLE_ADMIN, ROLE_USER } from 'src/app/models/role/roles-constant';
import { User } from '../../models/user/user';
import { API_BASE_URL } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class CadastreService {

  private readonly API_SIGN_UP = `${API_BASE_URL}/users/sign-up`;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public cadastreUser(user: User) {
    user.authorities = [ROLE_USER];
    return this.httpClient.post<HttpResponse<User>>(this.API_SIGN_UP, user).subscribe((data) => this.router.navigateByUrl('cadastre-status'));
  }
  
  public cadastreAdmin(user: User) {
    user.authorities = [ROLE_ADMIN];
    return this.httpClient.post<HttpResponse<User>>(this.API_SIGN_UP, user).subscribe((data) => this.router.navigateByUrl('cadastre-status'));
  }
}