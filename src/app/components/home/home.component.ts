import { Component, OnInit } from '@angular/core';
import { FuelPriceHistory } from 'src/app/models/fuel-price-history/fuel-price-history';
import { Page } from 'src/app/models/pagination/page/page';
import { FuelPriceHistoryService } from 'src/app/modules/fuel-price-history/services/fuel-price-history.service';
import { Region } from 'src/app/models/region/region';
import { State } from 'src/app/models/state/state';
import { County } from 'src/app/models/county/county';
import { Reseller } from 'src/app/models/reseller/reseller';
import { Product } from 'src/app/models/product/product';
import { Banner } from 'src/app/models/banner/banner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public fuelPriceHistorySelected: FuelPriceHistory;
  public fuelPriceHistories: Page<FuelPriceHistory>;
  public menuIsShow:boolean;
  public loaderDisplay: string;

  constructor(private fuelPriceHistoryService: FuelPriceHistoryService) {
    this.fuelPriceHistories = new Page<FuelPriceHistory>([]);
    this.createNewFuelPrice();
    this.menuIsShow = true;
    this.loaderDisplay = 'none';
  }

  public showMenu(showMenu: boolean){
    this.menuIsShow = showMenu;
  }

  public createNewFuelPrice() {
    this.fuelPriceHistorySelected = new FuelPriceHistory(
      0,
      new Region(0, ''),
      new State(0, ''),
      new County(0, ''),
      new Reseller(0, '', ''),
      new Product(0, ''),
      new Banner(0, ''),
      '',
      0,
      0,
      '');
  }

  public loaderDisplayStatus(displayStatus:string){    
    this.loaderDisplay =displayStatus;
  }

  ngOnInit(): void {
    this.getFuelPriceHistories();
  }

  
  public getFuelPriceHistories() {
    this.fuelPriceHistoryService.findAll().subscribe((data: Page<FuelPriceHistory>) => {
      this.fuelPriceHistories = data;
    })
  }

  public updateFuelsPrices(data: Page<FuelPriceHistory>){
    this.fuelPriceHistories = data;
  }

  public updateFuelPriceSelect(fuelPriceHistory: FuelPriceHistory) {
    this.fuelPriceHistorySelected = fuelPriceHistory;
  }

  public updateFuelPrice(fuelPriceHistory: FuelPriceHistory) {
    this.fuelPriceHistories.content[this.fuelPriceHistories.content.indexOf(this.fuelPriceHistorySelected)]=fuelPriceHistory;
    this.fuelPriceHistorySelected = fuelPriceHistory;
  }

  public addFuelPrice(fuelPriceHistory: FuelPriceHistory){
    this.fuelPriceHistories.content.push(fuelPriceHistory);
  }

  public removeFuelPrice(fuel: FuelPriceHistory){
    this.fuelPriceHistories.content.splice(this.fuelPriceHistories.content.indexOf(fuel),1);
  }
}
