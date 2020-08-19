import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-gard-service/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { CadastreComponent } from './components/cadastre/cadastre.component';
import { HomeComponent } from './components/home/home.component';
import { CadastreSuccessMessageComponent } from './modules/user/components/cadastre-success-message/cadastre-success-message.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'cadastro',component:CadastreComponent},
  {path:'home', component:HomeComponent,canActivate:[AuthGuardService],},
  {path:'cadastre-status', component: CadastreSuccessMessageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
