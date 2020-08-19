import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FuelPriceHistory } from 'src/app/models/fuel-price-history/fuel-price-history';
import { FuelPriceHistoryService } from '../../services/fuel-price-history.service';

@Component({
  selector: 'app-edit-fuel-price-history',
  templateUrl: './edit-fuel-price-history.component.html',
  styleUrls: ['./edit-fuel-price-history.component.css']
})
export class EditFuelPriceHistoryComponent implements OnInit {

  @Input()
  public fuelPriceHistory: FuelPriceHistory;

  @Output()
  public fuelPriceSaveEvent: EventEmitter<FuelPriceHistory>;

  @Output()
  public fuelPriceRemoveEvent: EventEmitter<FuelPriceHistory>;

  @Output()
  public fuelCreateEvent: EventEmitter<FuelPriceHistory>;



  constructor(private fuelPriceHistoryService: FuelPriceHistoryService) {
    this.fuelPriceSaveEvent = new EventEmitter();
    this.fuelPriceRemoveEvent = new EventEmitter();
    this.fuelCreateEvent = new EventEmitter();
  }

  ngOnInit(): void { }

  public saveData() {
    this.fuelPriceHistoryService.save(this.fuelPriceHistory).subscribe(
      (fuelSaved: FuelPriceHistory) => {
        this.fuelPriceSaveEvent.emit(fuelSaved);
        if (this.fuelPriceHistory.id == 0) {
          this.fuelCreateEvent.emit(fuelSaved);
        }
      }
    );
  }

  public delete() {
    this.fuelPriceHistoryService.delete(this.fuelPriceHistory.id);
    this.fuelPriceRemoveEvent.emit(this.fuelPriceHistory);
  }
}
