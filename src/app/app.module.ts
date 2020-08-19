import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastreComponent } from './components/cadastre/cadastre.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FuelPriceHistoryModule } from './modules/fuel-price-history/fuel-price-history.module';
import { CadastreSuccessMessageComponent } from './modules/user/components/cadastre-success-message/cadastre-success-message.component';
import { UserModule } from './modules/user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    CadastreComponent,
    CadastreSuccessMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    FuelPriceHistoryModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        headerName:'Authorization'
      },
    }),
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
