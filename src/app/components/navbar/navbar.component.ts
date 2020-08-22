import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userName: string;

  @Output()
  public showMenuEvent: EventEmitter<boolean>;

  @Input()
  public menuIsShow: boolean;

  constructor(private jwtHelper: JwtHelperService, private router: Router) {
    this.showMenuEvent = new EventEmitter();
  }

  ngOnInit(): void {
    this.userName = this.jwtHelper.decodeToken(localStorage.getItem('Authorization')).sub;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  showMenu(){
    this.showMenuEvent.emit(!this.menuIsShow);
  }

}
