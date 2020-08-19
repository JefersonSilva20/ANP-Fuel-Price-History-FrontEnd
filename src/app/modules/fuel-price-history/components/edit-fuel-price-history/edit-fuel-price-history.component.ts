import { Component, Input, OnInit, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuelPriceHistory } from 'src/app/models/fuel-price-history/fuel-price-history';
import { FuelPriceHistoryService } from '../../services/fuel-price-history.service';
import { Region } from 'src/app/models/region/region';

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

  public form: FormGroup;
  @Output()
  public fuelCreateEvent: EventEmitter<FuelPriceHistory>;

  constructor(private fuelPriceHistoryService: FuelPriceHistoryService) {
    this.form = new FormGroup({
      region: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      county: new FormControl('', Validators.required),
      reseller: new FormControl('', Validators.required),
      cnpj: new FormControl('', Validators.required),
      product: new FormControl('', Validators.required),
      dateCollect: new FormControl('', Validators.required),
      salePrice: new FormControl(''),
      purchasePrice: new FormControl(''),
      measurementUnit: new FormControl('', Validators.required),
      banner: new FormControl('', Validators.required)
    })
    this.fuelPriceSaveEvent = new EventEmitter();
    this.fuelPriceRemoveEvent = new EventEmitter();
    this.fuelCreateEvent = new EventEmitter();
  }

  ngOnInit(): void { }

  updateFormControls() {
    if (this.fuelPriceHistory) {
      this.form.controls['region'].setValue(this.fuelPriceHistory.region.name);
      this.form.controls['state'].setValue(this.fuelPriceHistory.state.uf);
      this.form.controls['county'].setValue(this.fuelPriceHistory.county.name);
      this.form.controls['reseller'].setValue(this.fuelPriceHistory.reseller.name);
      this.form.controls['cnpj'].setValue(this.fuelPriceHistory.reseller.cnpj);
      this.form.controls['product'].setValue(this.fuelPriceHistory.product.name);
      this.form.controls['dateCollect'].setValue(this.fuelPriceHistory.date);
      this.form.controls['salePrice'].setValue(this.fuelPriceHistory.salePrice);
      this.form.controls['purchasePrice'].setValue(this.fuelPriceHistory.purchasePrice);
      this.form.controls['measurementUnit'].setValue(this.fuelPriceHistory.measurementUnit);
      this.form.controls['banner'].setValue(this.fuelPriceHistory.banner.name);
    }
  }
  ngOnChanges(s: SimpleChange) {    
    this.updateFormControls();
  }

  public saveData() {
    this.fuelPriceHistory.region.name = String(this.form.controls['region'].value).toUpperCase();
    this.fuelPriceHistory.state.uf = String(this.form.controls['state'].value).toUpperCase();
    this.fuelPriceHistory.county.name = String(this.form.controls['county'].value).toUpperCase();
    this.fuelPriceHistory.reseller.name = String(this.form.controls['reseller'].value).toUpperCase();
    this.fuelPriceHistory.reseller.cnpj = String(this.form.controls['cnpj'].value).toUpperCase();
    this.fuelPriceHistory.product.name = String(this.form.controls['product'].value).toUpperCase();
    this.fuelPriceHistory.date = String(this.form.controls['dateCollect'].value).toUpperCase();
    this.fuelPriceHistory.salePrice = this.form.controls['salePrice'].value;
    this.fuelPriceHistory.purchasePrice = this.form.controls['purchasePrice'].value;
    this.fuelPriceHistory.measurementUnit = this.form.controls['measurementUnit'].value;
    this.fuelPriceHistory.banner.name = String(this.form.controls['banner'].value).toUpperCase();
    this.fuelPriceHistoryService.save(this.fuelPriceHistory).subscribe(
      (fuelSaved: FuelPriceHistory) =>{
        this.fuelPriceSaveEvent.emit(fuelSaved);
        if(this.fuelPriceHistory.id==0){
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
