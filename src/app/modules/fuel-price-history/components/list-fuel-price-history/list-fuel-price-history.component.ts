import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { CONTENT } from 'src/app/models/fuel-price-history/constants';
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

  public loading = true;

  constructor(private fuelPriceHistoryService: FuelPriceHistoryService) {
    this.fuelPriceHistorySelectEvent = new EventEmitter();
    this.fuelsPriceHistoryChangeEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }


  selectItem(fuelPriceHistory: FuelPriceHistory) {
    this.fuelPriceHistorySelect = fuelPriceHistory;   
    this.fuelPriceHistorySelectEvent.emit(this.fuelPriceHistorySelect);
    console.log(`Selected:   ${JSON.stringify(fuelPriceHistory)}`);
    
    
  }

  public getFirstPage() {
    this.fuelPriceHistoryService.findAllWithPage(0).subscribe((data) => {
      this.fuelPriceHistories = data;
    });
  }

  public getNextPage() {
    if (!this.fuelPriceHistories.last) {
      this.fuelPriceHistoryService.findAllWithPage(++this.fuelPriceHistories.number).subscribe((data) => {
        this.fuelPriceHistories = data;
        this.fuelsPriceHistoryChangeEvent.emit(data);
      });
    }
  }

  public getPreviousPage() {
    if (!this.fuelPriceHistories.first) {
      this.fuelPriceHistoryService.findAllWithPage(--this.fuelPriceHistories.number).subscribe((data) => {
        this.fuelPriceHistories = data;
        this.fuelsPriceHistoryChangeEvent.emit(data);
      });
    }
  }

  public getLastPage() {
    this.fuelPriceHistoryService.findAllWithPage(Math.floor(this.fuelPriceHistories.totalElements/10)).subscribe((data) => {
      this.fuelPriceHistories = data;
    });
  }
}
