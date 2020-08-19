import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFuelPriceHistoryComponent } from './list-fuel-price-history.component';

describe('ListFuelPriceHistoryComponent', () => {
  let component: ListFuelPriceHistoryComponent;
  let fixture: ComponentFixture<ListFuelPriceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFuelPriceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFuelPriceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
