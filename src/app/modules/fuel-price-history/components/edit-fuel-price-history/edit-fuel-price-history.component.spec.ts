import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFuelPriceHistoryComponent } from './edit-fuel-price-history.component';

describe('EditFuelPriceHistoryComponent', () => {
  let component: EditFuelPriceHistoryComponent;
  let fixture: ComponentFixture<EditFuelPriceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFuelPriceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFuelPriceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
