import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FuelPriceHistory } from 'src/app/models/fuel-price-history/fuel-price-history';
import { Page } from 'src/app/models/pagination/page/page';
import { FuelPriceHistoryService } from '../../services/fuel-price-history.service';
import { Region } from 'src/app/models/region/region';
import { State } from 'src/app/models/state/state';
import { County } from 'src/app/models/county/county';
import { Reseller } from 'src/app/models/reseller/reseller';
import { Product } from 'src/app/models/product/product';
import { Banner } from 'src/app/models/banner/banner';

@Component({
  selector: 'app-operations-fuel-price-history-sidebar',
  templateUrl: './operations-fuel-price-history-sidebar.component.html',
  styleUrls: ['./operations-fuel-price-history-sidebar.component.css'],
  animations: [
    trigger(
      'hidden',
      [
        state('hide',style({overflow: 'hidden','overflow-y':'hidden',height:0,'padding-bottom':0,'padding-top':0})),
        state('show',style({overflow: 'auto', 'overflow-y':'hidden',height:'350px','padding-top':'8px','padding-bottom':'8px','margin-bottom':'8px'})),
        transition('hide => show',[animate('500ms ease-out')]),
        transition('show => hide',[animate('500ms ease-in')]),
      ]
    )
  ]
})
export class OperationsFuelPriceHistorySidebarComponent implements OnInit {

  @Output()
  public createFuelPriceHistoryEvent: EventEmitter<FuelPriceHistory>;
  @Output()
  public updateFuelsPricesHistoryEvent: EventEmitter<Page<FuelPriceHistory>>;
  public file: File;
  public avgPurchasePriceCountyName: string;
  public avgSalesPriceCountyName: string;
  public avgPurchaseAndSalesPriceByCountyName: string;
  public avgPurchasePriceBannerName: string;
  public avgSalesPriceBannerName: string;
  public avgPurchaseAndSalesPriceByBannerName: string;
  @Input()
  public showMenu: boolean;

  constructor(private fuelPriceHistoryService: FuelPriceHistoryService) {
    this.updateFuelsPricesHistoryEvent = new EventEmitter();
    this.createFuelPriceHistoryEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public selectFile(files: FileList) {
    this.file = files.item(0);
  }

  /**Upload .CSV File */
  public uploadFile() {
    this.fuelPriceHistoryService.upload(this.file).subscribe(() => this.getFuelPriceHistories());
  }

  /**Create New fuel price */
  public createNewFuelPrice() {
    this.createFuelPriceHistoryEvent.emit(new FuelPriceHistory(
      0,
      new Region(0, ''),
      new State(0, ''),
      new County(0, ''),
      new Reseller(0, '', ''),
      new Product(0, ''),
      new Banner(0, ''),
      'dd/MM/aaaa',
      0,
      0,
      'R$ / litro'));
  }

  public refreshList(s: string){
    if(!s){
      this.getFuelPriceHistories();
      this.fuelPriceHistoryService.resetCurrentApiUrl()
    }
  }

  getFuelPriceHistories() {
    this.fuelPriceHistoryService.findAll().subscribe((data: Page<FuelPriceHistory>) => {
      this.updateFuelsPricesHistoryEvent.emit(data);
    })
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
      console.log(data);
      this.updateFuelsPricesHistoryEvent.emit(data);
    });
  }

  public getFuelPriceHistoryByResellerName(reseller: string) {
    this.fuelPriceHistoryService.getFuelPriceHistoryByResellerName(reseller.toUpperCase()).subscribe((data: Page<FuelPriceHistory>) => {
      this.updateFuelsPricesHistoryEvent.emit(data);
    });
  }

  public getFuelPriceHistoryByDate(date: Date) {
    this.fuelPriceHistoryService.getFuelPriceHistoryByDate(date).subscribe((data: Page<FuelPriceHistory>) => {
      this.updateFuelsPricesHistoryEvent.emit(data);
    });
  }

}
