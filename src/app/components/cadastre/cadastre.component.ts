import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastreService } from 'src/app/services/cadastre/cadastre.service';

@Component({
  selector: 'app-cadastre',
  templateUrl: './cadastre.component.html',
  styleUrls: ['./cadastre.component.css']
})
export class CadastreComponent implements OnInit {


  public form: FormGroup;

  constructor(private cadastreService: CadastreService,private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('',[Validators.required]),
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    });
  }
  cadastre() {
    this.cadastreService.cadastreUser(this.form.value);      
  }
}
