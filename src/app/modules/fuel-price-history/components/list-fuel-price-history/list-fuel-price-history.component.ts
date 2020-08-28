import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FuelPriceHistory } from 'src/app/models/fuel-price-history/fuel-price-history';
import { Page } from 'src/app/models/pagination/page/page';
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

  @Input()
  public showMenu: boolean;

  @Input()
  public loaderDisplayStatus: string;


  constructor(private fuelPriceHistoryService: FuelPriceHistoryService) {
    this.fuelPriceHistorySelectEvent = new EventEmitter();
    this.fuelsPriceHistoryChangeEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public selectItem(fuelPriceHistory: FuelPriceHistory) {
    this.fuelPriceHistorySelectEvent.emit(fuelPriceHistory);
    console.log(`Selected:   ${JSON.stringify(fuelPriceHistory)}`);
  }

  public getFirstPage() {
    if (this.fuelPriceHistories.totalElements != 0) {
      this.fuelPriceHistoryService.getNextPage(0).subscribe((data) => {
        this.fuelsPriceHistoryChangeEvent.emit(data);
      });
    }
  }

  public getNextPage() {
    if (!this.fuelPriceHistories.last) {
      this.fuelPriceHistoryService.getNextPage(++this.fuelPriceHistories.number).subscribe((data) => {
        this.fuelsPriceHistoryChangeEvent.emit(data);
      });
    }
  }

  public getPreviousPage() {
    if (!this.fuelPriceHistories.first) {
      this.fuelPriceHistoryService.getNextPage(--this.fuelPriceHistories.number).subscribe((data) => {
        this.fuelsPriceHistoryChangeEvent.emit(data);
      });
    }
  }

  public getLastPage() {
    if (this.fuelPriceHistories.totalElements != 0) {
      this.fuelPriceHistoryService.getNextPage(Math.floor(this.fuelPriceHistories.totalElements / 20)).subscribe((data) => {
        this.fuelsPriceHistoryChangeEvent.emit(data);
      });
    }
  }
}
