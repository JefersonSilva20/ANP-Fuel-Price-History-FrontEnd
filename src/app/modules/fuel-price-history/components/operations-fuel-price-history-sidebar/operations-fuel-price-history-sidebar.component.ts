import { Component, OnInit, EventEmitter } from '@angular/core';
import { FuelPriceHistory } from 'src/app/models/fuel-price-history/fuel-price-history';
import { Page } from 'src/app/models/pagination/page/page';
import { CONTENT } from 'src/app/models/fuel-price-history/constants';
import { FuelPriceHistoryService } from '../../services/fuel-price-history.service';
import { Banner } from 'src/app/models/banner/banner';
import { County } from 'src/app/models/county/county';
import { Product } from 'src/app/models/product/product';
import { Region } from 'src/app/models/region/region';
import { Reseller } from 'src/app/models/reseller/reseller';
import { State } from 'src/app/models/state/state';

@Component({
  selector: 'app-operations-fuel-price-history-sidebar',
  templateUrl: './operations-fuel-price-history-sidebar.component.html',
  styleUrls: ['./operations-fuel-price-history-sidebar.component.css']
})
export class OperationsFuelPriceHistorySidebarComponent implements OnInit {

  public fuelPriceHistorySelected: FuelPriceHistory;
  public fuelPriceHistories: Page<FuelPriceHistory>;
  public file: File;
  public avgPurchasePriceCountyName: string;
  public avgSalesPriceCountyName: string;
  public avgPurchaseAndSalesPriceByCountyName: string;
  public avgPurchasePriceBannerName: string;
  public avgSalesPriceBannerName: string;
  public avgPurchaseAndSalesPriceByBannerName: string;

  constructor(private fuelPriceHistoryService: FuelPriceHistoryService) {
    this.fuelPriceHistories = new Page<FuelPriceHistory>([]);
    this.createNewFuelPrice();
  }

  ngOnInit(): void {
    this.getFuekPriceHistories();
  }

  getFuekPriceHistories() {
    this.fuelPriceHistoryService.findAll().subscribe((data: Page<FuelPriceHistory>) => {
      this.fuelPriceHistories = data;
    })
  }

  updateData(fuelPriceHistory: FuelPriceHistory) {
    this.fuelPriceHistorySelected = fuelPriceHistory;
  }

  savedData(fuelPriceHistory: FuelPriceHistory) {
    this.fuelPriceHistories.content[this.fuelPriceHistories.content.indexOf(this.fuelPriceHistorySelected)]=fuelPriceHistory;
    this.fuelPriceHistorySelected = fuelPriceHistory;
  }
  addNewData(fuelPriceHistory: FuelPriceHistory){
    this.fuelPriceHistories.content.push(fuelPriceHistory);
  }

  updateList(data: Page<FuelPriceHistory>){
    this.fuelPriceHistories = data;
  }

  removeData(fuel: FuelPriceHistory){
    this.fuelPriceHistories.content.splice(this.fuelPriceHistories.content.indexOf(fuel),1);
  }


  createNewFuelPrice() {
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

  public selectFile(files: FileList) {
    this.file = files.item(0);
  }

  public uploadFile() {
    this.fuelPriceHistoryService.upload(this.file).subscribe(() => this.getFuekPriceHistories());
  }

  public findAvgPurchasePriceCountyName(county: string) {
    this.fuelPriceHistoryService.findAvgPurchasePriceCountyName(county.toUpperCase()).subscribe((avg: number) => {
      this.avgPurchasePriceCountyName = avg.toFixed(2);
    });
  }

  public findAvgSalesPriceCountyName(county: string) {
    this.fuelPriceHistoryService.findAvgSalesPriceCountyName(county.toUpperCase()).subscribe((avg: number) => {
      this.avgSalesPriceCountyName = avg.toFixed(2);
    });
  }

  public findAvgPurchaseAndSalesPriceByCountyName(county: string) {
    this.fuelPriceHistoryService.findAvgPurchaseAndSalesPriceByCountyName(county.toUpperCase()).subscribe((avg: number) => {
      this.avgPurchaseAndSalesPriceByCountyName = avg.toFixed(2);
    });
  }

  public findAvgPurchasePriceBannerName(banner: string) {
    this.fuelPriceHistoryService.findAvgPurchasePriceBannerName(banner.toUpperCase()).subscribe((avg: number) => {
      this.avgPurchasePriceBannerName = avg.toFixed(2);
    });
  }

  public findAvgSalesPriceBannerName(banner: string) {
    this.fuelPriceHistoryService.findAvgSalesPriceBannerName(banner.toUpperCase()).subscribe((avg: number) => {
      this.avgSalesPriceBannerName = avg.toFixed(2);
    });
  }

  public findAvgPurchaseAndSalesPriceByBannerName(banner: string) {
    this.fuelPriceHistoryService.findAvgPurchaseAndSalesPriceByBannerName(banner.toUpperCase()).subscribe((avg: number) => {
      this.avgPurchaseAndSalesPriceByBannerName = avg.toFixed(2);
    });
  }

  public getFuelsPricesHistoriesByRegionName(region: string) {
    this.fuelPriceHistoryService.getFuelsPricesHistoriesByRegionName(region.toUpperCase()).subscribe((data: Page<FuelPriceHistory>) => {
      this.fuelPriceHistories = data;
    });
  }

  public getFuelPriceHistoryByResellerName(reseller: string) {
    this.fuelPriceHistoryService.getFuelPriceHistoryByResellerName(reseller.toUpperCase()).subscribe((data: Page<FuelPriceHistory>) => {
      this.fuelPriceHistories = data;
    });
  }

  public getFuelPriceHistoryByDate(date: Date) {
    this.fuelPriceHistoryService.getFuelPriceHistoryByDate(date).subscribe((data: Page<FuelPriceHistory>) => {
      this.fuelPriceHistories = data;
    });
  }

}
