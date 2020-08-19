import { TestBed } from '@angular/core/testing';

import { FuelPriceHistoryService } from './fuel-price-history.service';

describe('FuelPriceHistoryService', () => {
  let service: FuelPriceHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelPriceHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
