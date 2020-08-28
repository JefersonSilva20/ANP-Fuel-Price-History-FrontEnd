import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user/user';
import { API_BASE_URL } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USERS_API = `${API_BASE_URL}/users`;

  constructor(private httpClient: HttpClient) { }

  public getUserByUsername(username: string) {
    let user: User = new User(0,'','','',[]);
    let authToken = localStorage.getItem('Authorization');
    this.httpClient.get(`${this.USERS_API}/search?username=${username}`,
      { headers: new HttpHeaders().append('Authorization', authToken) }).subscribe(
        (data: any) => {
          user.id = data.content[0].id;
          user.name = data.content[0].name;
          user.username = data.content[0].username;
        },
        (error) => {
          console.log(error);
        });
    return user;
  }
}
