import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditFuelPriceHistoryComponent } from './components/edit-fuel-price-history/edit-fuel-price-history.component';
import { ListFuelPriceHistoryComponent } from './components/list-fuel-price-history/list-fuel-price-history.component';
import { OperationsFuelPriceHistorySidebarComponent } from './components/operations-fuel-price-history-sidebar/operations-fuel-price-history-sidebar.component';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';



@NgModule({
  declarations: [
    ListFuelPriceHistoryComponent,
    OperationsFuelPriceHistorySidebarComponent,
    EditFuelPriceHistoryComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ], exports: [ListFuelPriceHistoryComponent, OperationsFuelPriceHistorySidebarComponent, EditFuelPriceHistoryComponent, TruncatePipe]
})
export class FuelPriceHistoryModule { }
