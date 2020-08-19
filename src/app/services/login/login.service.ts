import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API_SIGN_IN = 'http://localhost:8080/login';

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: User): Promise<boolean> {
    return new Promise((resolve)=>{
      this.httpClient.post<User>(this.API_SIGN_IN, user, { observe: 'response'} ).subscribe(
        (data: HttpResponse<User>) => {
          resolve(true);
          localStorage.setItem('Authorization', data.headers.get('Authorization'));
          this.router.navigate(['/home']);
        }
      ,(error)=>{
        resolve(false);
      });
    })
    
  }
}
