import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userName: string;

  constructor(private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.userName = this.jwtHelper.decodeToken(localStorage.getItem('Authorization')).sub;
  }

}
