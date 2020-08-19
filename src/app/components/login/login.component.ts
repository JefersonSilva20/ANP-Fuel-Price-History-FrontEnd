import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public validLogin: boolean;

  public form: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {
    this.validLogin = true;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    });
  }

  login() {
    this.loginService.login(this.form.value).then((statusLogin: boolean)=>{
      this.validLogin = statusLogin;
    });
  }

}
