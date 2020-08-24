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
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  
  constructor(private fuelPriceHistoryService: FuelPriceHistoryService) {
    this.fuelPriceHistorySelectEvent = new EventEmitter();
    this.fuelsPriceHistoryChangeEvent = new EventEmitter();
  }

  ngOnInit(): void {
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
