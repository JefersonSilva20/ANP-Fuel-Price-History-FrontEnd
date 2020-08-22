import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Banner } from 'src/app/models/banner/banner';
import { County } from 'src/app/models/county/county';
import { FuelPriceHistory } from 'src/app/models/fuel-price-history/fuel-price-history';
import { Page } from 'src/app/models/pagination/page/page';
import { Product } from 'src/app/models/product/product';
import { Region } from 'src/app/models/region/region';
import { Reseller } from 'src/app/models/reseller/reseller';
import { State } from 'src/app/models/state/state';
import { FuelPriceHistoryService } from '../../services/fuel-price-history.service';

@Component({
  selector: 'app-list-fuel-price-history',
  templateUrl: './list-fuel-price-history.component.html',
  styleUrls: ['./list-fuel-price-history.component.css']
})
export class ListFuelPriceHistoryComponent implements OnInit {

  @Input()
  public fuelPriceHistories: Page<FuelPriceHistory>;

  @Input()
  public fuelPriceHistorySelect: FuelPriceHistory;

  @Output()
  public fuelPriceHistorySelectEvent: EventEmitter<FuelPriceHistory>;

  @Output()
  public fuelsPriceHistoryChangeEvent: EventEmitter<Page<FuelPriceHistory>>;

  public loading: boolean = true;

  public file: File;


  constructor(private fuelPriceHistoryService: FuelPriceHistoryService) {
    this.fuelPriceHistorySelectEvent = new EventEmitter();
    this.fuelsPriceHistoryChangeEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  getFuelPriceHistories() {
    this.fuelPriceHistoryService.findAll().subscribe((data: Page<FuelPriceHistory>) => {
      this.fuelsPriceHistoryChangeEvent.emit(data);
    })
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
    this.fuelPriceHistorySelectEvent.emit(new FuelPriceHistory(
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

  selectItem(fuelPriceHistory: FuelPriceHistory) {
    this.fuelPriceHistorySelectEvent.emit(fuelPriceHistory);
    console.log(`Selected:   ${JSON.stringify(fuelPriceHistory)}`);
  }

  public getFirstPage() {
    this.fuelPriceHistoryService.findAllWithPage(0).subscribe((data) => {
      this.fuelsPriceHistoryChangeEvent.emit(data);
    });
  }

  public getNextPage() {
    if (!this.fuelPriceHistories.last) {
      this.fuelPriceHistoryService.findAllWithPage(++this.fuelPriceHistories.number).subscribe((data) => {
        this.fuelsPriceHistoryChangeEvent.emit(data);
      });
    }
  }

  public getPreviousPage() {
    if (!this.fuelPriceHistories.first) {
      this.fuelPriceHistoryService.findAllWithPage(--this.fuelPriceHistories.number).subscribe((data) => {
        this.fuelsPriceHistoryChangeEvent.emit(data);
      });
    }
  }

  public getLastPage() {
    this.fuelPriceHistoryService.findAllWithPage(Math.floor(this.fuelPriceHistories.totalElements / 10)).subscribe((data) => {
      this.fuelsPriceHistoryChangeEvent.emit(data);
    });
  }
}
