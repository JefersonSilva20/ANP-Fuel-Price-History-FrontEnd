import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsFuelPriceHistorySidebarComponent } from './operations-fuel-price-history-sidebar.component';

describe('UserDetailsSidebarComponent', () => {
  let component: OperationsFuelPriceHistorySidebarComponent;
  let fixture: ComponentFixture<OperationsFuelPriceHistorySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsFuelPriceHistorySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsFuelPriceHistorySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
